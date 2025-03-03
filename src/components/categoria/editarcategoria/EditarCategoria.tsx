/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { atualizar, buscarLogado } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function EditarCategoria() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const { id } = useParams<{ id: string }>();
  const { usuario } = useContext(AuthContext); // Pegando o usuário logado para enviar o token

  function retornar() {
    navigate("/categoria");
  }

  async function buscarPorId(id: string) {
    try {
      await buscarLogado(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: `${usuario.token}` },
      });
    } catch (error: any) {
      ToastAlerta("Erro ao buscar a Categoria.", "erro");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function editarCategoria() {
    setIsLoading(true);

    try {
      await atualizar(`/categorias`, categoria, setCategoria, {
        headers: { Authorization: `${usuario.token}` },
      });
      ToastAlerta("Categoria editada com sucesso", "sucesso");
    } catch (error: any) {
      ToastAlerta("Erro ao editar a categoria.", "erro");
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Editar Categoria</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja editar a categoria a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Categoria
        </header>
        <div className="p-4">
          {/* Input para Nome da Categoria */}
          <input
            type="text"
            value={categoria.nome}
            onChange={(e) =>
              setCategoria({ ...categoria, nome: e.target.value })
            }
            className="text-xl h-full w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Digite o nome da categoria"
          />

          {/* Input para Foto da Categoria */}
          <input
            type="text"
            value={categoria.foto}
            onChange={(e) =>
              setCategoria({ ...categoria, foto: e.target.value })
            }
            className="text-xl h-full w-full border border-gray-300 rounded-md p-2 mt-2 outline-none focus:ring-2 focus:ring-green-700"
            placeholder="URL da imagem da categoria"
          />
        </div>

        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center"
            onClick={editarCategoria}
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
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarCategoria;
