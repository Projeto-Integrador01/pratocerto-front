import { Link } from "react-router-dom";
import Produto from "../../../models/Produtos";

interface CardProdutosProps {
  produto: Produto;
}



function CardProdutos({ produto }: CardProdutosProps) {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Imagem do Produto */}
      <div className="relative">
        <img src={produto.foto} alt={produto.nome} className="w-full h-48 object-cover" />
      </div>

      {/* Conteúdo do Produto */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{produto.nome}</h3>
        <p className="text-gray-600 text-sm mb-2">{produto.descricao}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-green-600 font-bold">R$ {produto.preco.toFixed(2)}</p>
          </div>
          <div className="text-sm text-gray-500">
            Saudável
          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="bg-gray-100 p-4">
        <p className="text-sm text-gray-700">Restaurante: {produto.restaurante?.nome || 'N/A'}</p>
        <p className="text-sm text-gray-700">Categoria: {produto.categoria?.nome || 'N/A'}</p>
      </div>

      {/* Botões de Ação (Editar/Excluir) - Condicionalmente renderizado */}
      {produto.restaurante?.id === produto.restaurante?.id && (
        <div className="flex">
          <Link
            to={`/editarproduto/${produto.id}`}
            className="w-1/2 bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2"
          >
            Editar
          </Link>
          <Link
            to={`/deletarproduto/${produto.id}`}
            className="w-1/2 bg-red-500 hover:bg-red-600 text-white text-center py-2"
          >
            Excluir
          </Link>
        </div>
      )}
    </div>
    // <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
    //   <div>
    //     <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
    //       <img
    //         src={produto.foto}
    //         className="h-12 rounded-full"
    //         alt={produto.nome}
    //       />
    //       <h3 className="text-lg font-bold text-center uppercase">
    //         {produto.nome}
    //       </h3>
    //     </div>
    //     <div className="p-4">
    //       <h4 className="text-lg font-semibold uppercase">
    //         {produto.nome}
    //       </h4>
    //       <p className="font-medium">{produto.descricao}</p>
    //       <p className="text-green-600 font-bold">Preço: R$ {produto.preco.toFixed(2)}</p>
    //       <p>Categoria: {produto.categoria?.nome}</p>
    //       <p>Restaurante: {produto.restaurante?.nome}</p>  {/* Nome do restaurante */}
    //     </div>
    //   </div>

    //   {/* Somente o restaurante logado pode deletar ou editar o produto */}
    //   {
    //     // produto.restaurante?.id === usuario.produto && (
    //     <div className="flex">
    //       <Link to={`/editarproduto/${produto.id}`}
    //         className='w-full text-slate-100 bg-indigo-400
    //                  hover:bg-indigo-800 flex items-center justify-center py-2'>
    //         <button>Editar</button>
    //       </Link>

    //       {/* Link para deletar o produto */}
    //       <Link
    //         to={`/deletarproduto/${produto.id}`} // Rota de deletar o produto
    //         className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center">
    //         <button>Deletar</button>
    //       </Link>
    //     </div>
    //     // )
    //   }
    // </div>
  );
}


export default CardProdutos;
