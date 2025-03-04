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
      <Popup open={isModalOpen} onClose={fecharModal} modal>
        <FormProduto />
      </Popup>
    </>
  );
}

export default ModalProduto;
