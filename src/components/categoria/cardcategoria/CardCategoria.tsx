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
    <div className="gap-4 m-4 bg-white border-2 border-verde-2 p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-300 min-h-[350px] flex flex-col">
  {/* Imagem da Categoria */}
  <div className="w-full h-52 rounded-lg overflow-hidden">
    {categoria.foto ? (
      <img
        src={categoria.foto}
        alt={categoria.nome}
        className="w-full h-full object-cover rounded-t-lg border-2 border-gray-300"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <span className="text-gray-500 text-sm font-medium">Sem imagem</span>
      </div>
    )}
  </div>

  {/* Nome da Categoria */}
  <div className="flex-grow">
    <h3 className="text-xl font-semibold text-verde-1 mt-4 text-center">
      {categoria.nome}
    </h3>
  </div>

  {/* Botões de Ação (Editar/Excluir) */}
  {usuario?.token && (
    <div className="flex gap-2 mt-4">
      <Link
        to={`/editarcategoria/${categoria.id}`}
        className="flex-1 bg-verde-2 text-white text-center hover:bg-bege-2 hover:text-verde-2 hover:border-2 border-verde-2 py-2 rounded-lg transition-all"
      >
        Editar
      </Link>
      <Link
        to={`/deletarcategoria/${categoria.id}`}
        className="flex-1 bg-verde-2 text-white hover:bg-bege-2 hover:text-verde-2 hover:border-2 border-verde-2 text-center py-2 rounded-lg transition-all"
      >
        Excluir
      </Link>
    </div>
  )}
</div>

  );
}

export default CardCategoria;
