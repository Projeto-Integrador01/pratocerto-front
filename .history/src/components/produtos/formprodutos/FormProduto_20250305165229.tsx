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
        id: "",
        nome: '',
        descricao: '',
        preco: 0,
        foto: '',
        tipoAlimento: '',
        categoria: categoria,
        restaurante: usuario,
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

    async function buscarCategoriaPorId(id: string) {
        try {
            await buscarLogado(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        buscarCategorias();
        if (id !== undefined) {
            buscarProdutoPorId(id);
        }
    }, [id]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        });
    }, [categoria]);

    function retornar() {
        navigate('/produtos');
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
            restaurante: usuario,
        });
    }

    function atualizarEstadoTipoAlimento(e: ChangeEvent<HTMLSelectElement>) {
        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria,
            restaurante: usuario,
        });
    }

    console.log(produto)

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto, {
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
                await cadastrar(`/produtos`, produto, setProduto, {
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
            <h1 className="text-4xl text-center my-8 text-green-900">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>
    
            <form className="flex flex-col w-1/2 gap-4 border-2 border-green-900 p-6 rounded-lg shadow-md" onSubmit={gerarNovoProduto}>
                {/* Nome do Produto */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="text-green-900">Nome do Produto</label>
                    <input
                        type="text"
                        placeholder="Nome do Produto"
                        name="nome"
                        required
                        className="border-2 border-green-700 text-green-900 rounded p-2"
                        value={produto.nome}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* Descrição */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao" className="text-green-900">Descrição do Produto</label>
                    <input
                        type="text"
                        placeholder="Descrição do Produto"
                        name="descricao"
                        required
                        className="border-2 border-green-700 text-green-900 rounded p-2"
                        value={produto.descricao}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* Preço */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="preco" className="text-green-900">Preço</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Preço do Produto"
                        name="preco"
                        required
                        className="border-2 border-green-700 text-green-900 rounded p-2"
                        value={produto.preco.toString()}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* Foto */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="foto" className="text-green-900">Foto do Produto (URL)</label>
                    <input
                        type="text"
                        placeholder="URL da Imagem"
                        name="foto"
                        required
                        className="border-2 border-green-700 text-green-900 rounded p-2"
                        value={produto.foto}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* Tipo de Alimento */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="tipoAlimento" className="text-green-900">Tipo de Alimento</label>
                    <select
                        name="tipoAlimento"
                        required
                        className="border-2 border-green-700 text-green-900 rounded p-2"
                        value={produto.tipoAlimento}
                        onChange={atualizarEstadoTipoAlimento}
                    >
                        <option value="" disabled>Selecione um Tipo de Alimento</option>
                        <option value="vegetariano">Vegetariano</option>
                        <option value="vegano">Vegano</option>
                        <option value="tradicional">Tradicional</option>
                    </select>
                </div>
    
                {/* Categoria */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="categorias" className="text-green-900">Categoria do Produto</label>
                    <select
                        name="categoria"
                        id="categorias"
                        required
                        className="border-2 border-green-700 text-green-900 rounded p-2"
                        value={categoria.id || ""}
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" disabled>Selecione uma Categoria</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                        ))}
                    </select>
                </div>
    
                {/* Botão */}
                <button
                    type="submit"
                    className="rounded bg-green-900 text-white hover:bg-green-700 font-bold w-1/2 mx-auto py-2"
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