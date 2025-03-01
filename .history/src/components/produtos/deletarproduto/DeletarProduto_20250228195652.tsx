import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produtos";
import { AuthContext } from "../../../contexts/AuthContext";

function DeletarProduto() {

const { id } = useParams<{id: string}>();

const navigate = useNavigate()
const [isLoading, setIsLoading] = useState<boolean>(false)

const[produto, setProduto] = useState<Produto>({} as Produto)

const[usuario, handlLogout] = useContext(AuthContext)
const token = usuario.token



async function buscarProdutoPorId(id: string) {
    
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