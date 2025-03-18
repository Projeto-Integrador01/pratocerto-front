import React from "react";
import { Link } from "react-router-dom";
import Produto from "../../models/Produtos";

interface CardHomeProps {
    produto: Produto;
}

const CardHome: React.FC<{ produto: Produto }> = ({ produto }) => {
    return (
        <div className="bg-white border-4 border-verde-2 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[450px] flex flex-col">
    
    {/* Imagem do produto + Selo */}
    <div className="relative">
        <img 
            src={produto.foto} 
            alt={produto.nome} 
            className="w-full h-52 object-cover rounded-t-lg"
        />

        {/* Selo do Produto */}
        {produto.tipoAlimento && (
            <div className="absolute top-2 right-2 bg-green-700 text-white text-sm font-semibold px-2 py-1 rounded-full">
                {produto.tipoAlimento}
            </div>
        )}
    </div>

    {/* Conteúdo do card */}
    <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mt-4">{produto.nome}</h3>

        {/* Nome do Restaurante */}
        {produto.restaurante && (
            <p className="text-gray-600 mt-2 text-sm">{produto.restaurante.nome}</p>
        )}

        <p className="text-gray-600 mt-2 flex-grow">{produto.descricao}</p>
    </div>

    <Link to="/produtos" className="ml-52 hover:text-verde-1 hover:scale-110 transition duration-300">Saiba mais</Link>
</div>

    );
};

export default CardHome;
