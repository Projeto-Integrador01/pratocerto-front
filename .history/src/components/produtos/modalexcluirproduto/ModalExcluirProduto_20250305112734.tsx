import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useState } from 'react';
import DeletarProduto from '../deletarproduto/DeletarProduto';  // Importando o componente DeletarProduto

function ModalExcluirProduto() {
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
          hover:bg-red-600 
          focus:outline-none 
          text-sm 
          w-full 
          py-2 
          px-4
        '
        onClick={abrirModal}  // Abre o modal ao clicar
      >
        Excluir Produto
      </button>
      <Popup
        open={isModalOpen}    // O modal abre se isModalOpen for true
        onClose={fecharModal}  // Fecha o modal quando o usuário clicar fora
        modal
        contentStyle={{
          width: "400px",  // Tamanho do conteúdo do modal
          padding: "20px",  // Padding interno para espaçar o conteúdo
          borderRadius: "10px",  // Cantos arredondados
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",  // Cor do fundo escuro do modal
        }}
      >
        <DeletarProduto fecharModal={fecharModal} />  {/* Passando a função fecharModal para DeletarProduto */}
      </Popup>
    </>
  );
}

export default ModalExcluirProduto;
