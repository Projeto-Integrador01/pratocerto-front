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
        Você tem certeza que deseja deletar o produto?
      </p>

      {/* Container flex para os botões */}
      <div className="flex gap-4">
        <button
          className="text-slate-100 bg-red-400 hover:bg-red-600 w-1/2 py-2 rounded-lg"
          onClick={fecharModal}
        >
          Não
        </button>
        <button
          className="w-1/2 text-slate-100 bg-indigo-400 hover:bg-indigo-600 py-2 rounded-lg flex items-center justify-center"
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
