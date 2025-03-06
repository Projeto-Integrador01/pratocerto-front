import { useState } from "react";
import Popup from "reactjs-popup";
import FormProduto from "../formprodutos/FormProduto";
import "reactjs-popup/dist/index.css";

function ModalProduto({ id }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const fecharModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <button
        className="border px-4 py-2 bg-green-900 text-white hover:bg-green-700"
        onClick={abrirModal}
      >
        {id ? "Editar Produto" : "Cadastrar"}
      </button>

      <Popup
        open={isModalOpen}
        onClose={fecharModal}
        modal
        contentStyle={{
          width: "600px",
          maxWidth: "90%",
          height: "auto",
          padding: "20px",
          backgroundColor: id ? "#FFD700" : "#F2DAAC", // Fundo diferente para edição
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1050,
          overflow: "hidden",
          border: id ? "4px solid blue" : "4px solid green", // Borda diferente para edição
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      >
        <FormProduto isEditing={!!id} />
      </Popup>
    </>
  );
}

export default ModalProduto;
