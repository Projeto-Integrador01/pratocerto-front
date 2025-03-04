import { useState } from "react";
import Popup from "reactjs-popup";
import FormProduto from "../formprodutos/FormProduto";

function ModalProduto() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const abrirModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Botão "Novo Produto" para abrir o modal */}
      <button
        className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800"
        onClick={abrirModal}
      >
        Novo Produto
      </button>

      {/* Popup Modal */}
      <Popup
        open={isModalOpen}
        onClose={fecharModal}
        modal
        contentStyle={{
          width: "600px",  // Largura fixa para o modal
          maxWidth: "90%", // Modal responsivo (não ultrapassa 90% da largura)
          height: "auto",  // Tamanho automático conforme o conteúdo
          maxHeight: "80%", // Modal não ultrapassa 80% da altura da tela
          padding: "20px", // Padding para o conteúdo interno
          borderRadius: "10px", // Cantos arredondados
          backgroundColor: "#fff", // Fundo branco para o modal
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra suave
          zIndex: 1050, // Definindo z-index alto para o modal ficar acima dos outros elementos
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente atrás do modal
          zIndex: 1040,  // Overlay fica atrás do modal
        }}
      >
        <FormProduto />
      </Popup>
    </>
  );
}

export default ModalProduto;
