import { Link} from "react-router-dom";
import Produto from "../../../models/Produtos";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
interface CardProdutosProps {
  produto: Produto;
}



function CardProdutos({ produto }: CardProdutosProps) {
  const { usuario } = useContext(AuthContext);

  return (
    <div className="border-slate-900 border flex flex-col rounded overflow-hidden justify-between">
      <div>
        <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
          <img
            src={produto.foto}
            className="h-12 rounded-full"
            alt={produto.nome}
          />
          <h3 className="text-lg font-bold text-center uppercase">
            {produto.nome}
          </h3>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold uppercase">
            {produto.nome}
          </h4>
          <p className="font-medium">{produto.descricao}</p>
          <p className="text-green-600 font-bold">Preço: R$ {produto.preco.toFixed(2)}</p>
          <p>Categoria: {produto.categoria?.nome}</p>
          <p>Restaurante: {produto.restaurante?.usuario}</p>  {/* Nome do restaurante */}
        </div>
      </div>

      {/* Somente o restaurante logado pode deletar ou editar o produto */}
      {
        // produto.restaurante?.id === usuario.produto && (
          <div className="flex">
            <Link to={`/editarproduto/${produto.id}`}
                    className='w-full text-slate-100 bg-indigo-400
                     hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

            {/* Link para deletar o produto */}
            <Link
              to={`/deletarproduto/${produto.id}`} // Rota de deletar o produto
              className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center">
              <button>Deletar</button>
            </Link>
          </div>
        // )
      }
    </div>
  );
}


export default CardProdutos;
