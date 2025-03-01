import Restaurante from '../../../models/Restaurante'

interface CardRestaurantesProps {
    restaurante: Restaurante
}

function CardRestaurantes({ restaurante }: CardRestaurantesProps) {
    return (
        <div className='w-[454px] h-[554.15px] bg-white rounded-[15px] border-4 border-[#327349]'>
            <div>
                <div className="w-[429.37px] h-[331.33px] rounded-[15px]">
                    <img
                        src={restaurante.foto}
                        className='h-12 rounded-full'
                        alt="Foto fachada restaurante" />
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{restaurante.nome}</h4>
                    <p>{restaurante.endereco}</p>
                </div>
            </div>
        </div>
    )
}

export default CardRestaurantes