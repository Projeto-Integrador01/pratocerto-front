import { Link } from "react-router-dom";
import Produto from "../../../models/Produtos";

interface CardPopup {
    produto: Produto;
}

const CardPopup: React.FC<{ produto: Produto }> = ({ produto }) => {
    return (
        <div className="bg-white border-4 border-verde-2 p-6 rounded-lg shadow-lg transition-all duration-300 min-h-[450px] flex flex-col">
    
    {/* Imagem do produto + Selo */}
    <div className="relative p-4">
        <img
          src={produto.foto}
          alt={produto.nome}
          className="w-full h-48 object-cover rounded-lg border-2 border-gray-400"
        />
      <div className={`absolute top-2 right-2 text-white text-sm font-semibold px-2 py-1 rounded-full 
          ${produto.tipoAlimento === 'tradicional' ? 'bg-[#985C41]' : 
          produto.tipoAlimento === 'vegetariano' ? 'bg-[#CD8D00]' : 
          produto.tipoAlimento === 'vegano' ? 'bg-verde-2 text-black' : ''}`}>
          {produto.tipoAlimento}
      </div>
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
        <h3 className="text-2xl text-gray-800 mb-2">{produto.nome}</h3>
        <hr className="my-4 border-t-2 border-cinza-2" />

        <p className="text-gray-600 text-sm">{produto.descricao}</p>
        <hr className="my-4 border-t-2 border-cinza-2" />  
        <h3 className="text-verde-2 font-semibold text-lg">{String(produto.restaurante?.nome || "Restaurante desconhecido") }</h3> 
        <h3 className="text-gray-600 font-semibold text-lg">{String(produto.restaurante?.endereco || "Restaurante desconhecido") }</h3> 
      </div>

</div>

    );
};

export default CardPopup;