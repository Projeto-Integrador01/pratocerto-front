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

      setIsLoading(false); // Para garantir que o loader pare antes do redirecionamento
      retornar(); // Agora só redireciona após o alerta ser exibido
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
    }, 500); // Espera 500ms antes de redirecionar para garantir que o alerta apareça
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  //   return (
  //     <div className="container flex flex-col mx-auto items-center">
  //       <h1 className="text-4xl text-center my-8">Deletar Categoria</h1>

  //       <p className="text-center font-semibold mb-4">
  //         Você tem certeza de que deseja apagar a categoria a seguir?
  //       </p>

  //       <form className="flex flex-col w-1/2 gap-4" onSubmit={deletarCategoria}>
  //         <div className="flex flex-col gap-2">
  //           <label htmlFor="nome">Nome da Categoria</label>
  //           <input
  //             type="text"
  //             placeholder="Nome"
  //             name="nome"
  //             required
  //             className="border-2 border-slate-700 rounded p-2"
  //             value={categoria.nome}
  //             onChange={atualizarEstado}
  //           />
  //         </div>
  //         <div className="flex flex-col gap-2">
  //           <label htmlFor="foto">URL da Foto</label>
  //           <input
  //             type="text"
  //             placeholder="Foto"
  //             name="foto"
  //             className="border-2 border-slate-700 rounded p-2"
  //             value={categoria.foto}
  //             onChange={atualizarEstado}
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           className="rounded bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
  //         >
  //           {isLoading ? (
  //             <RotatingLines
  //               strokeColor="white"
  //               strokeWidth="5"
  //               animationDuration="0.75"
  //               width="24"
  //               visible={true}
  //             />
  //           ) : (
  //             <span>Deletar</span>
  //           )}
  //         </button>
  //       </form>
  //     </div>
  //   );
  // }

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
          onChange={atualizarEstado}
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
          onChange={atualizarEstado}
          placeholder="URL da imagem"
          className="w-full p-2 border border-green-900 rounded-md bg-transparent text-green-900 outline-none focus:ring-2 focus:ring-green-700"
        />
      </div>

      <button
        onClick={deletarCategoria}
        disabled={isLoading}
        className={`bg-green-700 text-white px-6 py-2 rounded-lg mt-4 text-lg font-semibold 
      ${
        isLoading
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-green-800 transition"
      }`}
      >
        {isLoading ? "Deletando..." : "Deletar"}
      </button>
    </div>
  );
}

export default DeletarCategoria;
