import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Restaurante from "../../models/Restaurante";
import { cadastrarRestaurante } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { RotatingLines } from "react-loader-spinner";
import { ArrowLeft } from "@phosphor-icons/react";

function Cadastro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [restaurante, setRestaurante] = useState<Restaurante>({
    id: 0,
    nome: "",
    usuario: "",
    foto: "",
    senha: "",
    endereco: ""
  });

  function retornar() {
    navigate('/login');
  }

  useEffect(() => {
    if (restaurante.id !== 0) {
      retornar();
    }
  }, [restaurante]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setRestaurante({
      ...restaurante,
      [e.target.name]: e.target.value
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoRestaurante(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();


    if (confirmaSenha === restaurante.senha && restaurante.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarRestaurante(`/restaurantes/cadastrar`, restaurante, setRestaurante);
        ToastAlerta("Restaurante foi cadastrado com sucesso!", "sucesso");
      } catch (error: any) {
        ToastAlerta("Erro ao cadastrar dados do restaurante!", "erro");
      }
    } else {
      ToastAlerta("Os dados do restaurante estão inconsistentes!", "erro");
      setRestaurante({ ...restaurante, senha: '' });
      setConfirmaSenha('');
    }

    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 bg-[#327349] p-10 flex flex-col">
        <div className="flex justify-end items-center mb-8">
          <Link to="/" className="text-white mr-88">
            <ArrowLeft size={48} />
          </Link>
          <h1 className="text-white text-[60px] font-bold ml-4 text-right">Cadastro</h1>
        </div>


        <form className="flex-1 flex flex-col items-center justify-center text-center" onSubmit={cadastrarNovoRestaurante}>
          <div className="mb-4 text-left mt-10">
            <div className="w-80">
            <label htmlFor="nome" className="block text-white font-bold text-lg mb-1">
              Nome do restaurante
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-80"
              value={restaurante.nome}
              onChange={atualizarEstado}
              required
            />
            </div>
            <div className="ml-89 w-80">
            <label htmlFor="usuario" className="block text-white font-bold text-lg mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-80"
              value={restaurante.usuario}
              onChange={atualizarEstado}
              required
            />
            </div>
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="senha" className="block text-white font-bold text-lg mb-1">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-80"
              value={restaurante.senha}
              onChange={atualizarEstado}
              required
              minLength={8}
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="confirmarSenha" className="block text-white font-bold text-lg mb-1">
              Confirme sua senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-80"
              value={confirmaSenha}
              onChange={handleConfirmarSenha}
              required
              minLength={8}
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="endereco" className="block text-white font-bold text-lg mb-1">
              Endereço
            </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-80"
              value={restaurante.endereco}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="mb-4 text-left">
            <label htmlFor="foto" className="block text-white font-bold text-lg mb-1">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-80"
              value={restaurante.foto}
              onChange={atualizarEstado}
              placeholder="URL da imagem"
            />
          </div>

          <div className="mt-auto flex justify-center">
            <button
              type="submit"
              className="bg-[#f2daac] text-[#327349] font-bold py-2 px-8 rounded-lg hover:bg-opacity-90 transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <RotatingLines strokeColor="#327349" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
              ) : (
                "Cadastrar"
              )}
            </button>
          </div>

          <div className="mt-6 flex justify-center">
            <img
              src="https://ik.imagekit.io/7fyx55ocq/pratocertologin.svg?updatedAt=1740885408831"
              alt="Prato Certo Logo"
              className="h-12"
            />
          </div>
        </form>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-white flex-col p-8">
        <div className="max-w-md text-center">

        </div>
      </div>
      <div className="mt-4 flex ml-auto justify-start items-start ">
        <img
          src="https://ik.imagekit.io/7fyx55ocq/formaCadastroAlimentos.png?updatedAt=1741012373296"
          alt="Healthy Food"
          className="rounded-lg mx-auto"
        />
      </div>
    </div>
  );
}

export default Cadastro;

