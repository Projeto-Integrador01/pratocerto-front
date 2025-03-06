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
    <h1 className="text-4xl text-center my-4">Deletar Produto</h1>
  
    {/* Card de confirmação */}
    <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
      {/* Header do Card */}
      <header className="py-2 px-6  text-white font-bold text-2xl">
        Deletar Produto
      </header>
  
      {/* Corpo do Card com a mensagem de confirmação */}
      <div className="p-4 flex flex-col items-center">
        <p className="text-center font-semibold mb-4 text-xl">
          Você tem certeza de que deseja apagar o produto a seguir?
        </p>
        <p className="text-center text-lg">{produto.nome}</p>
      </div>
    </div>
  
    {/* Botões fora do card */}
    <div className="flex gap-4 mt-4">
      <button
        className="text-slate-100 bg-green-600 hover:bg-green-700 w-full py-2 rounded-lg"
        onClick={retornar}
      >
        Cancelar
      </button>
  
      <button
        className="text-slate-100 bg-red-600 hover:bg-red-700 w-full py-2 rounded-lg"
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
  
  
);
       
}

export default DeletarProduto;
