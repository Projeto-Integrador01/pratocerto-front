import { useState } from "react";
import Popup from "reactjs-popup";
import FormProduto from "../formprodutos/FormProduto";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ModalProduto({ tipoModal, produtoSelecionado, onConfirmarDelecao }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const abrirModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setIsModalOpen(false);
  };

  // Função para lidar com a confirmação de exclusão
  const confirmarDelecao = () => {
    onConfirmarDelecao(produtoSelecionado.id);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Botão "Novo Produto" para abrir o modal */}
      {tipoModal === "novo" && (
        <button
          className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800"
          onClick={abrirModal}
        >
          Novo Produto
        </button>
      )}

      {/* Botão Editar */}
      {tipoModal === "editar" && (
        <button
          className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800"
          onClick={abrirModal}
        >
          Editar Produto
        </button>
      )}

      {/* Botão Deletar */}
      {tipoModal === "deletar" && (
        <button
          className="border rounded px-4 py-2 hover:bg-white hover:text-red-600"
          onClick={abrirModal}
        >
          Deletar Produto
        </button>
      )}

      {/* Popup Modal */}
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
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {tipoModal === "novo" && <FormProduto />}
        {tipoModal === "editar" && <FormProduto produto={produtoSelecionado} />}
        {tipoModal === "deletar" && (
          <div>
            <h2 className="text-xl text-center">Tem certeza que deseja deletar este produto?</h2>
            <button
              onClick={confirmarDelecao}
              className="bg-red-500 text-white rounded p-2 mt-4 w-full"
            >
              Confirmar Deletação
            </button>
            <button
              onClick={fecharModal}
              className="bg-gray-500 text-white rounded p-2 mt-2 w-full"
            >
              Cancelar
            </button>
          </div>
        )}
      </Popup>
    </>
  );
}

export default ModalProduto;
