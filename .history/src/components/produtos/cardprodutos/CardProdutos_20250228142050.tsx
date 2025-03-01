import { Link } from "react-router-dom";
import Produto from "../../../models/Produtos";

interface CardProdutosProps {
  produto: Produto | null; // Adicionando 'null' caso não haja produto
}

function CardProdutos({ produto }: CardProdutosProps) {
  // Verificando se o produto existe
  if (!produto) {
    return (
      <div className="border border-slate-900 rounded overflow-hidden bg-transparent p-4 flex flex-col items-center text-center">
        <p className="text-gray-500">Nenhum produto encontrado.</p> {/* Mensagem para card vazio */}
      </div>
    );
  }

  return (
    <div className="border border-slate-900 rounded overflow-hidden bg-transparent p-4 flex flex-col items-center text-center">
      {/* Imagem centralizada */}
      <img
        src={produto.restaurante?.foto || "caminho/para/imagem/default.jpg"} // Imagem default
        className="h-32 w-32 rounded-full object-cover mb-2"
        alt={produto.nome}
      />

      {/* Preço e Info Vegetariano/Vegano */}
      <div className="flex justify-between w-full px-4">
        <span className="text-lg font-semibold text-left">R$ {produto.preco}</span>
        <span className="text-sm font-medium text-right">
          {produto.tipoalimento === "Vegetariano"
            ? "Vegetariano"
            : produto.tipoalimento === "Vegano"
            ? "Vegano"
            : "Não especificado"}
        </span>
      </div>

      {/* Título e Descrição */}
      <div className="p-4">
        <h4 className="text-lg font-semibold uppercase">
          {produto.categoria?.nome || "Sem Categoria"}
        </h4>
        <p className="text-sm text-gray-700">{produto.descricao}</p>
      </div>

      {/* Botões de Editar e Deletar */}
      <div className="flex w-full">
        <Link
          to={`/editarproduto/${produto.id}`}
          className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarproduto/${produto.id}`}
          className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardProdutos;
