import { Link } from "react-router-dom";
import Produto from "../../../models/Produtos";

interface CardProdutosProps{
    produto: Produto;
}

function CardProdutos({produto}: CardProdutosProps){
return(
    <div className="border border-slate-900 rounded overflow-hidden bg-transparent p-4 flex flex-col items-center text-center">
    {/* Imagem centralizada */}
    <img 
        src={produto.restaurante?.foto} 
        className="h-32 w-32 rounded-full object-cover mb-2" 
        alt={produto.nome} 
    />

    {/* Preço e Info Vegetariano/Vegano */}
    <div className="flex justify-between w-full px-4">
        <span className="text-lg font-semibold text-left">R$ {produto.preco}</span>
        <span className="text-sm font-medium text-right">
            {produto.tipoalimento ? "Vegetariano" : produto.tipoalimento ? "Vegano" : "Não especificado"}
        </span>
    </div>

    {/* Título e Descrição */}
    <div className="p-4">
        <h4 className="text-lg font-semibold uppercase">{produto.categoria}</h4>
        <p className="text-sm text-gray-700">{produto.descricao}</p>
    </div>

    {/* Botões de Editar e Deletar */}
    <div className="flex w-full">
        <Link to={`//${produto.id}`}
            className="w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2">
            <button>Editar</button>
        </Link>
        <Link to={`//${produto.id}`} 
            className="text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center">
            <button>Deletar</button>
        </Link>
    </div>
</div>

)

}