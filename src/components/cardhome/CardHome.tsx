import React from "react";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    foto: string;
    link: string;
    tipoAlimento: string;
    restaurante?: {
        nome: string;
    };
}

const CardHome: React.FC<{ produto: Produto }> = ({ produto }) => {
    return (
        <div className="bg-white border-4 border-verde-2 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[450px] flex flex-col">
            {/* Imagem do produto */}
            <img 
                src={produto.foto} 
                alt={produto.nome} 
                className="w-full h-52 object-cover rounded-t-lg"
            />

            {/* Conteúdo do card */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mt-4">{produto.nome}</h3>

                {/* Nome do Restaurante */}
                {produto.restaurante && (
                    <p className="text-gray-600 mt-2 text-sm">{produto.restaurante.nome}</p>
                )}

                <p className="text-gray-600 mt-2 flex-grow">{produto.descricao}</p>

                <p className="text-gray-600 mt-2 flex-grow">
                Este é um Produto: {produto.tipoAlimento ? produto.tipoAlimento.charAt(0).toUpperCase() + produto.tipoAlimento.slice(1) : ""}</p>

                {/* Botão Saiba Mais */}
                {/* <a 
                    href={produto.link} 
                    className="text-verde-2 mt-4 inline-block self-start"
                >
                    Saiba mais
                </a> */}
            </div>
        </div>
    );
};

export default CardHome;
