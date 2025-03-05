function Navbar() {
    return (
        <>
            <div className="w-full flex justify-center py-4 bg-bege-2 text-black">
                {/* Defini a largura máxima e centralização para a div */}
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
                        <span>Produtos</span>
                        <span>Vegetarianos</span>
                        <span>Veganos</span>
                        <span>Restaurantes</span>
                        <button  className="bg-verde-2 text-white px-4 py-0.5 rounded-md hover:bg-verde-4 transition duration-300">Login</button>
                        <button  className="bg-verde-2 text-white px-4 py-0.5 rounded-md hover:bg-verde-4 transition duration-300">Sair</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
