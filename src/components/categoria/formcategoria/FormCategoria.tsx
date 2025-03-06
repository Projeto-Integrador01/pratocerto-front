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

  const { usuario, handleLogout, setAtualizarDados} = useContext(AuthContext);
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

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
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
      ToastAlerta("Erro ao cadastrar ou atualizar a Categoria", "erro");
    }

    setIsLoading(false);
    setAtualizarDados(true);
  }

  

  return (
    <div 
                className="relative w-full h-screen flex justify-center items-center"
                // style={{
                //     backgroundImage: "url('/src/assets/ondaAmoebaTeste.svg')",
                //     backgroundSize: "45%",  // Ajusta o tamanho da imagem para 50% do seu tamanho original
                //     backgroundPosition: "45% 75%", // Centraliza a imagem
                //     backgroundRepeat: "no-repeat" // Evita repetições
                //   }}
            >
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-bege-2 p-6 rounded-2xl w-full max-w-md border-2 border-verde-2">
        <h2 className="text-2xl font-bold text-verde-2 text-center mb-4">
          {id !== undefined ? "Editar Categoria" : "Cadastrar Categoria"}
        </h2>

        <form onSubmit={gerarNovaCategoria} className="w-full">
          <div className="w-full mb-3">
            <label className="block text-verde-2 text-lg font-semibold mb-1">
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
              className="w-full p-2 border-2 border-verde-2 rounded-md bg-transparent text-[#2F4F2F] outline-none focus:ring-2 focus:ring-[#5A7D5A]"
              required
            />
          </div>

          <div className="w-full mb-3">
            <label className="block text-verde-2 text-lg font-semibold mb-1">
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
              className="w-full p-2 border-2 border-verde-2 rounded-md bg-transparent text-[#2F4F2F] outline-none focus:ring-2 focus:ring-[#5A7D5A]"
              required
            />
          </div>

          {/* Botão "Cadastrar" Centralizado */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="flex justify-center rounded text-white bg-verde-2 hover:bg-bege-2 hover:text-verde-2 hover:border-2 border-verde-2 text-center w-2/3 py-2 cursor-pointer"
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
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default FormCategoria;