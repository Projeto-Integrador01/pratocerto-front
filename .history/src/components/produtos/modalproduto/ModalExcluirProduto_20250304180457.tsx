import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Produto from "../../../models/Produtos";
import { excluir } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { useContext } from "react";

interface ModalExcluirProdutoProps {
  produto: Produto;
  onExcluir: () => void;
}

function ModalExcluirProduto({ produto, onExcluir }: ModalExcluirProdutoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const abrirModal = () => {
    setIsModalOpen(true);
  };

  const fecharModal = () => {
    setIsModalOpen(false);
  };

  const confirmarExclusao = async () => {
    try {
      await excluir(`/produtos/${produto.id}`, {
        headers: { Authorization: token },
      });
      ToastAlerta("Produto excluído com sucesso!", "sucesso");
      onExcluir(); // Atualiza a lista de produtos
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao excluir produto!", "erro");
      }
    }
    fecharModal();
  };

  return (
    <>
      <button
        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg"
        onClick={abrirModal}
      >
        Excluir
      </button>

      <Popup
        open={isModalOpen}
        onClose={fecharModal}
        modal
        contentStyle={{
          width: "400px",
          maxWidth: "90%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          zIndex: 1050,
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1040,
        }}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">
            Deseja excluir o produto "{produto.nome}"?
          </h2>
          <div className="flex justify-around w-full">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={confirmarExclusao}
            >
              Sim, Excluir
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded"
              onClick={fecharModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default ModalExcluirProduto;