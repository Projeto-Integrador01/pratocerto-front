import { useContext } from "react";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {    
    
    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }
    
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-yellow-500 text-black'>
            
                <div className="container flex justify-between text-lg">
                    Prato Certo

                    <div className='flex gap-4'>
                        Categorias
                        Produtos
                        Vegetarianos
                        <Link to='/produtos' className='hover:text-heavyorange'>Veganos</Link>
                        Restaurantes
                        Login
                        Sair
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar