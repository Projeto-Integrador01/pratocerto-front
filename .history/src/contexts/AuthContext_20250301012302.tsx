import { createContext, ReactNode, useState } from "react";
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
            await login('/restaurantes/logar', restauranteLogin, setUsuario)
            setRestaurante({
                id: restauranteLogin.id,  // Aqui associamos o id do login ao restaurante
                nome: restauranteLogin.nome,
                usuario: restauranteLogin.usuario,
                senha: restauranteLogin.senha,
                foto: restauranteLogin.foto,
                endereco: restauranteLogin.endereco,
                produto: null
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