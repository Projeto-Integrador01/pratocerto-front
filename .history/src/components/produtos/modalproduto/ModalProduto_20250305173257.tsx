import { useState } from "react";
import Popup from "reactjs-popup";
import FormProduto from "../formprodutos/FormProduto";
import "reactjs-popup/dist/index.css";

function ModalProduto() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar se está editando

  // Abrir modal para cadastrar
  const abrirModalCadastro = () => {
    setIsModalOpen(true);
    setIsEditing(false); // Define que é para cadastro
    document.body.style.overflow = "hidden";
  };

  // Abrir modal para edição
  const abrirModalEdicao = () => {
    setIsModalOpen(true);
    setIsEditing(true); // Define que é para edição
    document.body.style.overflow = "hidden";
  };

  // Fechar modal
  const fecharModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <button
        className="border px-4 py-2 bg-green-900 text-white hover:bg-green-700"
        onClick={abrirModalCadastro}
      >
        Cadastrar
      </button>

      <button
        className="border px-4 py-2 bg-blue-900 text-white hover:bg-blue-700 ml-4"
        onClick={abrirModalEdicao}
      >
        Editar Produto
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
          backgroundColor: "#F2DAAC",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1050,
          overflow: "hidden",
          border: isEditing ? "none" : "3px solid green", // Borda verde no popup apenas para cadastro
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      >
        <FormProduto isEditing={isEditing} />
      </Popup>
    </>
  );
}

export default ModalProduto;
