import Categoria from "../../../models/Categoria";

interface CardCategoriasProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriasProps) {
  return (
    <div className=" border-green-800 rounded-xl overflow-hidden shadow-md bg-[#ffffff]  p-2 flex flex-col items-center transition duration-300 hover:shadow-xl">
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
    </div>
  );
}

export default CardCategoria;
