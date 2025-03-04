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
        className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800"
        onClick={abrirModal}
      >
        Novo Produto
      </button>

      {/* Popup Modal */}
      <Popup
        open={isModalOpen}  // Controle do estado de abertura
        onClose={fecharModal}  // Função de fechar
        modal  // Garantindo que ele seja um modal
        contentStyle={{
          width: "600px",  // Largura do modal
          maxWidth: "90%", // Responsivo
          height: "auto",  // Tamanho automático
          maxHeight: "80%",  // Máxima altura
          padding: "20px",  // Padding interno
          backgroundColor: "#fff",  // Fundo branco
          borderRadius: "10px",  // Cantos arredondados
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Sombra suave
          zIndex: 1050,  // Modal sobre os outros elementos
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",  // Fundo semitransparente
          zIndex: 1040,  // Overlay abaixo do modal
        }}
      >
        <FormProduto />  {/* Formulário do Produto dentro do Modal */}
      </Popup>
    </>
  );
}

export default ModalProduto;
