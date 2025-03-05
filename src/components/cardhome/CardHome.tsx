import React from "react";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    imagem: string;
    link: string;
}

const CardHome: React.FC<{ produto: Produto }> = ({ produto }) => {
    return (
        <div className="bg-white border-4 border-verde-2 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[450px] flex flex-col cursor-pointer">
            {/* Imagem do produto */}
            <img 
                src={produto.imagem} 
                alt={produto.nome} 
                className="w-full h-52 object-cover rounded-t-lg"
            />

            {/* Conteúdo do card */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mt-4">{produto.nome}</h3>
                <p className="text-gray-600 mt-2 flex-grow">{produto.descricao}</p>

                {/* Botão Saiba Mais */}
                <a 
                    href={produto.link} 
                    className="text-verde-2 mt-4 inline-block self-start"
                >
                    Saiba mais
                </a>
            </div>
        </div>
    );
};

export default CardHome;
