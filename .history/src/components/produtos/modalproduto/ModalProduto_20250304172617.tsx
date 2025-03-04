import { useState } from "react";
import Popup from "reactjs-popup";  // Importando o Popup
import FormProduto from "../formprodutos/FormProduto";
import "reactjs-popup/dist/index.css"; // Importando o CSS do Popup

function ModalProduto({ produtoParaEditar }: { produtoParaEditar?: Produto }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirModal = () => setIsModalOpen(true);
  const fecharModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800 bg-amber-400"
        onClick={abrirModal}
      >
        {produtoParaEditar ? "Editar Produto" : "Novo Produto"}
      </button>

      <Popup open={isModalOpen} onClose={fecharModal} modal>
        <FormProduto produto={produtoParaEditar} fecharModal={fecharModal} />
      </Popup>
    </>
  );
}

export default ModalProduto;
