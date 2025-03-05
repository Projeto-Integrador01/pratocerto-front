import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta('O Restaurante foi desconectado com sucesso!', 'info');
        navigate('/');
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="w-full flex justify-center py-4 bg-bege-2 text-black">
                <div className="w-full max-w-7xl flex justify-between items-center text-lg px-4">
                    {/* Nosso Logo */}
                    <div className="flex items-center gap-2">
                        <img width="40px" height="40px" src="/src/assets/img/logo/logo_puro.svg" className="self-end" />
                        <h2 className="font-bold self-end">
                            <span className="logo font-normal text-preto">PRATO</span>
                            <span className="logo font-bold text-verde-2">CERTO</span>
                        </h2>
                    </div>

                    {/* Links do menu */}
                    <div className="flex gap-4 p-2">
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
                            <button onClick={logout} className="bg-verde-2 text-white px-4 py-0.5 rounded-md hover:bg-verde-4 transition duration-300">Sair</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {component}
        </>
    );
}

export default Navbar;
