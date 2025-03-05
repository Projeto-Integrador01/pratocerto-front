/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { buscarLogado, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarCategoria() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscarLogado(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarCategoriaPorId(id);
    }
  }, [id]);

  async function deletarCategoria(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      await deletar(`/categorias/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Categoria apagada com sucesso");

      setIsLoading(false);
      retornar();
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        alert("Erro ao deletar a categoria.");
      }
      setIsLoading(false);
    }
  }

  function retornar() {
    setTimeout(() => {
      navigate("/categorias");
    }, 500);
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
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
              value={categoria.nome}
              onChange={atualizarEstado}
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
              value={categoria.foto}
              onChange={atualizarEstado}
              placeholder="URL da imagem"
              className="w-full p-2 border border-[#2F4F2F] rounded-md bg-transparent text-[#2F4F2F] outline-none focus:ring-2 focus:ring-[#5A7D5A]"
              disabled
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={retornar}
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

export default DeletarCategoria;
