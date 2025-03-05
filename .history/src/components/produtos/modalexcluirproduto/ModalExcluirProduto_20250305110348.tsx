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
        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'
        onClick={abrirModal}  // Abre o modal ao clicar
      >
        Excluir Produto
      </button>
      <Popup
        open={isModalOpen}    // O modal abre se isModalOpen for true
        onClose={fecharModal}  // Fecha o modal quando o usuário clicar fora
        modal
      >
        <DeletarProduto fecharModal={fecharModal} />  {/* Passando a função fecharModal para DeletarProduto */}
      </Popup>
    </>
  );
}

export default ModalExcluirProduto;
