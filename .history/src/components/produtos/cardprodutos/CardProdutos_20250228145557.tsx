import Produto from "../../../models/Produtos";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {
  return (
    <div className="w-[515px] h-[530px] relative">
      <div className="w-[422px] h-[530px] left-0 top-0 absolute bg-white rounded-[15px] border-4 border-[#327349]"></div>
      <img className="w-[374px] h-[250px] left-[24px] top-[24px] absolute rounded-[15px]" src="https://placehold.co/374x250" />
      <div className="w-[276px] h-[30px] left-[30px] top-[350px] absolute text-black text-[25px] font-medium font-['Lexend Giga']">Picadinho </div>
      <div className="w-[276px] h-[30px] left-[239px] top-[289px] absolute text-[#327349] text-[25px] font-normal font-['Lexend Giga']">{produto.categoria}</div>
      <div className="w-[276px] h-[30px] left-[30px] top-[289px] absolute text-black text-[25px] font-normal font-['Lexend Giga']">{produto.preco}</div>
      <div className="w-[368px] h-[30px] left-[30px] top-[392px] absolute text-[#bcbcbc] text-[22px] font-normal font-['Lexend Giga']">{produto.descricao}</div>
      <div className="w-[368px] h-[30px] left-[30px] top-[458px] absolute text-[#bcbcbc] text-[22px] font-normal font-['Lexend Giga']">{produto.restaurante}</div>
    </div>
  );
}

export default CardProdutos;
