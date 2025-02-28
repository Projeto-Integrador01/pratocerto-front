import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function Modalcategoria() {
  return (
    <div className="flex flex-col items-center bg-[#A08A66] p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold text-green-900 mb-4">Nova Categoria</h2>

      {/* Input Nome */}
      <div className="w-full mb-3">
        <label className="block text-green-900 text-lg font-semibold mb-1">
          Nome
        </label>
        <input
          type="text"
          placeholder="Digite o nome"
          className="w-full p-2 border border-green-900 rounded-md bg-transparent text-green-900 outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      {/* Input Foto */}
      <div className="w-full mb-3">
        <label className="block text-green-900 text-lg font-semibold mb-1">
          Foto
        </label>
        <input
          type="text"
          placeholder="URL da imagem"
          className="w-full p-2 border border-green-900 rounded-md bg-transparent text-green-900 outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      {/* Botão Cadastrar */}
      <button className="bg-green-700 text-white px-6 py-2 rounded-lg mt-4 text-lg font-semibold hover:bg-green-800 transition">
        Cadastrar
      </button>
    </div>
  );
}

export default Modalcategoria;
