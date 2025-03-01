import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Restaurante from "../../models/Restaurante";
import { cadastrarRestaurante } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Cadastro () {
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [confirmaSenha, setConfirmaSenha] = useState<string>("")

    const [restaurante, setRestaurante] = useState<Restaurante>({
        id: 0,
        nome: "",
        usuario: "",
        foto: "",
        senha: "",
        endereco:""
    })

    function retornar() {
        navigate('/login')
      }

    useEffect(()=>{
        if (restaurante.id !== 0){
            retornar()
        }
    },[restaurante])


    function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
        setRestaurante({...restaurante,
            [e.target.name]: e.target.value })

    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
        setConfirmaSenha(e.target.value)
    }

    async function cadastrarNovoRestaurante (e: FormEvent<HTMLFormElement>){
        e.preventDefault()

        if (confirmaSenha === restaurante.senha && restaurante.senha.length >= 8){
            setIsLoading(true)

        try {

            await cadastrarRestaurante (`/restaurantes/cadastrar`, restaurante, setRestaurante)
            ToastAlerta("Restaurante foi cadastrado com sucesso!", "sucesso")

             } catch (error: any) {
                ToastAlerta("Erro ao cadastrar dados do restaurante!", "erro")
          }

          } else{
            ToastAlerta("Os dados do Usuário estão inconsistentes!", "erro")
            setRestaurante({ ...restaurante, senha: '' })
            setConfirmaSenha('')
          }
      
          setIsLoading(false)
        }
        return (
            <>
            {console.log(restaurante)}
              <div className="grid grid-cols-1 lg:grid-cols-2 h-screen 
                    place-items-center font-bold">
                <div className="fundoCadastro hidden lg:block"></div>
                <form className='flex justify-center items-center flex-col w-2/3 gap-3' 
                  onSubmit={cadastrarNovoRestaurante}>
                  <h2 className='text-heavyorange text-5xl'>Cadastrar</h2>
                  <div className="flex flex-col w-full">
                    <label htmlFor="nome">Nome</label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Nome"
                      className="border-2 border-heavyorange rounded p-2"
                     value = {restaurante.nome}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="usuario">Usuario</label>
                    <input
                      type="text"
                      id="usuario"
                      name="usuario"
                      placeholder="Usuario"
                      className="border-2 border-heavyorange rounded p-2"
                      value = {restaurante.usuario}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="foto">Foto</label>
                    <input
                      type="text"
                      id="foto"
                      name="foto"
                      placeholder="Foto"
                      className="border-2 border-heavyorange rounded p-2"
                      value = {restaurante.foto}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="senha">Senha</label>
                    <input
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="Senha"
                      className="border-2 border-heavyorange rounded p-2"
                      value = {restaurante.senha}
                     onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="confirmarSenha">Confirmar Senha</label>
                    <input
                      type="password"
                      id="confirmarSenha"
                      name="confirmarSenha"
                      placeholder="Confirmar Senha"
                      className="border-2 border-heavyorange rounded p-2"
                      value={confirmaSenha}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                    />
                  </div>
                  <div className="flex justify-around w-full gap-8">
                    <button className='rounded text-white bg-superblack 
                          hover:bg-superblack hover:opacity-80 w-1/2 py-2' onClick={retornar}>
                      Cancelar
                    </button>
                    <button 
                        type='submit'
                        className='rounded text-white bg-darkorange 
                                   hover:bg-darkorange hover:opacity-75 w-1/2 py-2
                                   flex justify-center' 
                        >
                          {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                          /> :
                            <span>Cadastrar</span>
                          }
                      
                    </button>
                  </div>
                </form>
              </div>
            </>
          )
        }
        
        export default Cadastro