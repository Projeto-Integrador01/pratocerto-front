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
          width: "550px",  // Definindo a largura do popup
          height: "80vh",  // Definindo a altura do popup (80% da altura da tela)
          padding: "15px", 
          backgroundColor: "#ffffff", 
          borderRadius: "10px",  // Borda arredondada
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Sombras suaves
          zIndex: 1050, 
          display: "flex", 
          flexDirection: "column",  
          justifyContent: "space-between",  // Para distribuir o espaço entre os itens
          overflow: "hidden",  // Sem rolagem no modal
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",  // Fundo escurecido por trás do modal
          zIndex: 1040,  
        }}
      >
        <div className="flex flex-col h-full">
          <FormProduto />  {/* Seu formulário dentro do modal */}
        </div>
      </Popup>
    </>
  );
}

export default ModalProduto;
