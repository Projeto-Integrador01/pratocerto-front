import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CardPopup from "../cardpopup/CardPopup";
import Produto from "../../../models/Produtos";

interface ModalProdutoPopupProps {
  produto: Produto;
  open: boolean;
  onClose: () => void;
}

function ModalProdutoPopup({ produto, open, onClose }: ModalProdutoPopupProps) {
  return (
    <Popup
      open={open}
      onClose={onClose}
      modal
      contentStyle={{
        width: "30%", // Defina o tamanho do modal aqui
        maxWidth: "600px", // Limite a largura máxima
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        zIndex: 1050,
      }}
      overlayStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1040,
      }}
    >
      <CardPopup produto={produto} />
    </Popup>
  );
}

export default ModalProdutoPopup;
