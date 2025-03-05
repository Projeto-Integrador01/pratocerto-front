import { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import FormProduto from '../formprodutos/FormProduto';

function ModalEditarProduto({ produtoId }: { produtoId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const abrirModal = () => {
    setIsModalOpen(true);  // Abre o modal
  };

  const fecharModal = () => {
    setIsModalOpen(false);  // Fecha o modal
  };

  return (
    <>
      <button
        className='
          border-none rounded 
          text-white 
          bg-blue-500 hover:bg-blue-600 
          focus:outline-none 
          text-sm 
          w-full 
          mt-auto 
          py-2 
          px-4
        '
        onClick={abrirModal}  // Abre o modal ao clicar
      >
        Editar Produto
      </button>

      <Popup
        open={isModalOpen}    // O modal abre se isModalOpen for true
        onClose={fecharModal}  // Fecha o modal quando o usuário clicar fora
        modal
        contentStyle={{
          width: "500px",  // Aumentando a largura do conteúdo
          padding: "30px",  // Aumentando o padding interno
          borderRadius: "12px",  // Tornando os cantos mais arredondados
          backgroundColor: "#fff",  // Cor de fundo do modal
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",  // Sombra para um visual mais suave
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",  // Cor do fundo escuro do modal
        }}
      >
        {/* Passando o ID do produto para o DeletarProduto */}
        <FormProduto />
      </Popup>
    </>
  );
}

export default ModalEditarProduto;
