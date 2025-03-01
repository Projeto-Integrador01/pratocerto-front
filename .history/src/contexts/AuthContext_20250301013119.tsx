import { createContext, ReactNode, SetStateAction, useState } from "react";
import RestauranteLogin from "../models/RestauranteLogin";
import { ToastAlerta } from "../utils/ToastAlerta";
import { login } from "../services/Service";
import Restaurante from "../models/Restaurante";

interface AuthContextProps{
    usuario: RestauranteLogin
    restaurante: Restaurante
    handleLogout(): void
    handleLogin(usuario: RestauranteLogin): Promise<void>
    isLoading: boolean
}

interface AuthProviderProps{
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps)

export function AuthProvider({ children }: AuthProviderProps) {
    
    const [usuario, setUsuario] = useState<RestauranteLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        endereco: "",
        token: ""
    })

    const [restaurante, setRestaurante] = useState<Restaurante>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        endereco: "",
        produto: null
      });
      
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin (restauranteLogin: RestauranteLogin){
        setIsLoading(true)
        try {
            await login('/restaurantes/logar', restauranteLogin, (resposta: RestauranteLogin) => {
                console.log("Resposta do backend:", resposta) // 🔍 Verifique o que está vindo
                setUsuario(resposta)
                setRestaurante({
                    id: resposta.id,  // Pegamos o id do usuário logado
                    nome: resposta.nome,
                    usuario: resposta.usuario,
                    senha: resposta.senha,
                    foto: resposta.foto,
                    endereco: resposta.endereco,
                    produto: null
                })
            })
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso")
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes", "erro")
        }
        setIsLoading(false)
    }
    
    

    function handleLogout(){
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            endereco: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, restaurante ,  handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}