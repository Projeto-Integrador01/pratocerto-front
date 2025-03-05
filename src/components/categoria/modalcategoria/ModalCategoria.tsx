import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./ModalCategoria.css";
import FormCategoria from "../formcategoria/FormCategoria";
import { useState } from "react";

function ModalCategoria() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const abrirModal = () => {
    console.log("Modal abrindo");
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    console.log("Modal fechando");
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="border px-4 py-2 bg-green-900 text-white hover:bg-green-700"
        onClick={abrirModal}
      >
        Nova Categoria
      </button>

      <Popup
        open={isModalOpen}
        modal
        closeOnDocumentClick // Permite fechar ao clicar fora
        contentStyle={{
          width: "600px",
          maxWidth: "90%",
          height: "auto",
          maxHeight: "80%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1050,
          overflowY: "auto",
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      >
        <div>
          <button
            onClick={fecharModal}
            className="absolute top-2 right-2 text-lg font-bold cursor-pointer"
          >
            &times;
          </button>
          <FormCategoria />
        </div>
      </Popup>
    </>
  );
}

export default ModalCategoria;
