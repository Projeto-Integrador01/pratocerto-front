import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produtos";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscarLogado, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

function DeletarProduto() {

    const navigate = useNavigate()

const { id } = useParams<{id: string}>();

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
                'Authorization': token
            }
        })

        ToastAlerta("Produto apagado com sucesso!", "sucesso")

    } catch (error: any) {
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
    navigate("/produtoslogado")
}

return (
    <div className="container w-1/3 mx-auto">
    <h1 className="text-4xl text-center my-4 text-green-900">Deletar Produto</h1>
  
    {/* Card de confirmação */}
    <div className="border flex flex-col rounded-2xl overflow-hidden bg-[#F2DAAC]">
      {/* Header do Card */}
      <header className="py-2 px-6  text-green font-bold text-2xl">
        Deletar Produto
      </header>
  
      {/* Corpo do Card com a mensagem de confirmação */}
      <div className="p-6 flex flex-col items-center">
        <p className="text-center text-green-900 font-semibold mb-4 text-xl">
          Você tem certeza de que deseja apagar o produto a seguir?
        </p>
        <p className="text-center text-green-900 text-lg mb-6">{produto.nome}</p>
        
        {/* Botões dentro do card */}
        <div className="flex gap-4 w-full">
          <button
            className="text-green-900 bg-white hover:bg-gray-200 w-1/2 py-2 rounded-lg border border-green-900"
            onClick={retornar}
          >
            Cancelar
          </button>
  
          <button
            className="text-white bg-red-600 hover:bg-red-700 w-1/2 py-2 rounded-lg"
            onClick={deletarProduto}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Deletar</span>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
  
  
  
);
       
}

export default DeletarProduto;
