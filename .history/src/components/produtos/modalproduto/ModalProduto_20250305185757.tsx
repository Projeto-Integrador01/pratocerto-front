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
          width: "100%",  // O modal ocupará toda a largura da tela
          height: "100vh",  // O modal ocupará toda a altura da tela
          padding: "15px",  // Ajustando o padding
          backgroundColor: "#ffffff",  // Mudando a cor de fundo do modal
          borderRadius: "10px",  // Borda arredondada
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Sombras
          zIndex: 1050,  // Colocando o modal sobre outros elementos
          display: "flex",  // Usando flexbox para distribuir o conteúdo
          flexDirection: "column",  // Colocando os elementos na coluna
          justifyContent: "center",  // Centralizando o conteúdo
          overflow: "hidden",  // Impedindo a rolagem interna
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",  // Cor do overlay
          zIndex: 1040,  // Definindo o zIndex para o overlay
        }}
      >
        <FormProduto />  {/* Seu formulário dentro do modal */}
      </Popup>
    </>
  );
}

export default ModalProduto;
