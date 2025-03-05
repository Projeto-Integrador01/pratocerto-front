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
        ToastAlerta("O Restaurante foi desconectado com sucesso!", "info");
        navigate("/");
    }

    if (location.pathname === "/login" || location.pathname === "/cadastro") {
        return null;
    }

    return (
        <div className="w-full flex justify-center py-4 bg-yellow-500 text-black">
            <div className="container flex justify-between text-lg">
                <span className="font-bold">Prato Certo</span>

                <div className="flex gap-4">
                    <Link to="/categorias">Categorias</Link>
                    {usuario.id !== 0 ? (
                        <Link to="/produtos">Meus Produtos</Link>
                    ) : (
                        <Link to="/produtos">Produtos</Link>
                    )}
                    <Link to="/veganos">Veganos</Link>
                    <Link to="/vegetarianos">Vegetarianos</Link>
                    <Link to="/restaurantes">Restaurantes</Link>

                    {usuario.token !== "" ? (
                        <button className="bg-red-500 px-3 py-1 rounded" onClick={logout}>
                            Sair
                        </button>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
