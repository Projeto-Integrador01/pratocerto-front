import React, { useState } from "react";
import Produto from "../../models/Produtos";
import Popup from "reactjs-popup";
import ModalProdutoPopup from "../produtos/modalprodutopopup/ModalProdutoPopup";

interface CardHomeProps {
  produto: Produto;
}

const CardHome: React.FC<CardHomeProps> = ({ produto }) => {
  const [openModal, setOpenModal] = useState(false); // Controle do modal

  return (
    <div className="bg-white border-4 border-verde-2 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[450px] flex flex-col">
      {/* Imagem do produto + Selo */}
      <div className="relative p-4">
        <img
          src={produto.foto}
          alt={produto.nome}
          className="w-full h-52 object-cover rounded-lg border-2 border-gray-400"
        />
      <div className={`absolute top-2 right-2 text-white text-sm font-semibold px-2 py-1 rounded-full 
          ${produto.tipoAlimento === 'tradicional' ? 'bg-[#985C41]' : 
          produto.tipoAlimento === 'vegetariano' ? 'bg-[#CD8D00]' : 
          produto.tipoAlimento === 'vegano' ? 'bg-verde-2 text-black' : ''}`}>
          {produto.tipoAlimento}
      </div>
      </div>

      {/* Conteúdo do card */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mt-4">{produto.nome}</h3>
        {produto.restaurante && <p className="text-gray-600 mt-2 text-sm">{produto.restaurante.nome}</p>}
        <p className="text-gray-600 mt-2 flex-grow">{produto.descricao}</p>
      </div>

      {/* Botão "Saiba Mais" que abre o modal */}
      <button
        onClick={() => setOpenModal(true)}
        className="ml-52 hover:text-verde-1 hover:scale-110 transition duration-300 cursor-pointer"
      >
        Saiba mais
      </button>

      {/* Modal Produto Popup */}
      <ModalProdutoPopup produto={produto} open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default CardHome;
