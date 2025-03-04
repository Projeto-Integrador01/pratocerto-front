import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, cadastrar, buscarLogado } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produtos";

function FormProduto() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    const { id } = useParams<{ id: string }>();
    const [produto, setProduto] = useState<Produto>({
        id: 0,
        nome: '',
        descricao: '',
        preco: 0,
        foto: '',
        tipoAlimento: '',
        categoria: categoria,
    });

    async function buscarProdutoPorId(id: string) {
        try {
            await buscarLogado(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    async function buscarCategorias() {
        try {
            await buscarLogado('/categorias', setCategorias, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarCategorias();
        if (id !== undefined) {
            buscarProdutoPorId(id);
        }
    }, [id]);

    const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
        setProduto((prevProduto) => ({
            ...prevProduto,
            [e.target.name]: e.target.value,
        }));
    };

    const handleCategoriaChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const categoriaSelecionada = categorias.find(c => c.id === parseInt(e.target.value));
        if (categoriaSelecionada) {
            setCategoria(categoriaSelecionada);
        }
    };

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const produtoComCategoria = {
            ...produto,
            categoria: categoria,
        };

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produtoComCategoria, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });
                ToastAlerta("Produto atualizado com sucesso!", "sucesso");
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao atualizar produto!", "erro");
                }
            }
        } else {
            try {
                await cadastrar(`/produtos`, produtoComCategoria, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });
                ToastAlerta("Produto cadastrado com sucesso!", "sucesso");
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao cadastrar produto!", "erro");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoProduto}>
                {/* Nome do Produto */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome do Produto</label>
                    <input
                        type="text"
                        placeholder="Nome do Produto"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.nome}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* Descrição */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do Produto</label>
                    <input
                        type="text"
                        placeholder="Descrição do Produto"
                        name="descricao"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.descricao}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* Preço */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="preco">Preço</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Preço do Produto"
                        name="preco"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.preco.toString()}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* Foto */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="foto">Foto do Produto (URL)</label>
                    <input
                        type="text"
                        placeholder="URL da Imagem"
                        name="foto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.foto}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* Tipo de Alimento */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="tipoAlimento">Tipo de Alimento</label>
                    <input
                        type="text"
                        placeholder="Tipo de Alimento"
                        name="tipoAlimento"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.tipoAlimento}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* Categoria */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="categorias">Categoria do Produto</label>
                    <select
                        name="categorias"
                        id="categorias"
                        className="border p-2 border-slate-800 rounded"
                        onChange={handleCategoriaChange}
                        value={categoria.id || ''}
                    >
                        <option value="" disabled>Selecione uma Categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    className="rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <RotatingLines strokeColor="white" width="24" />
                    ) : (
                        <span>{id ? 'Atualizar Produto' : 'Cadastrar Produto'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormProduto;
