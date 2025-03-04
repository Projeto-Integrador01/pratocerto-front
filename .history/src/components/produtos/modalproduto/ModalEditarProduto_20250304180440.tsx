import Popup from "reactjs-popup";
import FormProduto from "../formprodutos/FormProduto";
import "reactjs-popup/dist/index.css";
import Produto from "../../../models/Produtos";
import { useState } from "react";

interface ModalEditarProdutoProps {
  produto: Produto;
}

function ModalEditarProduto({ produto }: ModalEditarProdutoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirModal = () => {
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2 rounded-lg"
        onClick={abrirModal}
      >
        Editar
      </button>

      <Popup
        open={isModalOpen}
        onClose={fecharModal}
        modal
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
        <FormProduto produto={produto} />
      </Popup>
    </>
  );
}

export default ModalEditarProduto;