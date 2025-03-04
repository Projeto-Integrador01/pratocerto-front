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

    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nome: '',
        foto: '',
    });

    const [produto, setProduto] = useState<Produto>({} as Produto);
     

    const { id } = useParams<{ id: string }>();


    const { usuario, handleLogout } = useContext(AuthContext);
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

    async function buscarCategoriaPorId() {
        try {
            await buscarLogado('/categorias', setCategoria, {
                headers: { Authorization: token }
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
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (!token) {
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

  
    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        });
    }, [categoria]);

   

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setProduto({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }
    

    async function gerarNovaProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id !== undefined) {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Produto atualizado com sucesso!", "sucesso");
            } else {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: { Authorization: token },
                });
                ToastAlerta("Produto cadastrado com sucesso!", "sucesso");
            }
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            } else {
                ToastAlerta("Erro ao salvar produto!", "erro");
            }
        }

        setIsLoading(false);
        navigate('/produtos');
    }

    const carregandoCategorias = categoria.nome === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>



            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaProduto}>
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
                    <label htmlFor="tipoalimento">Tipo de Alimento</label>
                    <select
                        name="tipoalimento"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.tipoalimento}
                        onChange={atualizarEstado}
                    >
                        <option value="" disabled>Selecione o Tipo</option>
                        <option value="Vegano">Vegano</option>
                        <option value="Vegetariano">Vegetariano</option>
                        <option value="Tradicional">Tradicional</option>
                    </select>
                </div>




                {/* Categorias */}
                <div className="flex flex-col gap-2">
                    <p>Categorias</p>
                    <select
                        name="categorias"
                        id="categorias"
                        className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarLogado(`/categorias/${e.currentTarget.value}`, setCategoria, { headers: { Authorization: token } })}
                    >
                        <option value="" disabled>Selecione uma Categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.nome}</option>
                        ))}
                    </select>
                </div>

                {/* Botão */}
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoCategorias}
                >
                    {isLoading ? (
                        <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
                    ) : (
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormProduto;
