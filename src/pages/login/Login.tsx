import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import RestauranteLogin from "../../models/RestauranteLogin";
import { RotatingLines } from "react-loader-spinner";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [restauranteLogin, setRestauranteLogin] = useState<RestauranteLogin>(
        {} as RestauranteLogin)

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setRestauranteLogin({
            ...restauranteLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(restauranteLogin)
    }
    return (
        <>
        {/* Container principal que cobre toda a tela */}
        <div 
                className="relative w-full h-screen flex justify-center items-center"
                style={{
                    backgroundImage: "url('/src/assets/ondaAmoebaTeste.svg')",
                    backgroundSize: "60%",  // Ajusta o tamanho da imagem para 50% do seu tamanho original
                    backgroundPosition: "45% 75%", // Centraliza a imagem
                    backgroundRepeat: "no-repeat" // Evita repetições
                  }}
            >
            <div className="w-[60vh] h-[90vh] bg-[#f2daac] rounded-[20px] border-4 border-[#327349] flex flex-col justify-between items-center p-8 z-10 shadow-lg">
                <div className="text-center">
                    <h2 className="text-verde-3 text-4xl font-semibold tracking-wide">Seja</h2>
                    <h2 className="text-verde-3 text-4xl font-semibold tracking-wider">Bem-vindo</h2>
                </div>
                <form className="flex flex-col w-full gap-6" onSubmit={login}>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="text-[#327349] font-bold text-lg">E-mail</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            className="border-3 border-[#327349] rounded-[10px] p-2 bg-bege-2"
                            value={restauranteLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className="text-[#327349] font-bold text-lg">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            className="border-3 border-[#327349] rounded-[10px] p-2 bg-bege-2"
                            value={restauranteLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex justify-center">
                    <button type='submit' className="rounded bg-verde-2 hover:bg-opacity-80 text-white w-50 py-2 font-semibold flex justify-center items-center hover:bg-verde-1 transition duration-300 cursor-pointer">
                        {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>Entrar</span>}
                    </button>
                    </div>
                </form>

                <hr className="border-[#327349] w-full mt-4" /> 

                {/* Link de cadastro */}
                <p className="text-verde-1 font-normal text-center text-2x1">
                    Ainda não possui um cadastro? <br />
                    <Link to="/cadastro" className="text-verde-1 font-bold hover:text-verde-2  hover:scale-150 transition duration-300">Clique aqui!</Link>
                </p>

                {/* Logo */}
                <div className="flex justify-between items-center">
                <Link to="/" className="hover:text-verde-1 hover:scale-105 transition duration-300"><div className="flex items-end gap-4">
                        <img
                                width="32px"
                                height="32px"
                                src="/public/background/logoPuroUva.svg"
                                className="self-end"
                                alt="Prato Certo Logo"/>
                            <div className="flex flex-col items-end space-y-0.5">
                                <h2 className="font-bold">
                                    <span className="logo font-normal text-preto">PRATO</span>
                                    <span className="logo font-bold text-verde-2">CERTO</span>
                                </h2>
                               </div>
                        </div></Link>
                     </div>
            </div>
            </div>
        </>
    );
}

export default Login;
