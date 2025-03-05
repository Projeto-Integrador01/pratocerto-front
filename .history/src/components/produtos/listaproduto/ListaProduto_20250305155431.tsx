import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Produto from "../../../models/Produtos";
import { buscar} from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { DNA } from "react-loader-spinner";
import CardProdutos from "../cardprodutos/CardProdutos";

function ListaProduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Função para buscar os produtos
  async function buscarProdutos() {
    try {
      await buscar("/produtos", setProdutos);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("Erro ao fazer a requisição!", "info");
      }
    }
  }


  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

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
      <div className="flex items-center mt-9 mx-25">
        <h1 className="text-3xl font-bold mr-6">Produtos</h1>
      </div>

      {/* Espaço entre o título e os cards */}
      <div className="my-6"></div>

      {/* Lista de produtos */}
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
