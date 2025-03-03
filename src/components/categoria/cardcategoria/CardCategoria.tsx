import { Link } from "react-router-dom";
import Categoria from "../../../models/Categoria";

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriasProps) {
  return (
    <div className="border-2 border-green-800 rounded-2xl overflow-hidden shadow-md bg-[#D1B890] w-80 p-3 flex flex-col items-center transition duration-300 hover:shadow-xl">
      {/* Imagem */}
      <div className="w-full rounded-xl overflow-hidden">
        {categoria.foto ? (
          <img
            src={categoria.foto}
            alt="Categoria"
            className="w-full h-48 object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-[#A8A878]">
            <span className="text-white text-lg font-medium">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Nome da Categoria */}
      <p className="text-[#2F4F2F] text-xl font-bold text-center my-4 uppercase">
        {categoria.nome}
      </p>

      {/* Botões */}
      <div className="flex w-full">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="w-1/2 text-white bg-[#5A7D5A] hover:bg-[#466046] py-2 text-center font-medium rounded-bl-xl transition duration-200"
        >
          Editar
        </Link>

        <Link
          to={`/deletarcategoria/${categoria.id}`}
          className="w-1/2 text-white bg-[#B85042] hover:bg-[#92372E] py-2 text-center font-medium rounded-br-xl transition duration-200"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
