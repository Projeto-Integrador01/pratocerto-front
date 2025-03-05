import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { buscarLogado, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

interface ModalCategoriaEditarProps {
  categoriaId: string;
  onClose: () => void;
  atualizarLista: () => void;
}

function ModalCategoriaEditar({
  categoriaId,
  onClose,
  atualizarLista,
}: ModalCategoriaEditarProps) {
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

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (categoriaId) {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("Categoria atualizada com sucesso", "sucesso");
      } else {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("Categoria cadastrada com sucesso", "sucesso");
      }
    } catch (error: any) {
      ToastAlerta("Erro ao processar a Categoria", "erro");
    }

    setIsLoading(false);
    onClose();
    atualizarLista();
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden shadow-md" onClick={onClose}>
      <div
        className="bg-[#D1B890] p-6 rounded-2xl shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar dentro do modal
      >
        <h2 className="text-2xl font-bold text-[#2F4F2F] text-center mb-4">
          {categoriaId ? "Editar Categoria" : "Cadastrar Categoria"}
        </h2>

        <form onSubmit={gerarNovaCategoria} className="w-full">
          <div className="w-full mb-3">
            <label className="block text-[#2F4F2F] text-lg font-semibold mb-1">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={categoria.nome || ""}
              onChange={atualizarEstado}
              placeholder="Digite o nome"
              className="w-full p-2 border border-[#2F4F2F] rounded-md bg-transparent text-[#2F4F2F] outline-none focus:ring-2 focus:ring-[#5A7D5A]"
              required
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
              onChange={atualizarEstado}
              placeholder="URL da imagem"
              className="w-full p-2 border border-[#2F4F2F] rounded-md bg-transparent text-[#2F4F2F] outline-none focus:ring-2 focus:ring-[#5A7D5A]"
              required
            />
          </div>

          {/* Botão "Atualizar" verde e centralizado */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-[#5A7D5A] text-white px-6 py-2 rounded-lg text-lg font-semibold ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#466046] transition"
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
                <span>{categoriaId ? "Atualizar" : "Cadastrar"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCategoriaEditar;
