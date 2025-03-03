import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriasProps) {
  return (
    <div className="border border-green-800 rounded-xl overflow-hidden shadow-md bg-[#D1B890] w-60 p-2 flex flex-col items-center transition duration-300 hover:shadow-xl">
      {/* Imagem */}
      <div className="w-full h-32 rounded-lg overflow-hidden">
        {categoria.foto ? (
          <img
            src={categoria.foto}
            alt="Categoria"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#A8A878]">
            <span className="text-white text-sm font-medium">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Nome da Categoria */}
      <p className="text-[#2F4F2F] text-lg font-bold text-center my-2 uppercase">
        {categoria.nome}
      </p>

      {/* Botões */}
      <div className="flex w-full">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-1/2 text-white bg-[#5A7D5A] hover:bg-[#466046] py-1 text-center text-sm font-medium rounded-bl-lg transition duration-200"
        >
          Editar
        </Link>

        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="w-1/2 text-white bg-[#B85042] hover:bg-[#92372E] py-1 text-center text-sm font-medium rounded-br-lg transition duration-200"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
