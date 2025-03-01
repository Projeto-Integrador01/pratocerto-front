import { createContext, ReactNode, useState } from "react";
import RestauranteLogin from "../models/RestauranteLogin";
import { ToastAlerta } from "../utils/ToastAlerta";
import { login } from "../services/Service";
import Restaurante from "../models/Restaurante";

interface AuthContextProps{
    usuario: RestauranteLogin
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
        token: "", 
        produto: null
    })

    
      
    const [isLoading, setIsLoading] = useState(false)

    async function handleLogin(restauranteLogin: RestauranteLogin) {
        setIsLoading(true);
        try {
            await login('/restaurantes/logar', restauranteLogin, setUsuario); // Aqui você vai preencher o 'usuario' com os dados do restaurante
            ToastAlerta("Usuário foi autenticado com sucesso!", "sucesso");
        } catch (error) {
            ToastAlerta("Os dados do Usuário estão inconsistentes", "erro");
        }
        setIsLoading(false);
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
        <AuthContext.Provider value={{ usuario,  handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}