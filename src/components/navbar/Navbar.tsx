import { Link } from "react-router-dom"

function Navbar() {
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
                        Veganos
                        <Link to='/restaurantes' className='hover:underline'>Restaurantes</Link>
                        Login
                        Sair
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar