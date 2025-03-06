import { useState, useEffect } from "react";
import CardHome from "../../components/cardhome/CardHome";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { Vortex } from "react-loader-spinner";

function Home() {
  const [produtos, setProdutos] = useState<any[]>([]); // Ajuste para tipar como array de produtos
  const [produtosAleatorios, setProdutosAleatorios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os produtos
  async function buscarProdutos() {
    try {
      const response = await buscar("/produtos", setProdutos); // Aqui está a alteração
    } catch (error: any) {
      if (error.toString().includes("403")) {
        ToastAlerta("Erro ao fazer a requisição!", "info");
      }
    } finally {
      setLoading(false);
    }
  }

  // Função para embaralhar e selecionar 3 produtos aleatórios
  function selecionarProdutosAleatorios() {
    if (produtos.length >= 3) {
      const produtosEmbaralhados = [...produtos].sort(() => Math.random() - 0.5);
      setProdutosAleatorios(produtosEmbaralhados.slice(0, 3));
    }
  }

  useEffect(() => {
    buscarProdutos(); // Buscar produtos ao carregar o componente
  }, []);

  useEffect(() => {
    if (produtos.length > 0) {
      selecionarProdutosAleatorios(); // Selecionar aleatoriamente os produtos após os dados serem carregados
    }
  }, [produtos]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Seção de texto e imagem */}
      <div className="relative flex justify-center w-full">
        <div className="flex flex-col md:flex-row gap-8 p-8 max-w-7xl w-full relative z-10">
          {/* Seção de texto */}
          <div className="flex-1 mt-12">
            <h1 className="text-4xl">PratoCerto!</h1>
            <h2 className="text-3xl text-verde-2 mt-12">Encontrar opções saudáveis nunca foi tão fácil</h2>
            <div className="border-t border-preto my-4 mt-12"></div>
            <p className="text-2xl">
              Facilitamos a busca por opções saudáveis. Encontre alimentos nutritivos,
              informações confiáveis sobre bem-estar e recursos para um lifestyle equilibrado,
              tudo em um só lugar.
            </p>
          </div>

          {/* Seção de imagem */}
          <div className="flex-1">
            <img
              src="https://i.ibb.co/QjK2dLz7/fundo-Home.jpg"
              alt="Imagem da Página Home"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Seção de produtos */}
      <div className="relative z-10 max-w-7xl mx-auto p-8 w-full">
        <h2 className="text-3xl text-start mb-12">Produtos</h2>
      </div>

      {/* Container para os produtos com a onda no fundo */}
      <div className="relative mt-[-90px]">
        {/* Onda de fundo */}
        <img
          src="https://files.catbox.moe/22ek93.svg"
          alt="Onda de fundo"
          className="absolute top-[10px] left-0 w-full h-full z-0" 
        />

        {/* Seção dos produtos */}
        <div className="relative z-10 max-w-7xl mx-auto p-8">
          {loading ? (
           <div className="flex justify-center items-center h-screen">
                                          <Vortex
                                              visible={true}
                                              height="120"
                                              width="120"
                                              ariaLabel="vortex-loading"
                                              wrapperClass="vortex-wrapper"
                                              colors={['#327349', '#F2DAAC', '#327349', '#F2DAAC', '#F2DAAC', '#327349']}
                                          />
                                      </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {produtosAleatorios.map((produto) => (
                <CardHome key={produto.id} produto={produto} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
