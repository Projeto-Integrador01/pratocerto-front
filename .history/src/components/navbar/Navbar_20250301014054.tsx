import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
    const { usuario } = useContext(AuthContext);

    return (
        <div className="w-full flex justify-center py-4 bg-yellow-500 text-black">
            <div className="container flex justify-between text-lg">
                <span className="font-bold">Prato Certo</span>

                <div className="flex gap-4">
                    <span>Categorias</span>

                    {usuario.id !== 0 && (
                        <Link to="/listarprodutoslogado">Produto Logado</Link>
                    )}
                    {usuario.id === 0 && <Link to="/listarprodutos">Produto normal</Link>}

                    <span>Vegetarianos</span>
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
    );
}

export default Navbar;