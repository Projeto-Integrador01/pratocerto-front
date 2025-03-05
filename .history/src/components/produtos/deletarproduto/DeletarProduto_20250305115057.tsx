import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Produto from "../../../models/Produtos";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscarLogado, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

interface DeletarProdutoProps {
  fecharModal: () => void;
}

function DeletarProduto({ fecharModal }: DeletarProdutoProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [produto, setProduto] = useState<Produto>({} as Produto);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutoPorId(id: string) {
    try {
      await buscarLogado(`/produtos/${id}`, setProduto, {
        headers: {
          'Authorization': token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
  }, [id]);

  async function deletarProduto() {
    setIsLoading(true);

    try {
      await deletar(`/produtos/${id}`, {
        headers: {
          'Authorization': token,
        },
      });

      ToastAlerta('Produto apagado com sucesso!', 'sucesso');
      fecharModal();
      navigate('/produtos');
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      } else {
        ToastAlerta('Erro ao deletar o produto!', 'erro');
      }
    }

    setIsLoading(false);
  }

  function retornar() {
    navigate('/produtos');
  }

  return (
    <div className="container w-3/4 mx-auto py-6">
      <h1 className="text-3xl text-center my-4">Deletar Produto</h1>
      <p className="text-center font-semibold mb-6 text-lg">
        Você tem certeza de que deseja apagar o produto a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden shadow-lg">
        <header className="py-4 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Produto
        </header>
        <div className="p-6 flex flex-col items-center">
          <img
            src={produto.foto}
            alt={produto.nome}
            className="w-full h-56 object-cover rounded-lg border-2 border-gray-400 mb-4"
          />
          <p className="text-xl font-semibold text-gray-800 mb-4">{produto.nome}</p>
          <p className="text-sm text-gray-600 mb-4">{produto.descricao}</p>
        </div>
        
        {/* Removido a div com o flex aqui */}
        <button
          className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2 rounded-lg"
          onClick={retornar}
        >
          Não
        </button>
        <button
          className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-600 py-2 rounded-lg flex items-center justify-center"
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
            <span>Sim</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default DeletarProduto;
