import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produtos";
import { buscarLogado } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { DNA } from "react-loader-spinner";
import CardProdutos from "../cardprodutos/CardProdutos";
import ModalProduto from "../modalproduto/ModalProduto";

function ListaProduto() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const buscarProdutos = async () => {
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
  };

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);

  const atualizarListaProdutos = () => {
    buscarProdutos();
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

      <div className="flex items-center mt-9 mx-25">
        <h1 className="text-3xl font-bold mr-6">Produtos</h1>
        <ModalProduto />
      </div>

      <div className="my-6"></div>

      <div className="flex justify-center w-full">
        <div className="container flex flex-col mx-2 relative">
          <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtos.map((produto) => (
              <CardProdutos
                key={produto.id}
                produto={produto}
                onProdutoAtualizado={atualizarListaProdutos}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListaProduto;