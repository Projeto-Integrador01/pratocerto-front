import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscarLogado, deletar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";

function DeletarCategoria() {
    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarCategoriaPorId(id: string) {
        try {
            await buscarLogado(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarCategoriaPorId(id)
        }
    }, [id])

    async function deletarCategoria() {
        setIsLoading(true)
        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            ToastAlerta("Categoria apagada com sucesso!", "sucesso")
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            } else {
                ToastAlerta("Erro ao deletar a categoria!", "erro")
            }
        }
        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/categorias")
    }

    return (
        <div 
            className="relative w-full h-screen flex justify-center items-center"
            style={{
                backgroundImage: "url('/src/assets/ondaAmoebaTeste.svg')",
                backgroundSize: "40%",
                backgroundPosition: "50% 75%",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="container w-1/3 mx-auto min-h-screen flex justify-center items-center">
                <div className="border flex flex-col rounded-2xl overflow-hidden bg-[#F2DAAC] w-full">
                    <header className="text-center py-2 px-6 text-green-900 font-bold text-2xl">
                        Deletar Categoria
                    </header>
                    <div className="p-6 flex flex-col items-center justify-center">
                        <p className="text-center text-green-900 font-semibold mb-4 text-xl">
                            Você tem certeza de que deseja apagar a categoria a seguir?
                        </p>
                        <div className="flex gap-4 w-full justify-center">
                            <button
                                className="text-white bg-verde-2 hover:bg-bege-2 hover:text-verde-2 hover:border-2 border-verde-2 w-1/2 py-2 rounded-lg border cursor-pointer"
                                onClick={retornar}
                            >
                                Cancelar
                            </button>
                            <button
                                className="text-white bg-verde-2 hover:bg-vermelho w-1/2 py-2 rounded-lg flex justify-center items-center cursor-pointer"
                                onClick={deletarCategoria}
                            >
                                {isLoading ? (
                                    <RotatingLines
                                        strokeColor="white"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="24"
                                        visible={true}
                                    />
                                ) : (
                                    <span>Deletar</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeletarCategoria;