/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardCategoria from "../cardcategoria/CardCategoria";
import ModalCategoriaDeletar from "../modalcategoria/ModalCategoriaDeletar";
import Popup from "reactjs-popup";
import ModalCategoriaEditar from "../modalcategoria/ModalCategoriaEditar";

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { usuario } = useContext(AuthContext);
  const token = usuario?.token || "";

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    try {
      setLoading(true);
      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token || "" },
      });
    } catch (error: any) {
      console.error("Erro ao buscar categorias:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
          />
        </div>
      )}

      {!loading && (
        <div className="flex justify-center w-full my-4">
          <div className="container flex flex-col items-center">
            <div className="flex px-8 py-4 w-full justify-center items-center">
              <h1
                className="w-[364px] h-[74px] flex-shrink-0 text-green-800 text-center 
                        font-lexend text-[28px] font-semibold leading-none 
                        flex rounded-lg items-center"
              >
                Categorias
              </h1>

              {token && (
                <Popup
                  trigger={
                    <button
                      className="w-[200px] h-[40px] bg-[#5A7D5A] text-white 
                                text-center font-lexend text-[25px] font-semibold 
                                rounded-lg transition items-center"
                    >
                      Nova Categoria
                    </button>
                  }
                  modal
                  overlayStyle={{
                    background: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {(() => (
                    <ModalCategoriaEditar
                      categoriaId=""
                      onClose={() => console.log("Fechando modal")}
                      atualizarLista={buscarCategorias}
                    />
                  ))()}
                </Popup>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-[#ffffff] w-full">
              {categorias.map((categoria) => (
                <div
                  key={categoria.id}
                  className="border p-4 rounded-lg shadow-md"
                >
                  <CardCategoria categoria={categoria} />

                  {token && (
                    <div className="flex w-full mt-4">
                      <Popup
                        trigger={
                          <button className="w-1/2 text-white bg-[#5A7D5A] hover:bg-[#466046] py-1 text-center text-sm font-medium rounded-bl-lg transition duration-200">
                            Editar
                          </button>
                        }
                        modal
                        overlayStyle={{
                          background: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
                        }}
                      >
                        {(() => (
                          <ModalCategoriaEditar
                            categoriaId={categoria.id.toString()}
                            onClose={() => console.log("Fechando modal")}
                            atualizarLista={buscarCategorias}
                          />
                        ))()}
                      </Popup>

                      <Popup
                        trigger={
                          <button className="w-1/2 text-white bg-[#B85042] hover:bg-[#92372E] py-1 text-center text-sm font-medium rounded-br-lg transition duration-200">
                            Deletar
                          </button>
                        }
                        modal
                        overlayStyle={{
                          background: "rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        {(() => (
                          <ModalCategoriaDeletar
                            categoriaId={categoria.id.toString()}
                            onClose={() => console.log("Fechando modal")}
                            atualizarLista={buscarCategorias}
                          />
                        ))()}
                      </Popup>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ListaCategorias;
