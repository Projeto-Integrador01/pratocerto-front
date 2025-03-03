import Popup from "reactjs-popup";


import "reactjs-popup/dist/index.css";
import "./ModalPostagem.css";
import FormCategoria from "../formcategoria/FormCategoria";


function ModalCategoria() {
  return (
    <>
      <Popup
        trigger={
          <button className="border rounded px-4 py-2 hover:bg-white hover:text-indigo-800">
            Nova categoria
          </button>
        }
        modal
      >
        <FormCategoria />
      </Popup>
    </>
  );
}

export default ModalCategoria;
