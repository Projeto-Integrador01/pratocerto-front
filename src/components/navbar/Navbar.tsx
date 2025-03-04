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
                            <span className="text-black">PRATO</span>
                            <span className="text-verde-3">CERTO</span>
                        </h2>
                    </div>

                    {/* Links do menu */}
                    <div className="flex gap-4 p-2">
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
    );
}

export default Navbar;
