import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormProduto from "../formprodutos/FormProduto";

function ModalEditarProduto({ produtoId }: { produtoId: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const abrirModal = () => setIsModalOpen(true);
    const fecharModal = () => setIsModalOpen(false);

    return (
        <>
            <button
                className="border-none rounded text-white focus:outline-none text-sm w-full mt-auto py-2 px-4"
                onClick={abrirModal}
            >
                Editar Produto
            </button>

            <Popup
                open={isModalOpen}
                onClose={fecharModal}
                modal
                contentStyle={{
                    width: "500px",
                    padding: "30px",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
                overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                {produtoId ? <FormProduto produtoId={produtoId} /> : <p>Carregando...</p>}
            </Popup>
        </>
    );
}

export default ModalEditarProduto;
