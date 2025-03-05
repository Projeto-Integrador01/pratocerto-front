function DeletarProduto({ fecharModal }: DeletarProdutoProps) {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [produto, setProduto] = useState<Produto>({} as Produto);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
  
    async function buscarProdutoPorId(id: string) {
      try {
        await buscarLogado(`/produtos/${id}`, setProduto, {
          headers: {
            'Authorization': token,
          },
        });
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        }
      }
    }
  
    useEffect(() => {
      if (token === '') {
        ToastAlerta('Você precisa estar logado!', 'info');
        navigate('/');
      }
    }, [token]);
  
    useEffect(() => {
      if (id !== undefined) {
        buscarProdutoPorId(id);
      }
    }, [id]);
  
    async function deletarProduto() {
      setIsLoading(true);
  
      try {
        await deletar(`/produtos/${id}`, {
          headers: {
            'Authorization': token,
          },
        });
  
        ToastAlerta('Produto apagado com sucesso!', 'sucesso');
        fecharModal();  // Fecha o modal após a exclusão
        navigate('/produtos');  // Redireciona para a lista de produtos
      } catch (error: any) {
        if (error.toString().includes('403')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao deletar o produto!', 'erro');
        }
      }
  
      setIsLoading(false);
    }
  
    function retornar() {
      navigate('/produtos');
    }
  
    return (
      <div className='container w-full md:w-1/3 mx-auto'>
        <h1 className='text-4xl text-center my-4'>Deletar Produto</h1>
        <p className='text-center font-semibold mb-4'>
          Você tem certeza de que deseja apagar o produto a seguir?
        </p>
  
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
          <header className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
            Produto
          </header>
          <div className='p-4'>
            <p className='text-xl h-full'>{produto.foto}</p>
            <p>{produto.nome}</p>
          </div>
          <div className="flex flex-row gap-4 py-4 px-6">
            <button
              className='flex-1 text-slate-100 bg-red-400 hover:bg-red-600 py-2 rounded-lg'
              onClick={retornar}
            >
              Não
            </button>
            <button
              className='flex-1 text-slate-100 bg-indigo-400 hover:bg-indigo-600 py-2 rounded-lg'
              onClick={deletarProduto}
            >
              {isLoading ? (
                <RotatingLines
                  strokeColor='white'
                  strokeWidth='5'
                  animationDuration='0.75'
                  width='24'
                  visible={true}
                />
              ) : (
                <span>Sim</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
  