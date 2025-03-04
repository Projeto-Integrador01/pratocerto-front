import CardHome from "../../components/cardhome/CardHome";

const produtos = [
  { id: 1, nome: "Produto 1", descricao: "Descrição do produto 1", imagem: "/caminho/para/imagem1.jpg", link: "#" },
  { id: 2, nome: "Produto 2", descricao: "Descrição do produto 2", imagem: "/caminho/para/imagem2.jpg", link: "#" },
  { id: 3, nome: "Produto 3", descricao: "Descrição do produto 3", imagem: "/caminho/para/imagem3.jpg", link: "#" },
];

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Seção de texto e imagem */}
      <div className="relative flex justify-center w-full">
        <div className="flex flex-col md:flex-row gap-8 p-8 max-w-7xl w-full relative z-10">
          {/* Seção de texto */}
          <div className="flex-1">
            <h1 className="text-4xl">PratoCerto!</h1>
            <h2 className="text-3xl text-verde-2">Encontrar opções saudáveis nunca foi tão fácil</h2>
            <div className="border-t border-preto my-4"></div>
            <p className="text-2xl">
              Facilitamos a busca por opções saudáveis. Encontre alimentos nutritivos,
              informações confiáveis sobre bem-estar e recursos para um lifestyle equilibrado,
              tudo em um só lugar.
            </p>
          </div>

          {/* Seção de imagem */}
          <div className="flex-1">
            <img
              src="/src/assets/img/background/fundo_home.png"
              alt="Imagem da Página Home"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto p-8 w-full">
  <h2 className="text-3xl text-start mb-10">Produtos</h2>
</div>


      {/* Container para os produtos com a onda no fundo */}
      <div className="relative mt-[-90px]"> {/* Subindo ainda mais os produtos */}
  {/* Onda de fundo */}
  <img
    src="/src/assets/img/background/ondaSimplesCima2.svg"
    alt="Onda de fundo"
    className="absolute top-[10px] left-0 w-full h-full z-0" 
  />

  {/* Seção dos produtos */}
  <div className="relative z-10 max-w-7xl mx-auto p-8">
     {/* Aproximando dos cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {produtos.map((produto) => (
        <CardHome key={produto.id} produto={produto} />
      ))}
    </div>
  </div>
</div>

       </div>
  );
}

export default Home;
