import { useState, useEffect } from "react";
import Produto from "../../../models/Produtos";
import { buscar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Vortex } from "react-loader-spinner";
import CardProdutos from "../cardprodutos/CardProdutos";
import { useLocation } from "react-router-dom";

function ListaProduto() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [quantidadeExibida, setQuantidadeExibida] = useState(6); // Quantidade inicial de produtos
  const location = useLocation();
  const categoriaSelecionada = new URLSearchParams(location.search).get("categoria");

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
  }, []);

  // Função para carregar mais produtos (aumenta a quantidade exibida em +6)
  const carregarMais = () => {
    setQuantidadeExibida((prev) => prev + 6);
  };

  const produtosFiltrados = categoriaSelecionada
    ? produtos.filter((produto) => produto.categoria.nome === categoriaSelecionada)
    : produtos;

  return (
    <>
      {/* Loader enquanto carrega */}
      {produtosFiltrados.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <Vortex
            visible={true}
            height="120"
            width="120"
            ariaLabel="vortex-loading"
            wrapperClass="vortex-wrapper"
            colors={["#327349", "#F2DAAC", "#327349", "#F2DAAC", "#F2DAAC", "#327349"]}
          />
        </div>
      )}

      {/* Título */}
      <div className="flex items-center mt-9 mx-25">
        <h1 className="text-3xl font-bold mr-6">Produtos</h1>
      </div>

      <div className="my-6"></div>

      {/* Grid de produtos */}
      <div className="flex justify-center w-full">
        <div className="container flex flex-col mx-2 relative">
          <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtosFiltrados.slice(0, quantidadeExibida).map((produto) => (
              <CardProdutos key={produto.id} produto={produto} />
            ))}
          </div>

          {/* Botão "Ver Mais" */}
          {quantidadeExibida < produtosFiltrados.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={carregarMais}
                className="px-6 py-3 mb-10 bg-verde-2 text-white text-lg font-bold rounded-lg hover:bg-green-700 transition-all"
              >
                Ver Mais
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ListaProduto;
