import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext } from "react";

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriasProps) {
  const { usuario } = useContext(AuthContext);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-80 mx-auto border-4 border-green-700 flex flex-col">
  {/* Imagem da Categoria */}
  <div className="relative p-4">
    {categoria.foto ? (
      <img
        src={categoria.foto}
        alt={categoria.nome}
        className="w-full h-48 object-cover rounded-lg"
      />
    ) : (
      <div className="w-full h-48 flex items-center justify-center rounded-lg">
        <span className="text-gray-700 text-sm font-medium">Sem imagem</span>
      </div>
    )}
  </div>

  {/* Nome da Categoria */}
  <div className="p-4 flex-grow">
    <h3 className="text-xl font-semibold text-verde-1 mb-2 text-center">
      {categoria.nome}
    </h3>
  </div>

  {/* Botões de Ação (Editar/Excluir) */}
  {usuario?.token && (
    <div className="flex gap-2 p-4">
      <Link
        to={`/editarcategoria/${categoria.id}`}
        className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-center py-2 rounded-lg"
      >
        Editar
      </Link>
      <Link
        to={`/deletarcategoria/${categoria.id}`}
        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg"
      >
        Excluir
      </Link>
    </div>
  )}
</div>
  );
}

export default CardCategoria;
