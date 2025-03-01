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

    async function handleLogin(restauranteLogin: RestauranteLogin) {
        setIsLoading(true);
        try {
            const response = await login('/restaurantes/logar', restauranteLogin, setUsuario);
    
            // Atualize o estado do restaurante após o login com a resposta que inclui os dados do restaurante
            setRestaurante({
                ...response.restaurante,  // Supondo que 'response.restaurante' seja a resposta com os dados do restaurante
                produto: response.restaurante.produto || null  // Caso tenha um produto
            });
    
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
        <AuthContext.Provider value={{ usuario, restaurante ,  handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}