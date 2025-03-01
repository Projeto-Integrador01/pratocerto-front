import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import Restaurante from "../../models/Restaurante"

interface NavbarProps {
restaurante: Restaurante;
}
function Navbar() {

    const {usuario} = useContext(AuthContext)
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-yellow-500 text-black'>
            
                <div className="container flex justify-between text-lg">
                    Prato Certo

                    
                    <div className='flex gap-4'>
                        Categorias
                        <Link to='/produtos' className=''>Produtos</Link>
                        { usuario. === usuario.id &&
                        <Link to='/produtos' className=''>gustavo</Link>
                        }
                        Vegetarianos
                        Veganos
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