import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produtos";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscarLogado, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

function DeletarProduto() {

const { id } = useParams<{id: string}>();

const navigate = useNavigate()
const [isLoading, setIsLoading] = useState<boolean>(false)

const[produto, setProduto] = useState<Produto>({} as Produto)

const { usuario, handleLogout } = useContext(AuthContext)
const token = usuario.token



async function buscarProdutoPorId(id: string) {
    try {
        await buscarLogado(`/produtos/${id}`, setProduto, {
            headers: {
                'Authorization': token
            }
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
        navigate('/')
    }
}, [token])

useEffect(() => {
    if (id !== undefined) {
        buscarProdutoPorId(id)
    }
}, [id])


async function deletarProduto() {
    setIsLoading(true)

    try {
        await deletar(`/produtos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        ToastAlerta("Produto apagado com sucesso!", "sucesso")

    } catch (error: any) {
        console.log("Erro ao deletar:", error);
        if (error.toString().includes('403')) {
            handleLogout()
        }else {
            ToastAlerta("Erro ao deletar o produto!", "erro")
        }
    }

    setIsLoading(false)
    retornar()
}




function retornar() {
    navigate("/produtos")
}

    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Produto</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o produto a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Produto
                </header>
                <div className="p-4">
                    <p className='text-xl h-full'>{produto.foto}</p>
                    <p>{produto.nome}</p>
                </div>
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarProduto}>
                        
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarProduto;