import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { cadastrar } from "../../../services/Service";
import Categoria from "../../../models/Categoria";
import "reactjs-popup/dist/index.css";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ModalCategoriaProps {
  onCategoriaCadastrada?: () => void; // Prop para atualizar ListaCategorias e fechar modal
}

function ModalCategoria({ onCategoriaCadastrada }: ModalCategoriaProps) {
  const { usuario } = useContext(AuthContext);
  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    foto: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCategoria({ ...categoria, [event.target.name]: event.target.value });
  }

  async function handleSubmit() {
    setLoading(true);

    try {
      await cadastrar("/categorias", categoria, setCategoria, {
        headers: { Authorization: `${usuario.token}` },
      });
      ToastAlerta("Categoria cadastrada com sucesso.", "sucesso");
      if (onCategoriaCadastrada) {
        onCategoriaCadastrada();
      }
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      ToastAlerta("Erro ao cadastrar categoria, tente novamente.", "erro");
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center bg-[#A08A66] p-6 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold text-green-900 mb-4">Nova Categoria</h2>

      <div className="w-full mb-3">
        <label className="block text-green-900 text-lg font-semibold mb-1">
          Nome
        </label>
        <input
          type="text"
          name="nome"
          value={categoria.nome}
          onChange={handleChange}
          placeholder="Digite o nome"
          className="w-full p-2 border border-green-900 rounded-md bg-transparent text-green-900 outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <div className="w-full mb-3">
        <label className="block text-green-900 text-lg font-semibold mb-1">
          Foto
        </label>
        <input
          type="text"
          name="foto"
          value={categoria.foto}
          onChange={handleChange}
          placeholder="URL da imagem"
          className="w-full p-2 border border-green-900 rounded-md bg-transparent text-green-900 outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`bg-green-700 text-white px-6 py-2 rounded-lg mt-4 text-lg font-semibold 
        ${
          loading
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-green-800 transition"
        }`}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </button>
    </div>
  );
}

export default ModalCategoria;
