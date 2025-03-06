import { useState } from "react";
import Popup from "reactjs-popup";  // Importando o Popup

import "reactjs-popup/dist/index.css"; // Importando o CSS do Popup
import FormCategoria from "../formcategoria/FormCategoria";

function ModalCategoria() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const abrirModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Impede a rolagem da tela
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Restaura a rolagem da tela
  };

  return (
    <>
      <button
        className="mt-5 border ml-6 px-4 py-2 bg-verde-2 text-white hover:bg-verde-1 rounded-lg cursor-pointer"  // Adicionando border-radius aqui
        onClick={abrirModal}
      >
        Cadastrar Categoria
      </button>

      <Popup
        open={isModalOpen}
        onClose={fecharModal}
        modal
        contentStyle={{
          width: "30%",
          height: "100vh",
          padding: "15px",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)",
          zIndex: 1050,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      >
        <FormCategoria />  {/* Seu formulário dentro do modal */}
      </Popup>
    </>
  );
}

export default ModalCategoria;