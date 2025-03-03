/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardCategoria from "../cardcategoria/CardCategoria";

function ListaCategorias() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: token ? { Authorization: token } : {},
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  function abrirCadastroCategoria() {
    navigate("/cadastrarcategoria"); // Redireciona para a rota do formulário
  }

  return (
    <>
      {categorias.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="flex justify-around gap-4">
            {token && (
              <button
                onClick={abrirCadastroCategoria}
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-800"
              >
                Nova Categoria
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaCategorias;
