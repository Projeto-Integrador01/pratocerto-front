import { useState, useEffect } from "react";
import { buscar } from "../../../services/Service";
import { Vortex } from "react-loader-spinner";
import Restaurante from "../../../models/Restaurante";
import CardRestaurantes from "../cardrestaurantes/CardRestaurantes";
import './ListaRestaurantes.css'

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
        <div 
        className="w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: "url('/public/background/ondaLesma2.svg')",
            backgroundSize: "cover",  // Faz o fundo cobrir toda a tela
            backgroundPosition: "center", // Centraliza a imagem
        }}
    >
        {restaurantes.length === 0 && (
            <div className="flex justify-center items-center h-screen">
                <Vortex
                    visible={true}
                    height="120"
                    width="120"
                    ariaLabel="vortex-loading"
                    wrapperClass="vortex-wrapper"
                    colors={['#327349', '#F2DAAC', '#327349', '#F2DAAC', '#F2DAAC', '#327349']}
                />
            </div>
        )}
        
        <div className="w-full max-w-7xl my-4 mt-10 mb-16 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {restaurantes.map((restaurante) => (
                    <CardRestaurantes key={restaurante.id} restaurante={restaurante} />
                ))}
            </div>
        </div>
    </div>

    );
}

export default ListaRestaurantes;
