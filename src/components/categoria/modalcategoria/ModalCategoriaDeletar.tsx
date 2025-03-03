/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { buscarLogado, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ModalCategoriaDeletarProps {
  categoriaId: string;
  onClose: () => void;
  atualizarLista: () => void;
}

function ModalCategoriaDeletar({
  categoriaId,
  onClose,
  atualizarLista,
}: ModalCategoriaDeletarProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscarLogado(`/categorias/${categoriaId}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "erro");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (categoriaId) {
      buscarCategoriaPorId(categoriaId);
    }
  }, [categoriaId]);

  async function deletarCategoria(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await deletar(`/categorias/${categoriaId}`, {
        headers: {
          Authorization: token,
        },
      });

      ToastAlerta("Categoria apagada com sucesso", "sucesso");

      setIsLoading(false);
      onClose();
      atualizarLista();
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar a categoria.", "erro");
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden shadow-md">
      <div className="bg-[#D1B890] p-6 rounded-2xl shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-[#2F4F2F] text-center mb-4">
          Deletar Categoria
        </h2>

        <p className="text-[#2F4F2F] text-center mb-4">
          Tem certeza que deseja apagar esta categoria?
        </p>

        <form onSubmit={deletarCategoria} className="w-full">
          <div className="w-full mb-3">
            <label className="block text-[#2F4F2F] text-lg font-semibold mb-1">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={categoria.nome || ""}
              placeholder="Digite o nome"
              className="w-full p-2 border border-[#2F4F2F] rounded-md bg-transparent text-[#2F4F2F] outline-none focus:ring-2 focus:ring-[#5A7D5A]"
              disabled
            />
          </div>

          <div className="w-full mb-3">
            <label className="block text-[#2F4F2F] text-lg font-semibold mb-1">
              Foto
            </label>
            <input
              type="text"
              name="foto"
              value={categoria.foto || ""}
              placeholder="URL da imagem"
              className="w-full p-2 border border-[#2F4F2F] rounded-md bg-transparent text-[#2F4F2F] outline-none focus:ring-2 focus:ring-[#5A7D5A]"
              disabled
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-[#5A7D5A] text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-[#466046] transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className={`bg-[#B85042] text-white px-6 py-2 rounded-lg text-lg font-semibold 
              ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#92372E] transition"
              }`}
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="24"
                  visible={true}
                />
              ) : (
                "Deletar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCategoriaDeletar;
