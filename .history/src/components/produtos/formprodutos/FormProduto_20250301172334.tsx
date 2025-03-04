import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, cadastrar, buscarLogado } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { AuthContext } from "../../../contexts/AuthContext";
import Restaurante from "../../../models/Restaurante";
import Categoria from "../../../models/Categoria";
import Produto from "../../../models/Produtos";

function FormProduto() {

console.log("produtos enviados: ", produto)

    //para fazer a navegação
    const navigate = useNavigate();

    //aqui pegamos aquele simbolo de carregamento
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Lista de todos as categorias disponiveis
    const [categorias, setCategorias] = useState<Categoria[]>([])

    //variavel de estado que recebe os dados da categoria escolhida pelo usuario
    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        nome: '',
        foto: '',
    })

    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([])

    const [restaurante, setRestaurante] = useState<Restaurante>({
        id: 0,
        nome: '',
        usuario: '',
        foto: '',
        senha: '',
        endereco: '',
        produto: null,
    })

    const [produto, setProduto] = useState<Produto>({
        token: '',
        id: 0,
        nome: '',
        preco: 0,
        descricao: '',
        foto: '',
        tipoalimento: '',
        categoria: null,
        restaurante: null,
    });

    //pega o id que vai ser passado na URL, igual o pathVariable
    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)

    const token = usuario.token



    async function buscarProdutos() {

        try {
            await buscarLogado('/produtos', setProduto, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    async function buscarProdutoPorId(id: string) {
        try {
            await buscarLogado(`/produtos/${id}`, setProduto, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
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

    async function buscarRestaurantePorId(id: string) {
        try {
            await buscarLogado(`/restaurantes/${id}`, setRestaurante, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    async function buscarRestaurantes() {
        try {
            await buscarLogado('/restaurantes', setRestaurantes, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/');
        }
    }, [token])




    useEffect(() => {
        buscarCategorias()

        if (id !== undefined) {
            buscarCategoriaPorId(id)
        }
    }, [id])

    useEffect(() => {
        buscarRestaurantes()

        if (id !== undefined) {
            buscarRestaurantePorId(id)
        }
    }, [id])

    useEffect(() => {
        buscarProdutos()

        if (id !== undefined) {
            buscarProdutoPorId(id)
        }
    }, [id])




    useEffect(() => {
        setProduto({
            ...produto,
            categoria: categoria,
        })
    }, [categoria])


    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]; // Obtém o primeiro arquivo selecionado
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduto((prevProduto) => ({
                    ...prevProduto,
                    foto: reader.result as string, // Converte para base64 (ou URL temporária)
                }));
            };
            reader.readAsDataURL(file);
        }
    }













    function atualizarEstado(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
        const { name, value } = e.target;

        setProduto({
            ...produto,
            [name]: name === 'preco' ? parseFloat(value): value, // Mantenha como string
            categoria: categoria,
            
        });
    }
    
    








    function retornar() {
        navigate('/produtos');
    }

    async function gerarNovaProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault() //evita o carregamento do formulario
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta("Produto atualizada com sucesso!", "sucesso")
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar produto!", "erro")
                }
            }

        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                })

                ToastAlerta("Produto cadastrada com sucesso!", "sucesso")

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao cadastrar produto!", "erro")
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    const carregandoCategorias = categoria.nome === '' || isLoading;

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaProduto}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Nome da Produto</label>
                    <input
                        type="text"
                        placeholder="Nome do produto"
                        name="nome"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>



                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Preço do Produto</label>
                    <input
                        type="number"
                        placeholder="preço do produto"
                        name="preco"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.preco}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>


                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Descrição da Produto</label>
                    <input
                        type="text"
                        placeholder="descricao"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={produto.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>


                <div className="flex flex-col gap-2">
                    <label htmlFor="foto">Foto do Produto</label>
                    <input
                        type="file"
                        name="foto"
                        accept="image/*" // Aceita apenas imagens
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        onChange={(e) => handleFileChange(e)}
                    />
                </div>





                <div className="flex flex-col gap-2">
                    <label>Tipo do Alimento</label>
                    <select
                        name="tipoalimento"
                        className="border p-2 border-slate-800 rounded"
                        value={produto.tipoalimento} // Conecta com o estado
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => atualizarEstado(e)}
                    >
                        <option value="" disabled>Selecione o Tipo de Alimento</option>
                        <option value="vegetariano">Vegetariano</option>
                        <option value="vegano">Vegano</option>
                        <option value="tradicional">Tradicional</option>
                    </select>


                    <p>Categorias</p>
                    <select name="categorias" id="categorias" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione uma Categorias</option>

                        {categorias.map((categoria) => (
                            <>
                                <option value={categoria.id} >{categoria.nome}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoCategorias}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormProduto;