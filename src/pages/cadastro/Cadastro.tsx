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
        await cadastrarRestaurante("/restaurantes/cadastrar", restaurante, setRestaurante);
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
    <div className=" overflow-hidden grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Primeira coluna (formulário de cadastro) */}
      <div className="bg-verde-2 p-8 flex flex-col justify-start items-center w-full">
        <div className="flex items-center mb-6 w-full">
          <Link to="/" className="text-white hover:scale-115 transition duration-300">
            <ArrowLeft size={40} />
          </Link>
          <h1 className="text-white text-3xl font-bold ml-52">Cadastro</h1>
        </div>
        
        <form className="w-full flex flex-col justify-center max-w-md space-y-4 mt-6" onSubmit={cadastrarNovoRestaurante}>
          
          {/* Campo Nome */}
          <div className="mb-4 text-left">
            <label htmlFor="nome" className="block text-white font-bold text-lg mb-1">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-full"
              value={restaurante.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Campo E-mail */}
          <div className="mb-4 text-left">
            <label htmlFor="usuario" className="block text-white font-bold text-lg mb-1">
              E-mail
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-full"
              value={restaurante.usuario}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-4 text-left">
            <label htmlFor="senha" className="block text-white font-bold text-lg mb-1">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-full"
              value={restaurante.senha}
              onChange={atualizarEstado}
              required
              minLength={8}
            />
          </div>

          {/* Campo Confirmar Senha */}
          <div className="mb-4 text-left">
            <label htmlFor="confirmarSenha" className="block text-white font-bold text-lg mb-1">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-full"
              value={confirmaSenha}
              onChange={handleConfirmarSenha}
              required
            />
          </div>

          {/* Campo Endereço */}
          <div className="mb-4 text-left">
            <label htmlFor="endereco" className="block text-white font-bold text-lg mb-1">
              Endereço
            </label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-full"
              value={restaurante.endereco}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Campo Foto */}
          <div className="mb-4 text-left">
            <label htmlFor="foto" className="block text-white font-bold text-lg mb-1">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              className="border-3 border-[#327349] rounded-[10px] p-2 bg-white h-10 w-full"
              value={restaurante.foto}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Botão de Enviar */}
          <div className="flex justify-center mt-4">
            <button type="submit" className="flex items-center justify-center bg-bege-2 text-verde-2 font-bold py-2 px-6 rounded-lg hover:bg-verde-2 hover:text-bege-2 hover:border border-bege-2 transition-all w-40 cursor-pointer" disabled={isLoading}>
              {isLoading ? <RotatingLines strokeColor="#327349" strokeWidth="5" animationDuration="0.75" width="24" visible={true} /> : "Cadastrar"}
            </button>
          </div>
        </form>
      </div>

      {/* Segunda coluna (imagem e texto) */}
      <div className="flex flex-col justify-start items-center w-full bg-white p-8 pt-12">
        <div className="flex flex-col justify-center items-center mb-6">
          <h2 className="text-[#327349] text-3xl font-bold">Opções saudáveis</h2>
          <h2 className="text-[#f2daac] text-3xl font-bold">ao seu alcance</h2>
        </div>
        <div className= "flex items-end justify-end absolute bottom-0 ml-100">
        <img src="/src/assets/img/comidasCadastro5.png" alt="Healthy Food" />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
