/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import {
  buscar,
  atualizar,
  cadastrar,
  buscarLogado,
} from "../../../services/Service";
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
    <div className="container flex flex-col mx-auto items-center">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Categoria" : "Cadastrar Categoria"}
      </h1>
      <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Nome da Categoria</label>
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">URL da Foto</label>
          <input
            type="text"
            placeholder="Foto"
            name="foto"
            required
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
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
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;
