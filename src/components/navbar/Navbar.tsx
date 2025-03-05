import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);

    function logout(){

        handleLogout()
        ToastAlerta('O Restaurante foi desconectado com sucesso!', 'info')
        navigate('/')
    }

    let component: ReactNode

    if (usuario.token !== "") {

        component = (
            <div className="w-full flex justify-center py-4 bg-yellow-500 text-black">
            <div className="container flex justify-between text-lg">
                <span className="font-bold">Prato Certo</span>

                <div className="flex gap-4">
                    <span>Categorias</span>

                    {usuario.id !== 0 && (
                        <Link to="/listarprodutoslogado">Produto Logado</Link>
                    )}
                    {usuario.id === 0 && <Link to="/listarprodutos">Produto normal</Link>}

                    <Link to="/veganos">Veganos</Link>
                    <span>Veganos</span>
                    <span>Restaurantes</span>

                    {usuario.id === 0 ? (
                        <Link to="/login">Login</Link>
                    ) : (
                        <button className="bg-red-500 px-3 py-1 rounded">Sair</button>
                    )}
                </div>
            </div>
        </div>
        )
    }

    return (

        <>
        {component}
        
        </>
    )
}

export default Navbar;