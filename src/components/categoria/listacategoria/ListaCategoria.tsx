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
            <div className="flex px-8 py-4 w-full justify-start items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
              {token && (
                <Popup
                  trigger={
                    <button className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition">
                      Cadastrar
                    </button>
                  }
                  modal
                  overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                >
                  {(close: () => void) => (
                    <ModalCategoriaEditar
                      categoriaId={""}
                      onClose={close}
                      atualizarLista={buscarCategorias}
                    />
                  )}
                </Popup>
              )}
            </div>

            {/* Grid de Categorias */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 bg-[#ffffff] w-full">
              {categorias.map((categoria) => (
                <div
                  key={categoria.id}
                  className="bg-white p-6 rounded-2xl shadow-lg border-4 border-green-800"
                >
                  <CardCategoria categoria={categoria} />

                  {token && (
                    <div className="flex w-full mt-4">
                      {/* Botão Editar */}
                      <Popup
                        trigger={
                          <button className="w-1/2 text-white bg-[#5A7D5A] hover:bg-[#466046] py-1 text-center text-sm font-medium rounded-bl-lg transition duration-200">
                            Editar
                          </button>
                        }
                        modal
                        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                      >
                        {(close: () => void) => (
                          <ModalCategoriaEditar
                            categoriaId={categoria.id.toString()}
                            onClose={close}
                            atualizarLista={buscarCategorias}
                          />
                        )}
                      </Popup>

                      {/* Botão Deletar */}
                      <Popup
                        trigger={
                          <button className="w-1/2 text-white bg-[#B85042] hover:bg-[#92372E] py-1 text-center text-sm font-medium rounded-br-lg transition duration-200">
                            Deletar
                          </button>
                        }
                        modal
                        overlayStyle={{ background: "rgba(0, 0, 0, 0.5)" }}
                      >
                        {(close: () => void) => (
                          <ModalCategoriaDeletar
                            categoriaId={categoria.id.toString()}
                            onClose={close}
                            atualizarLista={buscarCategorias}
                          />
                        )}
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
