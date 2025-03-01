import { useState, useEffect } from "react";
import { buscar } from "../../../services/Service";
import { Vortex } from "react-loader-spinner";
import Restaurante from "../../../models/Restaurante";
import CardRestaurantes from "../cardrestaurantes/CardRestaurantes";

function ListaRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);

    async function buscarRestaurantes() {
        try {
            await buscar('/restaurantes', setRestaurantes);
        } catch (error: any) {
            console.error("Erro ao buscar restaurantes", error);
        }
    }

    useEffect(() => {
        buscarRestaurantes();
    }, [restaurantes.length]);

    return (
        <>
            {restaurantes.length === 0 && (
                (<Vortex
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={['#327349',  '#F2DAAC',  '#327349', '#F2DAAC',  '#F2DAAC',  '#327349']}
                    />)
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col mx-2">
                    <div className='container mx-auto my-4 
                        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                    >
                        {restaurantes.map((restaurante) => (
                            <CardRestaurantes key={restaurante.id} restaurante={restaurante} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaRestaurantes;
