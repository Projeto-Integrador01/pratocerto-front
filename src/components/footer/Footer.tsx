import { FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { Envelope } from '@phosphor-icons/react/dist/ssr'

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="bg-verde-1 text-white p-4">
        <div className="container mx-auto py-8">
        {/* Seção superior com os textos */}
        <div className="flex justify-between items-start pb-4 text-bege-2">
            <div className="flex flex-col">
                <p className="text-lg">| Sobre nós</p>
                <p className="text-lg">| Nosso Objetivo</p>
                <p className="text-lg">| Agradecimentos</p>
                <p className="text-lg">| Fale Conosco</p>
            </div>
            <div className="flex items-center gap-4">
                <img
                    width="100px"
                    src="/src/assets/img/logo/logo_gen.svg"
                    alt="Generation"
                    className="self-start"
                />
            </div>
        </div>

        {/* Linha horizontal fina */}
        <div className="border-t border-bege-2 my-4"></div>

        {/* Rodapé com o logo do "Prato Certo" */}
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img
                    width="40px"
                    height="40px"
                    src="/src/assets/img/logo/logo_puro_claro.svg" className="self-start"
                    alt="Prato Certo Logo"
                />
                <div className="flex flex-col items-start space-y-0,5">
                <h2 className="font-bold">
                    <span className="text-white">PRATO</span>
                    <span className="text-bege-2">CERTO</span> 
                </h2>
                <span className='text-sm text-white'>© 2025 codArte</span>
            </div>
        </div>
            {/* Logos das redes sociais */}
            <div className="flex flex-col items-start space-y-0,5">
                <p className="text-lg text-bege-2">Redes Sociais</p>
            <div className="flex gap-4">
                <Envelope size={32} weight="thin" className='text-bege-2' />
                <InstagramLogo size={32} weight="thin" className='text-bege-2'/>
                <GithubLogo size={32} weight="thin" className='text-bege-2'/>
            </div>
            </div>
        </div>
    </div>
</div>

        </>
    )
}

export default Footer