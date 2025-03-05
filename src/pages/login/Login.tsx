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
            <div className="w-[60vh] h-[90vh] m-auto mt-5 bg-[#f2daac] rounded-[20px] border-8 border-[#327349] flex flex-col justify-between items-center p-8">
                <div className="text-center">
                    <h2 className="text-white text-5xl font-semibold tracking-wide">Seja</h2>
                    <h2 className="text-[#327349] text-5xl font-semibold tracking-wider">Bem-vindo</h2>
                </div>
                <form className="flex flex-col w-full gap-6" onSubmit={login}>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="text-[#327349] font-bold text-2xl">E-mail</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                            value={restauranteLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className="text-[#327349] font-bold text-1xl">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                            value={restauranteLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <button type='submit' className="rounded bg-[#327349] hover:bg-opacity-80 text-white w-auto py-2 font-semibold flex justify-center items-center">
                        {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : <span>Entrar</span>}
                    </button>
                </form>

                <hr className="border-[#327349] w-full mt-4" />

                {/* Link de cadastro */}
                <p className="text-white font-semibold text-center text-xl">
                    Ainda não possui um cadastro? <br />
                    <Link to="/cadastro" className="text-[#327349] font-bold">Clique aqui!</Link>
                </p>

                {/* Logo */}
                <img
                    src="https://ik.imagekit.io/7fyx55ocq/pratocertologin.svg?updatedAt=1740885408831"
                    className="w-[113px] h-[50px] object-cover rounded-2xl mt-4"
                />
            </div>
        </>
    );
}

export default Login;
