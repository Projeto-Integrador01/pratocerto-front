import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../contexts/AuthContext';
import RestauranteLogin from '../../models/RestauranteLogin';

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<RestauranteLogin>(
        {} as RestauranteLogin
    )

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }


}

export default Login;