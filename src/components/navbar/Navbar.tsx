function Navbar() {
    return (
        <>
            <div className='w-full flex justify-center py-4
            			   bg-bege-2 text-black'>
            
                <div className="container flex justify-between text-lg">
                    <div className= "flex items-center p-2" >
                        <img width="40px" height="40px" src="/src/assets/img/logo/logo_puro.svg" className="self-end"/>
                        <h2 className="font-bold self-end">
                            <span className=" text-black">PRATO</span>
                            <span className="text-verde-3">CERTO</span>
                        </h2>
                    </div>
                    <div className='flex gap-4 p-4'>
                        <span>Categorias</span>
                        <span>Produtos</span>
                        <span>Vegetarianos</span>
                        <span>Veganos</span>
                        <span>Restaurantes</span>
                        <span>Login</span>
                        <span>Sair</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar