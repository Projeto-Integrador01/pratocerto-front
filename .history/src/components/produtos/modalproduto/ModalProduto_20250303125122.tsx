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
          width: "600px",  // Definindo largura fixa
          maxWidth: "90%", // Para que o modal não ultrapasse a tela
          height: "auto",  // Deixe o tamanho automático conforme o conteúdo
          maxHeight: "80%", // Não ultrapassa 80% da altura da tela
          padding: "20px", // Adiciona um padding interno
          borderRadius: "10px", // Arredonda os cantos
          backgroundColor: "#fff", // Fundo branco para o modal
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para dar destaque
        }}
      >
        <FormProduto />
      </Popup>
    </>
  );
}

export default ModalProduto;
