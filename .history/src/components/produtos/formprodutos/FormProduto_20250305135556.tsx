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

    async function buscarCategorias() {
        try {
            await buscarLogado("/categorias", setCategorias, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            }
        }
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        if (!produto) return;

        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
            restaurante: usuario,
        });
    }

    async function enviarFormulario(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (produtoId) {
                await atualizar("/produtos", produto, setProduto, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Produto atualizado com sucesso!", "sucesso");
            } else {
                await cadastrar("/produtos", produto, setProduto, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Produto cadastrado com sucesso!", "sucesso");
            }
        } catch (error: any) {
            if (error.toString().includes("403")) {
                handleLogout();
            } else {
                ToastAlerta(`Erro ao ${produtoId ? "atualizar" : "cadastrar"} produto!`, "erro");
            }
        }

        setIsLoading(false);
        navigate("/produtos");
    }

    if (!produto) return <p>Carregando...</p>;

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {produtoId ? "Editar Produto" : "Cadastrar Produto"}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={enviarFormulario}>
                {/* Nome */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome do Produto</label>
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do Produto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.nome || ""}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* Descrição */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Produto</label>
                    <input
                        type="text"
                        name="descricao"
                        placeholder="Descrição"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.descricao || ""}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* Preço */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="preco">Preço</label>
                    <input
                        type="number"
                        step="0.01"
                        name="preco"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.preco.toString()}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* Categoria */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        name="categoria"
                        className="border-2 border-slate-700 rounded p-2"
                        value={categoria.id || ""}
                        onChange={(e) => buscarProdutoPorId(e.target.value)}
                    >
                        <option value="" disabled>Selecione uma Categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                </div>

                {/* Botão de Enviar */}
                <button
                    type="submit"
                    className="rounded bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <RotatingLines strokeColor="white" width="24" />
                    ) : (
                        <span>{produtoId ? "Atualizar Produto" : "Cadastrar Produto"}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormProduto;
