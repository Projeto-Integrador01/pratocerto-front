import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
}

function FormCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="max-w-xl mx-8 border border-gray-300 rounded-lg overflow-hidden bg-gray-100 shadow-md">
      {/* Cabeçalho com Nome da Categoria */}
      <div className="flex w-full bg-[#ff9f00] py-3 px-5 items-center gap-4">
        <h3 className="text-lg font-bold text-white uppercase">
          {categoria.nome}
        </h3>
      </div>

      {/* Foto da Categoria */}
      {categoria.foto && (
        <div className="flex justify-center p-4">
          <img
            src={categoria.foto}
            alt={categoria.nome}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Ações */}
      <div className="flex justify-end">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-1/2 bg-[#2C2C2E] text-white hover:bg-gray-500 flex items-center justify-center py-2 transition"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="w-1/2 bg-[#ff9f00] text-white hover:bg-red-400 flex items-center justify-center py-2 transition"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default FormCategoria;
