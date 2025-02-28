import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produtos";
import { Link } from "react-router-dom";

interface CardVeganoProps {
    produto: Produto
}

function CardVegano({produto}: CardVeganoProps){

    const {usuario} = useContext(AuthContext);

    return(
        <div className="w-[422px] h-[530px] bg-white rounded-[15px] border-4 border-[#327349]">

            <div>
                <div className="py-2 px-6 bg-darkorange text-white font-bold text-2xl">
                    <h3 className='text-lg font-bold text-center uppercase'> 
                        Nome do Prato: {produto.restaurante?.nome}
                       <p>Classificação: {produto.tipoalimento.includes("vegano")}</p>
                    </h3>
                </div>
            </div>

            {
                produto.restaurante?.id === usuario.id &&
                (
                    <div className="flex">
                        <Link to={`/editarproduto/${produto.id}`}
                            className='w-full text-slate-100 bg-heavyorange hover:bg-green-700
                            flex items-center justify-center py-2'>
                            <button>editar</button>
                        </Link>
                        <Link to={`/deletarproduto/${produto.id}`}
                            className='text-slate-100 bg-heavyorange hover:bg-red-700 w-full 
                            flex items-center justify-center'>
                            <button>deletar</button>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}

export default CardVegano