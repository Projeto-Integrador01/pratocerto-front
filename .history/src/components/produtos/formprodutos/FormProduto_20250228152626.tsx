import { useState } from "react";

function FormProduto() {
  // Definindo o estado para os campos com valores iniciais
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [tipoAlimento, setTipoAlimento] = useState<string>(""); // Inicialmente vazio
  const [foto, setFoto] = useState<string>("");

  // Função de envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const produto = {
      nome,
      descricao,
      preco,
      tipoalimento: tipoAlimento,
      foto,
    };
    console.log(produto); // Aqui você pode fazer a chamada para a API ou qualquer outra ação
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f2daac]">
      <div className="w-full max-w-3xl bg-white rounded-lg p-8 shadow-lg">
        <div className="text-center text-[#327349] text-4xl font-semibold font-['Lexend Giga'] mb-8">
          Novo Produto
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome */}
          <div className="flex flex-col">
            <label htmlFor="nome" className="text-[#327349] text-2xl font-medium font-['Lexend Giga']">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 p-4 border-2 border-[#327349] rounded-md"
              placeholder="Digite o nome do produto"
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col">
            <label htmlFor="descricao" className="text-[#327349] text-2xl font-medium font-['Lexend Giga']">
              Descrição
            </label>
            <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="mt-2 p-4 border-2 border-[#327349] rounded-md"
              placeholder="Digite a descrição do produto"
            />
          </div>

          {/* Preço */}
          <div className="flex flex-col">
            <label htmlFor="preco" className="text-[#327349] text-2xl font-medium font-['Lexend Giga']">
              Preço
            </label>
            <input
              type="text"
              id="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="mt-2 p-4 border-2 border-[#327349] rounded-md"
              placeholder="Digite o preço do produto"
            />
          </div>

          {/* Tipo de Alimento (Vegano ou Vegetariano) */}
          <div className="flex flex-col">
            <label htmlFor="tipoalimento" className="text-[#327349] text-2xl font-medium font-['Lexend Giga']">
              Tipo de Alimento
            </label>
            <select
              id="tipoalimento"
              value={tipoAlimento}
              onChange={(e) => setTipoAlimento(e.target.value)}
              className="mt-2 p-4 border-2 border-[#327349] rounded-md"
            >
              <option value="">Selecione</option>
              <option value="Vegetariano">Vegetariano</option>
              <option value="Vegano">Vegano</option>
            </select>
          </div>

          {/* Foto */}
          <div className="flex flex-col">
            <label htmlFor="foto" className="text-[#327349] text-2xl font-medium font-['Lexend Giga']">
              Foto
            </label>
            <input
              type="text"
              id="foto"
              value={foto}
              onChange={(e) => setFoto(e.target.value)}
              className="mt-2 p-4 border-2 border-[#327349] rounded-md"
              placeholder="URL da foto"
            />
          </div>

          {/* Botão de Enviar */}
          <div className="flex justify-center">
          <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandoTema}
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormProduto;
