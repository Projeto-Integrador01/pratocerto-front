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

      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col mx-2 relative">  {/* Tornar o contêiner relativo */}
          <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {produtos.map((produto) => (
              <CardProdutos key={produto.id} produto={produto} />
            ))}
          </div>

          {/* Botão fixo sobre os cards */}
          <button 
            onClick={handleButtonClick} 
            style={{
              position: "absolute", // Fixa o botão em relação ao contêiner pai
              top: "20px", // Distância do topo do contêiner
              left: "20px", // Distância da esquerda do contêiner
              padding: "10px 20px", 
              backgroundColor: "#007BFF", 
              color: "white", 
              border: "none", 
              borderRadius: "5px", 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
              cursor: "pointer",
              zIndex: 10,  // Garante que o botão fique sobre os cards
            }}
          >
            Ação
          </button>
        </div>
      </div>
    </>
  );
}

export default ListaProduto;
