import { ReactNode, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // Obtém a rota atual
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O Restaurante foi desconectado com sucesso!', 'info');
        navigate('/');
    }

    // Ocultar a Navbar nas páginas de login e cadastro
    if (location.pathname === "/login" || location.pathname === "/cadastro") {
        return null;
    }

    return (
        <div className="w-full flex justify-center py-4 bg-bege-2 text-black">
            <div className="w-full max-w-7xl flex justify-between items-center text-lg px-4">
                {/* Nosso Logo */}
                <div className="flex items-center gap-2">
                    <img width="40px" height="40px" src="/src/assets/logo/logo_puro.svg" className="self-end" />
                    <h2 className="font-bold self-end">
                        <span className="logo font-normal text-preto">PRATO</span>
                        <span className="logo font-bold text-verde-2">CERTO</span>
                    </h2>
                </div>

                {/* Links do menu */}
                <div className="flex gap-4 p-2">
                    <Link to="/categorias" className="hover:text-verde-1 hover:scale-105 transition duration-300">
                    Categorias
                    </Link>
                    {usuario.id !== 0 ? (
                        <Link to="/produtoslogado" className="hover:text-verde-1 hover:scale-105 transition duration-300">
                        Meus Produtos
                        </Link>
                    ) : (
                        <Link to="/produtos" className="hover:text-verde-1 hover:scale-105 transition duration-300">
                        Produtos
                        </Link>
                    )}
                    <Link to="/veganos" className="hover:text-verde-1 hover:scale-105 transition duration-300">
                    Veganos
                    </Link>
                    <Link to="/vegetarianos" className="hover:text-verde-1 hover:scale-105 transition duration-300">
                    Vegetarianos
                    </Link>
                    <Link to="/restaurantes" className="hover:text-verde-1 hover:scale-105 transition duration-300">
                    Restaurantes
                    </Link>

                    {usuario.token !== "" ? (
                        <button onClick={logout} className="bg-verde-2 text-white px-4 py-0.5 rounded-md hover:bg-verde-1 transition duration-300 cursor-pointer">
                            Sair
                        </button>
                    ) : (
                        <Link to="/login">
                 <button className="bg-verde-2 text-white px-4 py-0.5 rounded-md hover:bg-verde-1 transition duration-300 cursor-pointer">
                 Login
                </button>
                </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;