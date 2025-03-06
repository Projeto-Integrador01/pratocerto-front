import { Envelope, FacebookLogo, GithubLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {

    const { usuario } = useContext(AuthContext)
    let data = new Date().getFullYear()
    const location = useLocation(); // Obtém a rota atual

         // Ocultar a Navbar nas páginas de login e cadastro
    if (location.pathname === "/login" || location.pathname === "/cadastro") {
        return null;
    }

    return (
        <>
            <div className="bg-bege-2 text-white p-4">
                <div className="container mx-auto py-8">
                    {/* Seção superior com os textos */}
                    <div className="flex justify-between items-start pb-4 text-verde-2">
                        <div className="flex flex-col">
                            <Link to="/sobre" 
                                className="text-lg hover:text-verde-1 hover:scale-105 transition-colors duration-300">
                                | Sobre nós
                            </Link>
                            <a href="https://www.canva.com/design/DAGgTFMmAPI/Imc1jJLVaxkX6CjEyjqjBQ/view?utm_content=DAGgTFMmAPI&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h039975e787" target="_blank" rel="noopener noreferrer" 
                                className="text-lg hover:text-verde-1 hover:scale-105 transition-colors duration-300">
                                | Nosso Objetivo
                            </a>
                            <a href="https://brazil.generation.org/" target="_blank" rel="noopener noreferrer" 
                                className="text-lg hover:text-verde-1 hover:scale-105 transition-colors duration-300">
                                | Agradecimentos
                            </a>
                            <a href="mailto:grupo1generation79@gmail.com" target="_blank" rel="noopener noreferrer" 
                                className="text-lg hover:text-verde-1 hover:scale-105 transition-colors duration-300">
                                | Fale Conosco
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <img
                                width="100px"
                                src="https://files.catbox.moe/afwcgx.svg"
                                alt="Generation"
                                className="self-start"
                            />
                        </div>
                    </div>

                    {/* Linha horizontal fina */}
                    <div className="border-t border-verde-2 my-4"></div>

                    {/* Rodapé com o logo do "Prato Certo" */}
                    <div className="flex justify-between items-center">
                        <Logo/>
                        <div className="flex items-center gap-4">
                            {/* <img
                                width="40px"
                                height="40px"
                                src="/src/assets/logo/logo_puro.svg"
                                className="self-start"
                                alt="Prato Certo Logo"
                            /> */}
                            <div className="flex flex-col items-start space-y-0.5">
                                {/* <h2 className="font-bold">
                                    <span className="logo font-normal text-preto">PRATO</span>
                                    <span className="logo font-bold text-verde-2">CERTO</span>
                                </h2> */}
                                {/* <span className='text-sm text-preto'>© {data} codArte</span> */}
                            </div>
                        </div>

                        {/* Logos das redes sociais */}
                        <div className="flex flex-col items-start space-y-0.5">
                            <p className="text-lg text-verde-2">Redes Sociais</p>
                            <div className="flex gap-4">
                                <a
                                    href="COLOCAR LINK"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-verde-2 hover:text-verde-3 hover:scale-110 transition-all duration-300">
                                    <LinkedinLogo size={32} weight="thin" />
                                </a>
                                <a
                                href="mailto:grupo1generation79@gmail.com"
                                className="text-verde-2 hover:text-verde-3 hover:scale-110 transition-all duration-300"
                                >
                                <Envelope size={32} weight="thin" />
                                </a>
                                <a
                                    href="https://github.com/Projeto-Integrador01"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-verde-2 hover:text-verde-3 hover:scale-110 transition-all duration-300">
                                    <GithubLogo size={32} weight="thin" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
