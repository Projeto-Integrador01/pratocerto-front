import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produtos";
import { buscarLogado } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { DNA } from "react-loader-spinner";
import CardProdutos from "../cardprodutos/CardProdutos";
import ModalProduto from "../modalproduto/ModalProduto"; // Importando o ModalProduto
import ModalDeletar from "../modalproduto/ModalDeletar"; // Modal para deletar

function ListaProduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null); // Estado para armazenar o produto selecionado

  // Função para buscar os produtos
  async function buscarProdutos() {
    try {
      await buscarLogado("/produtos", setProdutos, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  // Funções para abrir modais específicos
  const abrirModalEditar = (produto: Produto) => {
    setProdutoSelecionado(produto); // Passa o produto selecionado para o modal de edição
  };

  const abrirModalDeletar = (produto: Produto) => {
    setProdutoSelecionado(produto); // Passa o produto selecionado para o modal de exclusão
  };

  return (
    <>
      {produtos.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}

      {/* Título e Botão de Cadastrar Produto */}
      <div className="flex items-center mt-9 mx-25">
        <h1 className="text-3xl font-bold mr-6">Produtos</h1>
        <ModalProduto /> {/* Botão de abrir o modal */}
      </div>

      {/* Espaço entre o título e os cards */}
      <div className="my-6"></div>

      {/* Lista de produtos */}
      <div className="flex justify-center w-full">
        <div className="container flex flex-col mx-2 relative">
          {/* Cards */}
          <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtos.map((produto) => (
              <CardProdutos
                key={produto.id}
                produto={produto}
                onEditar={abrirModalEditar}
                onDeletar={abrirModalDeletar}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal para Editar Produto */}
      {produtoSelecionado && (
        <ModalProduto
          produto={produtoSelecionado}
          fecharModal={() => setProdutoSelecionado(null)} // Fechar modal ao sair
        />
      )}

      {/* Modal para Deletar Produto */}
      {produtoSelecionado && (
        <ModalDeletar
          produto={produtoSelecionado}
          fecharModal={() => setProdutoSelecionado(null)} // Fechar modal ao sair
        />
      )}
    </>
  );
}

export default ListaProduto;
