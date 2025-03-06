import { useState } from "react";
import Popup from "reactjs-popup";  // Importando o Popup
import FormProduto from "../formprodutos/FormProduto";
import "reactjs-popup/dist/index.css"; // Importando o CSS do Popup

function ModalProduto() {
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
        className="border px-4 py-2 bg-green-900 text-white hover:bg-green-700 rounded-lg"  // Adicionando border-radius aqui
        onClick={abrirModal}
      >
        Cadastrar
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
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
        <FormProduto />  {/* Seu formulário dentro do modal */}
      </Popup>
    </>
  );
}

export default ModalProduto;
