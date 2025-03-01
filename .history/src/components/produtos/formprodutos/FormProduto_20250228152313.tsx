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
    <div className="w-[1229px] h-[1453px] relative">
      <div className="w-full h-full absolute bg-[#f2daac] rounded-[25px]"></div>

      <div className="absolute left-[210px] top-[77px] text-center text-[#327349] text-[78px] font-semibold font-['Lexend Giga']">
        Novo Produto
      </div>

      <form
        onSubmit={handleSubmit}
        className="absolute left-[176px] top-[318px] w-[933px] bg-[#f2daac] rounded-[15px] border-4 border-[#327349] p-6"
      >
        {/* Nome */}
        <div className="flex flex-col mb-6">
          <label htmlFor="nome" className="text-[#327349] text-4xl font-medium font-['Lexend Giga']">
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
        <div className="flex flex-col mb-6">
          <label htmlFor="descricao" className="text-[#327349] text-4xl font-medium font-['Lexend Giga']">
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
        <div className="flex flex-col mb-6">
          <label htmlFor="preco" className="text-[#327349] text-4xl font-medium font-['Lexend Giga']">
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
        <div className="flex flex-col mb-6">
          <label htmlFor="tipoalimento" className="text-[#327349] text-4xl font-medium font-['Lexend Giga']">
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
        <div className="flex flex-col mb-6">
          <label htmlFor="foto" className="text-[#327349] text-4xl font-medium font-['Lexend Giga']">
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
            type="submit"
            className="w-[463px] h-[76px] bg-[#327349] text-white rounded-[20px] font-medium text-2xl"
          >
            Adicionar Produto
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormProduto;
