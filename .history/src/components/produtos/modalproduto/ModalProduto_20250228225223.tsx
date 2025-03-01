import Popup from "reactjs-popup";
import FormProduto from "../formprodutos/FormProduto";


function ModalProduto(){
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Nova Postagem
                    </button>
                }
                modal
            >
                <FormProduto />
            </Popup>
        </>
    );
}