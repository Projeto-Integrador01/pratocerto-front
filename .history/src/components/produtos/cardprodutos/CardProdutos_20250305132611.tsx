import { Link } from "react-router-dom";
import Produto from "../../../models/Produtos";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";
import ModalExcluirProduto from "../modalexcluirproduto/ModalExcluirProduto";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80 mx-auto border-4 border-green-700 flex flex-col">
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
        <h3 className="text-gray-600 text-sm">
          {String(produto.restaurante?.nome || "Restaurante desconhecido")}
        </h3>

        <p className="text-gray-600 text-sm">{produto.descricao}</p>
      </div>

      {/* Botões de Ação (Editar/Excluir) - Condicionalmente renderizado */}
      {produto.restaurante?.id === usuario.id && (
        <div className="flex gap-2 p-4">
          {/* Botão Editar */}
          <Link
            to={`/editarproduto/${produto.id}`}
            className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2 rounded-lg"
          >
            Editar
          </Link>

          {/* Botão Excluir */}
          <div className="flex-1">
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg"
              style={{
                display: "inline-block", // Assegura que o botão seja visível sem hover
                visibility: "visible", // Garante que o botão esteja visível
              }}
            >
              <ModalExcluirProduto produtoId={produto.id} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardProdutos;
