import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css';
import DeletarProduto from '../deletarproduto/DeletarProduto';

function ModalExcluirProduto() {
  return (
    <Popup
      trigger={
        <button className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
          Excluir Produto
        </button>
      }
      modal
    >
      <DeletarProduto />
    </Popup>
  );
}

export default ModalExcluirProduto;
