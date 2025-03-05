import Restaurante from "../../../models/Restaurante";

interface CardRestaurantesProps {
  restaurante: Restaurante;
}

function CardRestaurantes({ restaurante }: CardRestaurantesProps) {
  return (
    <div className="w-[260px] h-[300px] bg-white rounded-2xl border-2 border-green-700 shadow-lg flex flex-col p-3">
      <div className="w-full h-28 flex justify-center items-center">
        <img
          src={restaurante.foto}
          className="w-65 h-35 object-cover rounded-2xl border-2 border-gray-300 mt-8"
          alt="Foto fachada restaurante"
        />
      </div>

      <div className="mt-10 ml-1">
        <h4 className="text-lg font-semibold text-left">{restaurante.nome}</h4>
        <p className="text-md text-gray-500 text-left">{restaurante.endereco}</p>
      </div>
    </div>
  );
}

export default CardRestaurantes;
