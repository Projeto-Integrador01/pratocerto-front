import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormProduto from "../formprodutos/FormProduto"; // Importando o formulário de edição

function ModalEditarProduto({ produtoId }: { produtoId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirModal = () => setIsModalOpen(true);
  const fecharModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        className="
          border-none rounded 
          text-white bg-blue-500 
          hover:bg-blue-600 
          focus:outline-none 
          text-sm 
          w-full 
          mt-auto 
          py-2 
          px-4
        "
        onClick={abrirModal}
      >
        Editar Produto
      </button>

      <Popup
        open={isModalOpen}
        onClose={fecharModal}
        modal
        contentStyle={{
          width: "500px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Passando o ID do produto para o FormProduto */}
        <FormProduto produtoIdId={produtoId} />
      </Popup>
    </>
  );
}

export default ModalEditarProduto;
