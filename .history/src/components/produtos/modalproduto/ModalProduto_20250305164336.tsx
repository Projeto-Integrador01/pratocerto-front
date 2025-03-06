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


      <button
        className="border px-4 py-2 bg-green-900 text-white hover:bg-green-700"
        onClick={abrirModal}
      >
        Cadastrar
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
    backgroundColor: "#F2DAAC",  // Mudando a cor do fundo
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
  <FormProduto />  
</Popup>

    </>
  );
}

export default ModalProduto;
