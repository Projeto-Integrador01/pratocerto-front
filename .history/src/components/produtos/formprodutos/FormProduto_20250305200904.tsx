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
        navigate('/produtoslogado');
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




    if(id !== undefined ) {
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center">
            {/* Formulário com fundo claro #F2DAAC e sombra verde */}
            <form className="flex flex-col w-full max-w-2xl gap-4 border-4 border-green-900 bg-[#F2DAAC] p-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2),0_4px_20px_rgba(0,128,0,0.3)]" onSubmit={gerarNovoProduto}>
                <h1 className="text-2xl text-center my-4 text-green-900">
                    {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
                </h1>
    
                {/* Nome do Produto */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome" className="text-green-900 font-bold text-sm">Nome do Produto</label>
                    <input
                        type="text"
                        placeholder="Nome do Produto"
                        name="nome"
                        required
                        className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                        value={produto.nome}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* Descrição */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao" className="text-green-900 font-bold text-sm">Descrição do Produto</label>
                    <input
                        type="text"
                        placeholder="Descrição do Produto"
                        name="descricao"
                        required
                        className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                        value={produto.descricao}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* Preço */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="preco" className="text-green-900 font-bold text-sm">Preço</label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Preço do Produto"
                        name="preco"
                        required
                        className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                        value={produto.preco.toString()}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* Foto */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="foto" className="text-green-900 font-bold text-sm">Foto do Produto (URL)</label>
                    <input
                        type="text"
                        placeholder="URL da Imagem"
                        name="foto"
                        required
                        className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                        value={produto.foto}
                        onChange={atualizarEstado}
                    />
                </div>
    
                {/* Tipo de Alimento */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="tipoAlimento" className="text-green-900 font-bold text-sm">Tipo de Alimento</label>
                    <select
                        name="tipoAlimento"
                        required
                        className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                        value={produto.tipoAlimento}
                        onChange={atualizarEstadoTipoAlimento}
                    >
                        <option value="" disabled>Selecione um Tipo</option>
                        <option value="vegetariano">Vegetariano</option>
                        <option value="vegano">Vegano</option>
                        <option value="tradicional">Tradicional</option>
                    </select>
                </div>
    
                {/* Categoria */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="categorias" className="text-green-900 font-bold text-sm">Categoria</label>
                    <select
                        name="categoria"
                        id="categorias"
                        required
                        className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                        value={categoria.id || ""}
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" disabled>Selecione</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                        ))}
                    </select>
                </div>
    
                {/* Botão */}
                <button
                    type="submit"
                    className="rounded bg-green-900 text-white hover:bg-green-700 font-bold py-1 text-sm"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <RotatingLines strokeColor="white" width="16" />
                    ) : (
                        <span>{id ? 'Atualizar' : 'Cadastrar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
    
} else{
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center">
            {/* Camada extra com fundo branco e padding para centralizar o formulário */}
            <div className="w-full h-full max-w-xl flex flex-col justify-between bg-white p-4 rounded-lg">
                {/* Formulário com fundo claro #F2DAAC e sombra verde */}
                <form
                    className="flex flex-col w-full h-full gap-4 border-4 border-green-900 bg-[#F2DAAC] p-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2),0_4px_20px_rgba(0,128,0,0.3)]"
                    onSubmit={gerarNovoProduto}
                >
                    <h1 className="text-2xl text-center my-4 text-green-900">
                        {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
                    </h1>
    
                    {/* Nome do Produto */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome" className="text-green-900 font-bold text-sm">
                            Nome do Produto
                        </label>
                        <input
                            type="text"
                            placeholder="Nome do Produto"
                            name="nome"
                            required
                            className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                            value={produto.nome}
                            onChange={atualizarEstado}
                        />
                    </div>
    
                    {/* Descrição */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="descricao" className="text-green-900 font-bold text-sm">
                            Descrição do Produto
                        </label>
                        <input
                            type="text"
                            placeholder="Descrição do Produto"
                            name="descricao"
                            required
                            className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                            value={produto.descricao}
                            onChange={atualizarEstado}
                        />
                    </div>
    
                    {/* Preço */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="preco" className="text-green-900 font-bold text-sm">
                            Preço
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="Preço do Produto"
                            name="preco"
                            required
                            className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                            value={produto.preco.toString()}
                            onChange={atualizarEstado}
                        />
                    </div>
    
                    {/* Foto */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="foto" className="text-green-900 font-bold text-sm">
                            Foto do Produto (URL)
                        </label>
                        <input
                            type="text"
                            placeholder="URL da Imagem"
                            name="foto"
                            required
                            className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                            value={produto.foto}
                            onChange={atualizarEstado}
                        />
                    </div>
    
                    {/* Tipo de Alimento */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tipoAlimento" className="text-green-900 font-bold text-sm">
                            Tipo de Alimento
                        </label>
                        <select
                            name="tipoAlimento"
                            required
                            className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                            value={produto.tipoAlimento}
                            onChange={atualizarEstadoTipoAlimento}
                        >
                            <option value="" disabled>
                                Selecione um Tipo
                            </option>
                            <option value="vegetariano">Vegetariano</option>
                            <option value="vegano">Vegano</option>
                            <option value="tradicional">Tradicional</option>
                        </select>
                    </div>
    
                    {/* Categoria */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="categorias" className="text-green-900 font-bold text-sm">
                            Categoria
                        </label>
                        <select
                            name="categoria"
                            id="categorias"
                            required
                            className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                            value={categoria.id || ""}
                            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                        >
                            <option value="" disabled>
                                Selecione
                            </option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nome}
                                </option>
                            ))}
                        </select>
                    </div>
    
                    {/* Botão */}
                    <div className="flex justify-center mt-auto">
                        <button
                            type="submit"
                            className="w-full rounded bg-green-900 text-white hover:bg-green-700 font-bold py-2 text-sm"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <RotatingLines strokeColor="white" width="16" />
                            ) : (
                                <span>{id ? 'Atualizar' : 'Cadastrar'}</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    
    
    
    

}
    
    
}

export default FormProduto;