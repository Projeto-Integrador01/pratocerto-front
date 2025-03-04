interface FormProdutoProps {
    produto?: Produto;
    fecharModal: () => void;
  }
  
  function FormProduto({ produto, fecharModal }: FormProdutoProps) {
    const [produtoEdit, setProdutoEdit] = useState<Produto>(
      produto || {
        id: 0,
        nome: "",
        descricao: "",
        preco: 0,
        foto: "",
        tipoAlimento: "",
        categoria: {} as Categoria,
        restaurante: null,
      }
    );
  
    const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
      setProdutoEdit({ ...produtoEdit, [e.target.name]: e.target.value });
    };
  
    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault();
  
      const produtoComCategoria = { ...produtoEdit };
  
      try {
        if (produtoEdit.id) {
          await atualizar(`/produtos`, produtoComCategoria, setProdutoEdit, {
            headers: { Authorization: token },
          });
          ToastAlerta("Produto atualizado com sucesso!", "sucesso");
        } else {
          await cadastrar(`/produtos`, produtoComCategoria, setProdutoEdit, {
            headers: { Authorization: token },
          });
          ToastAlerta("Produto cadastrado com sucesso!", "sucesso");
        }
      } catch (error) {
        ToastAlerta("Erro ao salvar produto!", "erro");
      }
  
      fecharModal();
    }
  
    return (
      <div>
        <h1>{produtoEdit.id ? "Editar Produto" : "Cadastrar Produto"}</h1>
        <form onSubmit={gerarNovoProduto}>
          <input
            type="text"
            name="nome"
            value={produtoEdit.nome}
            onChange={atualizarEstado}
            placeholder="Nome"
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  }
  
  export default FormProduto;
  