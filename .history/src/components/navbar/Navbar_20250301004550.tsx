import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"



function Navbar() {

    const {usuario, restaurante} = useContext(AuthContext)
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-yellow-500 text-black'>
            
                <div className="container flex justify-between text-lg">
                    Prato Certo

                    
                    <div className='flex gap-4'>
                        Categorias
                        <Link to='/produtos' className=''>Produtos</Link>
                        { restaurante.id === usuario.id &&
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