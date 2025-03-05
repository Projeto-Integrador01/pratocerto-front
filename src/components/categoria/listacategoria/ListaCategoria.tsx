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
        <div className="container flex flex-col items-center">
          {/* Cabeçalho com título e botão próximos */}
          <div className="flex items-center justify-between w-full px-6 mb-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Categorias</h1>
              {token && (
                <button
                  onClick={abrirCadastroCategoria}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-800"
                >
                  Nova Categoria
                </button>
              )}
            </div>
          </div>
          {/* Lista de Categorias */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-[#f4f4f4] rounded-lg shadow-lg w-full">
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
