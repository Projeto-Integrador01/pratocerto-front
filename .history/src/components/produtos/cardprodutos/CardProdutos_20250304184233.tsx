import Produto from "../../../models/Produtos";
import { AuthContext } from "../../../contexts/AuthContext";
interface CardProdutosProps {
  produto: Produto;
  onProdutoAtualizado: () => void;
}

function CardProdutos({ produto, onProdutoAtualizado }: CardProdutosProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80 mx-auto border-4 border-green-700 flex flex-col">
      <div className="relative p-4">
        <img
          src={produto.foto}
          alt={produto.nome}
          className="w-full h-48 object-cover rounded-lg border-2 border-gray-400"
        />
      </div>

      <div className="flex justify-between items-center p-4">
        <p className="text-green-600 font-bold">R$ {produto.preco.toFixed(2)}</p>
        <div className="text-sm text-gray-500">
          {produto.categoria?.nome || "Sem categoria"}
        </div>
      </div>

      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{produto.nome}</h3>
        <p className="text-gray-600 text-sm">{produto.descricao}</p>
      </div>

      {produto.restaurante?.id === produto.restaurante?.id && (
        <div className="flex gap-2 p-4">
          <ModalEditarProduto produto={produto} />
          <ModalExcluirProduto produto={produto} onExcluir={onProdutoAtualizado} />
        </div>
      )}
    </div>
  );
}

export default CardProdutos;