import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Restaurante from "../../models/Restaurante";
import { cadastrarRestaurante } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";
import { ArrowLeft } from "@phosphor-icons/react";


function Cadastro() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [restaurante, setRestaurante] = useState<Restaurante>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
    endereco: ""
  })

  function retornar() {
    navigate('/login')
  }

  useEffect(() => {
    if (restaurante.id !== 0) {
      retornar()
    }
  }, [restaurante])


  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setRestaurante({
      ...restaurante,
      [e.target.name]: e.target.value
    })

  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  async function cadastrarNovoRestaurante(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === restaurante.senha && restaurante.senha.length >= 8) {
      setIsLoading(true)

      try {

        await cadastrarRestaurante(`/restaurantes/cadastrar`, restaurante, setRestaurante)
        ToastAlerta("Restaurante foi cadastrado com sucesso!", "sucesso")

      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar dados do restaurante!", "erro")
      }

    } else {
      ToastAlerta("Os dados do restaurante estão inconsistentes!", "erro")
      setRestaurante({ ...restaurante, senha: '' })
      setConfirmaSenha('')
    }

    setIsLoading(false)
  }
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1 w-full max-w-[600px] min-h-screen place-items-center font-bold bg-[#327349] overflow-hidden px-4">
        <div className="flex items-center w-full justify-start mt-[6vh]">
          <Link to="/">
          <ArrowLeft size={65} />
          </Link>
          <h2 className="ml-45 text-white text-[4rem] font-semibold tracking-wider">
            Cadastro
          </h2>
        </div>

        <div className="w-full flex flex-col items-center">
          <form className="flex flex-col gap-3 ml-42 mt-10" onSubmit={cadastrarNovoRestaurante}>
            <div className="flex flex-col w-[35vh] text-2xl font-medium text-white">
              <label htmlFor="nome">Nome do restaurante</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder=""
                className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                value={restaurante.nome}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col w-[35vh]  text-2xl font-medium text-white">
              <label htmlFor="usuario">E-mail</label>
              <input
                type="text"
                id="usuario"
                name="usuario"
                placeholder=""
                className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                value={restaurante.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col w-[35vh] text-2xl font-medium text-white">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder=""
                className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                value={restaurante.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col w-[35vh] text-2xl font-medium text-white">
              <label htmlFor="confirmarSenha">Confirmar Senha</label>
              <input
                type="password"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder=""
                className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                value={confirmaSenha}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
              />
            </div>

            <div className="flex flex-col w-[35vh] text-2xl font-medium text-white">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                placeholder=""
                className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                value={restaurante.endereco}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex flex-col w-[35vh] text-2xl font-medium text-white">
              <label htmlFor="foto">Foto</label>
              <input
                type="text"
                id="foto"
                name="foto"
                placeholder=""
                className="border-3 border-[#327349] rounded-[10px] p-2 bg-white"
                value={restaurante.foto}
                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
              />
            </div>

            <div className="flex justify-around w-[35vh] h-[4vh] gap-8">
              <button
                type="submit"
                className="rounded bg-[#f2daac] flex justify-center hover:bg-opacity-80 text-[#327349] w-1/2 max-w-[200px] py-2 font-bold text-center"
              >
                {isLoading ? <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
                  : <span>Cadastrar</span>}
              </button>
            </div>
          </form>
                          <div className="mb-15">
                    <img
                        src="https://ik.imagekit.io/7fyx55ocq/pratocertologin.svg?updatedAt=1740885408831"
                        className="w-[113px] h-[50px] object-cover rounded-2xl mt-7"
                    />
                </div>
        </div>
      </div>
    </>
  )
}

export default Cadastro