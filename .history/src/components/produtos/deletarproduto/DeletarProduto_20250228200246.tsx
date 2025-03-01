import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produtos";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscarLogado, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarProduto() {

const { id } = useParams<{id: string}>();

const navigate = useNavigate()
const [isLoading, setIsLoading] = useState<boolean>(false)

const[produto, setProduto] = useState<Produto>({} as Produto)

const[usuario, handleLogout] = useContext(AuthContext)
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
                'Authorization': token
            }
        })

        ToastAlerta("Postagem apagada com sucesso!", "sucesso")

    } catch (error: any) {
        if (error.toString().includes('403')) {
            handleLogout()
        }else {
            ToastAlerta("Erro ao deletar postagem!", "erro")
        }
    }

    setIsLoading(false)
    retornar()
}

function retornar() {
    navigate("/produtos")
}










    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-gray-200 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6">Deletar Produto</h2>
  
          <p className="text-gray-700 mb-6">
            Você tem certeza que deseja deletar o produto?
          </p>
  
          <div className="flex justify-between">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
              Cancelar
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">
              Deletar
            </button>
          </div>
        </div>
      </div>
    )
}

export default DeletarProduto;