import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Produto from "../../../models/Produtos";
import FormProduto from "../formprodutos/FormProduto";

interface CardProdutosProps {
  produto: Produto;
  fecharModal: () => void;

}

function CardProdutos({ produto, fecharModal }: CardProdutosProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

      {/* Botões de Ação (Editar/Excluir) */}
      <div className="flex gap-2 p-4">
        {/* Botão Editar */}
        <button
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2 rounded-lg"
          onClick={() => setIsEditOpen(true)}
        >
          Editar
        </button>

        {/* Botão Excluir */}
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg"
          onClick={() => setIsDeleteOpen(true)}
        >
          Excluir
        </button>
      </div>

      {/* Popup para Editar */}
      <Popup open={isEditOpen} onClose={() => setIsEditOpen(false)} modal>
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Editar Produto</h2>
          <FormProduto produto={produto} fecharModal={() => setIsEditOpen(false)} />
        </div>
      </Popup>

      {/* Popup de Confirmação para Excluir */}
      <Popup open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} modal>
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">Tem certeza que deseja excluir?</h2>
          <p className="text-gray-600 mb-4">Esta ação não pode ser desfeita.</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={() => {
                console.log("Produto excluído:", produto.id);
                setIsDeleteOpen(false);
              }}
            >
              Excluir
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default CardProdutos;
