function FormProduto({ id }: { id?: string }) { // Recebe id como prop opcional
    const { id: idFromParams } = useParams<{ id: string }>(); 
    const produtoId = id || idFromParams; // Prioriza o ID vindo da prop

    useEffect(() => {
        buscarCategorias();
        if (produtoId) {
            buscarProdutoPorId(produtoId);
        }
    }, [produtoId]);

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (produtoId) {
            try {
                await atualizar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });
                ToastAlerta("Produto atualizado com sucesso!", "sucesso");
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao atualizar produto!", "erro");
                }
            }
        } else {
            try {
                await cadastrar(`/produtos`, produto, setProduto, {
                    headers: {
                        Authorization: token,
                    },
                });
                ToastAlerta("Produto cadastrado com sucesso!", "sucesso");
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta("Erro ao cadastrar produto!", "erro");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }
