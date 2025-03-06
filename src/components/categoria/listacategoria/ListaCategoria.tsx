import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import CardCategoria from "../cardcategoria/CardCategoria";
import ModalCategoria from "../modalcategoria/ModalCategoria"; // Importando o Modal

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, [categorias.length]);

  return (
    <>
    <div 
        // className="w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat"
        // style={{
        //     backgroundImage: "url('/public/background/ondaViolao.svg')",
        //     backgroundSize: "cover",  // Faz o fundo cobrir toda a tela
        //     backgroundPosition: "bottom", // Centraliza a imagem
        // }}
    >
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
          {/* Cabeçalho com título e botão de abrir o modal */}
          <div className="flex items-center justify-between w-full px-6 mb-4">
            <div className="flex items-center">
              <h1 className="text-2xl">Categorias</h1>
              {token && <ModalCategoria />} {/* Substitui o botão pelo modal */}
            </div>
          </div>
          {/* Lista de Categorias */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-12 rounded-lg w-full">
            {categorias.map((categoria) => (
              <CardCategoria key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default ListaCategorias;