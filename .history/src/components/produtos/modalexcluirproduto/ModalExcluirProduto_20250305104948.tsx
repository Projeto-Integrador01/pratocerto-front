import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './ModalPostagem.css';
import { useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
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
                className="border px-4 py-2 bg-green-900 text-white hover:bg-green-700"
                onClick={abrirModal}
            >
                Excluir Produto
            </button>
            <Popup
                open={isModalOpen}    // O modal abre se isModalOpen for true
                onClose={fecharModal}  // Fecha o modal quando o usuário clicar fora
                modal
                contentStyle={{
                    width: "600px",
                    maxWidth: "90%",
                    height: "auto",
                    maxHeight: "80%",
                    padding: "20px",
                    backgroundColor: "#fff",
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
                <DeletarProduto fecharModal={fecharModal} />  {/* Passando a função de fechar o modal */}
            </Popup>
        </>
    );
}

export default ModalExcluirProduto;
