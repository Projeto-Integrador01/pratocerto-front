import { useState } from "react";
import Popup from "reactjs-popup";  // Importando o Popup
import FormProduto from "../formprodutos/FormProduto";
import "reactjs-popup/dist/index.css"; // Importando o CSS do Popup

function ModalProduto() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const abrirModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Impede a rolagem da tela
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Restaura a rolagem da tela
  };

  return (
    <>
      <button
        className="border px-4 py-2 bg-green-900 text-white hover:bg-green-700 rounded-lg"  // Adicionando border-radius aqui
        onClick={abrirModal}
      >
        Cadastrar
      </button>

      <Popup
        open={isModalOpen}
        onClose={fecharModal}
        modal
        contentStyle={{
          width: "100%",  // O modal ocupa 100% da largura
          height: "100vh",  // O modal ocupa 100% da altura da tela
          padding: "0",  // Remover padding externo
          backgroundColor: "#ffffff",  // Mudando a cor do fundo
          borderRadius: "10px",  // Borda arredondada
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Sombras
          zIndex: 1050,  // Colocando o modal sobre outros elementos
          display: "flex",  // Usando flexbox para garantir que o formulário ocupe todo o espaço
          flexDirection: "column",  // Colocando os elementos na coluna
          justifyContent: "space-between",  // Garantindo que o conteúdo se espalhe pela tela
          overflow: "hidden",  // Impedindo a rolagem interna do modal
        }}
        overlayStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",  // Cor do overlay
          zIndex: 1040,  // Definindo o zIndex para o overlay
        }}
      >
        {/* Formulário dentro do modal */}
        <div className="w-full h-full flex justify-center items-center">
          <form
            className="flex flex-col w-full h-full gap-4 border-4 border-green-900 bg-[#F2DAAC] p-6 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.2),0_4px_20px_rgba(0,128,0,0.3)]"
            onSubmit={gerarNovoProduto}
          >
            <h1 className="text-2xl text-center my-4 text-green-900">
              {id !== undefined ? 'Editar Produto' : 'Cadastrar Produto'}
            </h1>

            {/* Nome do Produto */}
            <div className="flex flex-col gap-2">
              <label htmlFor="nome" className="text-green-900 font-bold text-sm">Nome do Produto</label>
              <input
                type="text"
                placeholder="Nome do Produto"
                name="nome"
                required
                className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                value={produto.nome}
                onChange={atualizarEstado}
              />
            </div>

            {/* Descrição */}
            <div className="flex flex-col gap-2">
              <label htmlFor="descricao" className="text-green-900 font-bold text-sm">Descrição do Produto</label>
              <input
                type="text"
                placeholder="Descrição do Produto"
                name="descricao"
                required
                className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                value={produto.descricao}
                onChange={atualizarEstado}
              />
            </div>

            {/* Preço */}
            <div className="flex flex-col gap-2">
              <label htmlFor="preco" className="text-green-900 font-bold text-sm">Preço</label>
              <input
                type="number"
                step="0.01"
                placeholder="Preço do Produto"
                name="preco"
                required
                className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                value={produto.preco.toString()}
                onChange={atualizarEstado}
              />
            </div>

            {/* Foto */}
            <div className="flex flex-col gap-2">
              <label htmlFor="foto" className="text-green-900 font-bold text-sm">Foto do Produto (URL)</label>
              <input
                type="text"
                placeholder="URL da Imagem"
                name="foto"
                required
                className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                value={produto.foto}
                onChange={atualizarEstado}
              />
            </div>

            {/* Tipo de Alimento */}
            <div className="flex flex-col gap-2">
              <label htmlFor="tipoAlimento" className="text-green-900 font-bold text-sm">Tipo de Alimento</label>
              <select
                name="tipoAlimento"
                required
                className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                value={produto.tipoAlimento}
                onChange={atualizarEstadoTipoAlimento}
              >
                <option value="" disabled>Selecione um Tipo</option>
                <option value="vegetariano">Vegetariano</option>
                <option value="vegano">Vegano</option>
                <option value="tradicional">Tradicional</option>
              </select>
            </div>

            {/* Categoria */}
            <div className="flex flex-col gap-2">
              <label htmlFor="categorias" className="text-green-900 font-bold text-sm">Categoria</label>
              <select
                name="categoria"
                id="categorias"
                required
                className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
                value={categoria.id || ""}
                onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
              >
                <option value="" disabled>Selecione</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                ))}
              </select>
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="rounded bg-green-900 text-white hover:bg-green-700 font-bold py-1 text-sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <RotatingLines strokeColor="white" width="16" />
              ) : (
                <span>{id ? 'Atualizar' : 'Cadastrar'}</span>
              )}
            </button>
          </form>
        </div>
      </Popup>
    </>
  );
}

export default ModalProduto;
