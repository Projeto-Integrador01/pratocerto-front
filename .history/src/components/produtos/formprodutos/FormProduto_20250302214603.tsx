import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, cadastrar, buscarLogado } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produtos";
import Restaurante from "../../../models/Restaurante";

function FormProduto() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);

    const [restaturante, setRestaurante] = useState<Restaurante>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        endereco: '',
        produto: null,
    });

    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: '',
        preco: 0,
        descricao: '',
        foto: '',
        tipoAlimento: '',
        categoria: null,
        restaurante: {
            id: usuario.id,
            nome: usuario.nome,
            usuario: usuario.usuario,
            foto: usuario.foto,
            senha: usuario.senha,  // Mantemos os dados
            endereco: usuario.endereco,
            produto: null,
        },
    });

    const { id } = useParams<{ id: string }>();
    const token = usuario.token;

    async function buscarProdutoPorId(id: string) {
        try {
            await buscarLogado(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarProdutoPorId(id);  // Buscar o produto
        }
    }, [id]);

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
            restaurante: restaturante,
        });
    }, [categoria, restaturante]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
            restaurante: produto.restaurante,  // Manter o restaurante sem alteração
        });
    }

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="restaurante">Restaurante</label>
                    <input
                        type="text"
                        name="restaurante"
                        value={produto.restaurante?.nome}  // Aqui, o nome do restaurante é exibido
                        disabled
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                {/* Outras partes do formulário */}
            </form>
        </div>
    );
}

export default FormProduto;
