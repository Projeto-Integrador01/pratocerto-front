function DeletarProduto() {



    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-gray-200 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Novo Produto</h2>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="nome">
                Nome
            </label>
            <input
                type="text"
                id="nome"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="descricao">
                Descrição
            </label>
            <textarea
                id="descricao"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="preco">
                Preço
            </label>
            <input
                type="number"
                id="preco"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="saudavel">
                Saudável
            </label>
            <select
                id="saudavel"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            >
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        </div>

        <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="foto">
                Foto
            </label>
            <input
                type="file"
                id="foto"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
            Cadastrar
        </button>
    </div>
</div>

    )
}

export default DeletarProduto;