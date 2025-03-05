import { useState } from "react";
import Popup from "reactjs-popup";  // Importando o Popup
import FormProduto from "../formprodutos/FormProduto";
import "reactjs-popup/dist/index.css"; // Importando o CSS do Popup

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
        className="border px-4 py-2 bg-green-900 text-white hover:bg-green-700"
        onClick={abrirModal}
      >
        Cadastrar
      </button>

      {/* Popup Modal */}
      <Popup
  open={isModalOpen}
  onClose={fecharModal}
  modal
  contentStyle={{
    width: "600px",  // Aumentando a largura do modal
    maxWidth: "90%", // Responsividade
    height: "auto",  // Tamanho automático
    maxHeight: "80%",  // Máxima altura do modal
    padding: "20px",  // Padding interno para espaçar o conteúdo
    backgroundColor: "#fff",  // Fundo branco
    borderRadius: "10px",  // Cantos arredondados
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Sombra suave
    zIndex: 1050,  // Modal sobre os outros elementos
    overflowY: "auto",  // Permite rolagem se o conteúdo for grande
  }}
  overlayStyle={{
    backgroundColor: "rgba(0, 0, 0, 0.5)",  // Fundo semitransparente
    zIndex: 1040,  // Overlay abaixo do modal
  }}
>
  <FormProduto />  {/* Formulário do Produto */}
</Popup>

    </>
  );
}

export default ModalProduto;
