import { Link } from "react-router-dom";
import Produto from "../../../models/Produtos";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {

  const { usuario } = useContext(AuthContext);
  return (

    <div className="bg-white rounded-lg overflow-hidden w-80 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300 mx-auto border-4 border-green-700 flex flex-col">
      {/* Imagem do Produto */}
      <div className="relative p-4">
        <img
          src={produto.foto}
          alt={produto.nome}
          className="w-full h-48 object-cover rounded-lg border-2 border-gray-400"
        />
      </div>

      {/* Preço e Categoria */}
      <div className="flex justify-between items-center p-4">
        <p className="text-green-600 font-bold">R$ {produto.preco.toFixed(2)}</p>
        <div className="text-sm text-gray-500">
          {produto.categoria?.nome || "Sem categoria"}
        </div>
      </div>

      {/* Nome e Descrição do Produto */}
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{produto.nome}</h3>
        <h3 className="text-gray-600 text-sm">{String(produto.restaurante?.nome || "Restaurante desconhecido") }</h3>  

        <p className="text-gray-600 text-sm">{produto.descricao}</p>
      </div>

      {/* Botões de Ação (Editar/Excluir) - Condicionalmente renderizado */}
      {produto.restaurante?.id === usuario.id && (
        <div className="flex gap-2 p-4">
          <Link
            to={`/editarproduto/${produto.id}`}
            className="flex-1 bg-verde-2 text-white hover:bg-bege-2 hover:text-verde-2 hover:border-2 border-verde-2 text-center py-2 rounded-lg transition-all"
          >
            Editar
          </Link>
          <Link
            to={`/deletarproduto/${produto.id}`}
            className="flex-1 bg-verde-2 text-white text-center hover:bg-bege-2 hover:text-verde-2 hover:border-2 border-verde-2 py-2 rounded-lg transition-all"
          >
            Excluir
          </Link>
        </div>
      )}
    </div>
  );
}

export default CardProdutos;