import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produtos";
import { buscarLogado } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { DNA } from "react-loader-spinner";
import CardProdutos from "../cardprodutos/CardProdutos";

function ListaProduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarProdutos() {
    try {
      await buscarLogado('/produtos', setProdutos, {
        headers: {
          Authorization: token,
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
    buscarProdutos();
  }, [produtos.length]);

  // Função para o clique no botão
  const handleButtonClick = () => {
    navigate('/form');  // Navega para a página "/form"
  };

  return (
    <>
      {produtos.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}

      {/* Título e Botão de Cadastrar Produto */}
      <div className="flex justify-between items-center my-4 mx-6">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <button 
          onClick={handleButtonClick} 
          style={{
            padding: "10px 20px", 
            backgroundColor: "#28a745", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
            cursor: "pointer",
            marginLeft: "20px" // Adicionando margem para afastar o botão do título
          }}
        >
          Cadastrar Produto
        </button>
      </div>

      {/* Espaço entre o título e os cards */}
      <div className="my-6"></div> 

      <div className="flex justify-center w-full">
        <div className="container flex flex-col mx-2 relative">
          {/* Cards */}
          <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtos.map((produto) => (
              <CardProdutos key={produto.id} produto={produto} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProduto;
