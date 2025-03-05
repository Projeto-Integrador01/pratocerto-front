import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { buscarLogado, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCategoria() {
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
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "erro");
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarCategoriaPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/categorias");
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("Categoria atualizada com sucesso", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao atualizar a Categoria", "erro");
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
        ToastAlerta("Categoria cadastrada com sucesso", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar a Categoria", "erro");
      }
    }
    setIsLoading(false);
    retornar();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden shadow-md">
      <div className="bg-[#D1B890] p-6 rounded-2xl shadow-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold text-[#2F4F2F] text-center mb-4">
          {id !== undefined ? "Editar Categoria" : "Cadastrar Categoria"}
        </h2>

        <form onSubmit={gerarNovaCategoria} className="w-full">
          <div className="w-full mb-3">
            <label className="block text-[#2F4F2F] text-lg font-semibold mb-1">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              value={categoria.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="Digite o nome"
              className="w-full p-2 border-2 border-[#2F4F2F] rounded-md bg-transparent text-[#2F4F2F] outline-none focus:ring-2 focus:ring-[#5A7D5A]"
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
              value={categoria.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              placeholder="URL da imagem"
              className="w-full p-2 border-2 border-[#2F4F2F] rounded-md bg-transparent text-[#2F4F2F] outline-none focus:ring-2 focus:ring-[#5A7D5A]"
              required
            />
          </div>

          <button
            className="rounded text-slate-100 bg-heavyorange hover:bg-green-700 w-1/2 py-2 mx-auto flex justify-center"
            type="submit"
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
              <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCategoria;
