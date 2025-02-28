function Home() {
    return (
        <>
            <div className="w-screen flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 gap-8 p-8">
                    <div className="max-w-7xl col-start-1 col-span-2 row-span-3">
                        <h1 className="text-4xl">PratoCerto!</h1>
                        <h2 className="text-3xl text-verde-1">Encontrar opções saudáveis nunca foi tão fácil</h2>
                        <p className="text-2xl ">Facilitamos a busca por opções saudáveis. Encontre alimentos 
                            nutritivos, informações confiáveis sobre bem-estar e 
                            recursos para um lifestyle equilibrado, tudo em um só lugar.</p>
                    </div>

                    <div className="col-start-3 col-span-2 row-span-3">
                        <img
                            src="/src/assets/img/background/fundo_home.png"
                            alt="Imagem da Página Home"
                            width="400px"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home