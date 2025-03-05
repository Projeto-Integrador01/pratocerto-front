import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { atualizar, cadastrar, buscarLogado } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produtos";

interface FormProdutoProps {
    produtoId?: string;
}

function FormProduto({ produtoId }: FormProdutoProps) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [produto, setProduto] = useState<Produto | null>(null);

    useEffect(() => {
        buscarCategorias();
        if (produtoId) {
            buscarProdutoPorId(produtoId);
        } else {
            setProduto({
                id: "",
                nome: "",
                descricao: "",
                preco: 0,
                foto: "",
                tipoAlimento: "",
                categoria: {} as Categoria,
                restaurante: usuario,
            });
        }
    }, [produtoId]);

    async function buscarProdutoPorId(id: string) {
        try {
            await buscarLogado(`/produtos/${id}`, (data: Produto) => {
                setProduto(data);
                setCategoria(data.categoria);
            }, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            }
        }
    }

    async 
