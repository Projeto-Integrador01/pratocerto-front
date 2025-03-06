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
  <div className='container w-1/3 mx-auto'>
      <div className='border rounded-2xl overflow-hidden'>
          <div className='p-4'>
              <h1 className='text-2xl text-center my-4'>Deletar Produto</h1>
              <p className='text-center font-semibold mb-4'>
                  Você tem certeza de que deseja deletar o produto?
              </p>
              <div className="flex">
                  <button
                      className='text-slate-100 bg-green-600 hover:bg-green-700 w-1/2 py-2'
                      onClick={retornar}
                  >
                      Cancelar
                  </button>
                  <button
                      className='text-slate-100 bg-red-600 hover:bg-red-700 w-1/2 py-2'
                      onClick={deletarProduto}
                  >
                      Deletar
                  </button>
              </div>
          </div>
      </div>
  </div>
);
       
}

export default DeletarProduto;
