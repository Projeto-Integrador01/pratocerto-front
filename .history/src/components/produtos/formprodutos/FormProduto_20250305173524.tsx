function FormProduto({ isEditing }) {
    return (
      <div className="container flex flex-col mx-auto items-center">
        <form
          className={`flex flex-col w-2/3 gap-4 p-6 rounded-lg shadow-md 
          ${isEditing ? "border-4 border-blue-900 bg-[#FFD700]" : "border-4 border-green-900 bg-[#F2DAAC]"}`}
          onSubmit={gerarNovoProduto}
        >
          <h1 className="text-2xl text-center my-4 text-green-900">
            {isEditing ? "Editar Produto" : "Cadastrar Produto"}
          </h1>
  
          {/* Nome do Produto */}
          <div className="flex flex-col gap-2">
            <label className="text-green-900 font-bold text-sm">Nome do Produto</label>
            <input
              type="text"
              className="border-2 border-green-900 text-green-900 rounded p-1 text-sm"
            />
          </div>
  
          {/* Botão */}
          <button
            type="submit"
            className={`rounded font-bold py-1 text-sm 
            ${isEditing ? "bg-blue-900 text-white hover:bg-blue-700" : "bg-green-900 text-white hover:bg-green-700"}`}
          >
            {isEditing ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>
    );
  }
  
  export default FormProduto;
  