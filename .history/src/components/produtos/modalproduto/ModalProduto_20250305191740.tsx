import { useState } from "react";
import Popup from "reactjs-popup";  // Importando o Popup
import FormProduto from "../formprodutos/FormProduto";
import "reactjs-popup/dist/index.css"; // Importando o CSS do Popup

function ModalProduto() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const abrirModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Impede a rolagem da tela
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Restaura a rolagem da tela
  };

  return (
    <>
      <button
        className="border px-4 py-2 bg-green-900 text-white hover:bg-green-700 rounded-lg"  // Adicionando border-radius aqui
        onClick={abrirModal}
      >
        Cadastrar
      </button>

      <Popup
        open={isModalOpen}
        onClose={fecharModal}
        modal
        contentStyle={{
          width: "90%",  // O modal ocupará 90% da largura da tela
          height: "90vh",  // O modal ocupará 90% da altura da tela
          padding: "15px", 
          backgroundColor: "#ffffff", 
          borderRadius: "10px",  // Borda arredondada
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Sombras suaves
          zIndex: 1050, 
          display: "flex", 
          flexDirection: "column",  
          justifyContent: "space-between",  // Distribui os itens para preencher o espaço
          overflow: "auto",  // Permite rolagem dentro do modal, se necessário
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",  // Fundo escurecido por trás do modal
          zIndex: 1040,  
        }}
      >
        <FormProduto />  {/* Seu formulário dentro do modal */}
      </Popup>
    </>
  );
}

export default ModalProduto;
