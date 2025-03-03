/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useContext } from "react";
import { Vortex } from "react-loader-spinner";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardCategoria from "../formcategoria/FormCategoria";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AuthContext } from "../../../contexts/AuthContext";
import ModalCategoria from "../modalcategoria/ModalCategoria";

function ListaCategorias() {
  const { usuario } = useContext(AuthContext);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [reload, setReload] = useState(false); // Estado para atualizar lista

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error: any) {
      console.error("Erro ao buscar categorias", error);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [reload]);

  return (
    <div className="bg-white min-h-screen">
      {categorias.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperClass="vortex-wrapper"
            colors={[
              "#327349",
              "#F2DAAC",
              "#327349",
              "#F2DAAC",
              "#F2DAAC",
              "#327349",
            ]}
          />
        </div>
      )}

      {/* Título e Modal de Cadastro */}
      <div className="flex justify-between items-center px-8 py-4">
        <h1
          className="w-[364px] h-[74px] flex-shrink-0 text-green-800 text-center 
                     font-lexend text-[28px] font-semibold leading-none 
                     flex items-center justify-center rounded-xl"
        >
          Categorias
        </h1>

        {/* Exibir botão apenas se o usuário estiver logado */}
        {usuario.token && (
          <Popup
            trigger={
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-800">
                Cadastrar Categoria
              </button>
            }
            modal
            contentStyle={{
              background: "white",
              borderRadius: "10px",
              padding: "2px",
              width: "400px",
            }}
          >
            <ModalCategoria
              onCategoriaCadastrada={() => {
                setReload(!reload); // Atualiza a lista
              }}
            />
          </Popup>
        )}
      </div>

      {/* Lista de categorias */}
      <div className="flex justify-center w-full my-4">
        <div className="container flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaCategorias;
