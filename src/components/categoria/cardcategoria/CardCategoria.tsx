import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriasProps) {
  return (
    <div className="border-2 border-green-50 rounded-2xl overflow-hidden shadow-lg bg-white w-80 p-2 flex flex-col items-center">
      {/* Imagem */}
      <div className="w-full rounded-xl overflow-hidden">
        {categoria.foto ? (
          <img
            src={categoria.foto}
            alt="Categoria"
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Nome da Categoria */}
      <p className="text-green-700 text-xl font-semibold text-center my-4">
        {categoria.nome}
      </p>

      {/* Botões */}
      <div className="flex w-full">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-1/2 text-white bg-indigo-500 hover:bg-indigo-700 py-2 text-center rounded-bl-xl"
        >
          Editar
        </Link>

        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="w-1/2 text-white bg-red-500 hover:bg-red-700 py-2 text-center rounded-br-xl"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
