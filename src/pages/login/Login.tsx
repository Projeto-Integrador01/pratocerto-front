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
            <div className="ml-[730px] mt-[33px] w-[450px] h-[770px] bg-[#f2daac] rounded-[20px] border-8 border-[#327349] flex flex-col justify-center items-center p-2">

                <form className="flex justify-center items-center flex-col w-auto gap-12 flex-grow" onSubmit={login}>
                    <div className="w-[320px] h-[150px] text-center mt-15">
                        <h2 className="text-white text-[50px] font-semibold tracking-wide">Seja<br /></h2>
                        <h2 className="text-[#327349] text-[50px] font-semibold tracking-wider">Bem-vindo</h2>
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="text-[#327349] font-bold text-2xl">E-mail</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder=""
                            className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                            value={restauranteLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col w-full gap">
                        <label htmlFor="senha" className="text-[#327349] font-bold text-2xl">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder=""
                            className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                            value={restauranteLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <button type='submit' className="rounded bg-[#327349] flex justify-center hover:bg-opacity-80 text-white w-1/2 py-2 font-semibold">
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> : <span>Entrar</span>}
                    </button>

                    <hr className="border-[#327349] w-full" />

                    <p className="text-white font-semibold text-center text-2xl">
                        Ainda não possui uma conta?{' '}
                        <Link to="/cadastro" className="text-[#327349] text-center">
                            <br />Clique aqui!
                        </Link>
                    </p>
                    
                </form>

                <div className="mb-15">
                    <img
                        src="https://ik.imagekit.io/7fyx55ocq/pratocertologin.svg?updatedAt=1740885408831"
                        className="w-[113px] h-[50px] object-cover rounded-2xl mt-8"
                    />
                </div>

                <div className="fundoLogin hidden lg:block"></div>
                
            </div>
        </>
    );
}

export default Login;
