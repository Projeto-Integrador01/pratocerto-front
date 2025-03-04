import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import FormProduto from "../formprodutos/FormProduto";
import Produto from "../../../models/Produtos";

interface CardProdutosProps {
  produto: Produto;
}

function CardProdutos({ produto }: CardProdutosProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<"editar" | "excluir" | null>(null);

  const abrirPopup = (tipo: "editar" | "excluir") => {
    setPopupType(tipo);
    setIsPopupOpen(true);
  };

  const fecharPopup = () => {
    setIsPopupOpen(false);
    setPopupType(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80 mx-auto border-4 border-green-700 flex flex-col">
      {/* Imagem do Produto */}
      <div className="relative p-4">
        <img
          src={produto.foto}
          alt={produto.nome}
          className="w-full h-48 object-cover rounded-lg border-2 border-gray-400"
        />
      </div>

      {/* Preço e Categoria */}
      <div className="flex justify-between items-center p-4">
        <p className="text-green-600 font-bold">R$ {produto.preco.toFixed(2)}</p>
        <div className="text-sm text-gray-500">
          {produto.categoria?.nome || "Sem categoria"}
        </div>
      </div>

      {/* Nome e Descrição do Produto */}
      <div className="p-4 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{produto.nome}</h3>
        <p className="text-gray-600 text-sm">{produto.descricao}</p>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-2 p-4">
        <button
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2 rounded-lg"
          onClick={() => abrirPopup("editar")}
        >
          Editar
        </button>
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg"
          onClick={() => abrirPopup("excluir")}
        >
          Excluir
        </button>
      </div>

      {/* Popup para editar e excluir */}
      <Popup
        open={isPopupOpen}
        onClose={fecharPopup}
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
        <div className="flex flex-col items-center">
          {popupType === "editar" && (
            <>
              <h2 className="text-xl font-bold mb-4">Editar Produto</h2>
              {/* Passando o produto para o formulário de edição */}
              <FormProduto produtoParaEdicao={produto} fecharPopup={fecharPopup} />
            </>
          )}
          {popupType === "excluir" && (
            <>
              <h2 className="text-xl font-bold mb-4">Tem certeza que deseja excluir?</h2>
              <p className="text-gray-600 mb-6">Essa ação não pode ser desfeita.</p>
              <div className="flex gap-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    console.log("Produto excluído:", produto.id);
                    fecharPopup();
                  }}
                >
                  Confirmar
                </button>
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                  onClick={fecharPopup}
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </Popup>
    </div>
  );
}

export default CardProdutos;
