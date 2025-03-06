import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produtos";
import { buscarLogado } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { Vortex } from "react-loader-spinner";
import CardProdutos from "../cardprodutos/CardProdutos";
import ModalProduto from "../modalproduto/ModalProduto"; // Importando o ModalProduto

function ListaProdutoLogado() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout, atualizarDados, setAtualizarDados } = useContext(AuthContext);
  const token = usuario.token;

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

  useEffect(() => {
    buscarProdutos();

    if(atualizarDados){
      setAtualizarDados(false);
    }
  }, [atualizarDados]);

  return (
    <>
      {produtos.length === 0 && (
        <div className="flex justify-center items-center h-screen">
                                       <Vortex
                                           visible={true}
                                           height="120"
                                           width="120"
                                           ariaLabel="vortex-loading"
                                           wrapperClass="vortex-wrapper"
                                           colors={['#327349', '#F2DAAC', '#327349', '#F2DAAC', '#F2DAAC', '#327349']}
                                       />
                                   </div>
      )}

      <div className="flex items-center mt-9 mx-25">
        <h1 className="text-3xl font-bold mr-6">Meus Produtos</h1>
        <ModalProduto />
      </div>

      <div className="my-6"></div>

      <div className="flex justify-center w-full">
        <div className="container flex flex-col mx-2 relative">

          <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {produtos
        .filter((produto) => produto.restaurante?.id === usuario.id) // Filtrando os produtos
        .map((produto) => (
          <CardProdutos key={produto.id} produto={produto} />
        ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProdutoLogado;