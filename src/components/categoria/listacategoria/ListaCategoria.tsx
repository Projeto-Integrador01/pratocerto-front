/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Vortex } from "react-loader-spinner";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardCategoria from "../formcategoria/FormCategoria";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Modalcategoria from "../modalcategoria/ModalCategoria";

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error: any) {
      console.error("Erro ao buscar categorias", error);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

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

        {/* Modal de Cadastro */}
        <Popup
          trigger={
            <button
              className="w-[220px] h-[34px] bg-green-700 text-white 
                               text-center font-lexend text-[28px] font-semibold 
                               rounded-full hover:bg-green-800 transition"
            >
              Cadastrar
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
          <Modalcategoria />
        </Popup>
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
