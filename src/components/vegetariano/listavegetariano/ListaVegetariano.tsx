import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produtos";
import {buscar, buscarLogado } from "../../../services/Service";
import { DNA, Vortex } from "react-loader-spinner";
import CardVegano from "../cardvegetariano/CardVegetariano";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import CardVegetariano from "../cardvegetariano/CardVegetariano";

function ListaVegetariano() {

    // Hook para gerenciar a navegação do usuário
    const navigate = useNavigate();

    // Váriavel de Estado que recebe as produtos do back em um Array
    const [produtos, setProdutos] = useState<Produto[]>([]);

    // Função que chama a service buscar() para receber e guardar as produtos
    async function buscarProdutos() {
      try {
          await buscar("/produtos/tipoalimento/vegetariano", setProdutos);
        } catch (error: any) {
          if (error.toString().includes("403")) {
            ToastAlerta("Produtos não sendo buscados corretamente", "erro")
          }
        }
      }
    // Esse useEffect dispara a função de busca sempre quando o componente é renderizado
    useEffect(() => {
        buscarProdutos()
    }, [produtos.length])

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
  
        {/* Título e Botão de Cadastrar Produto */}
        <div className="flex items-center mt-9 mx-25">
          <h1 className="text-3xl font-bold mr-6">Produtos Vegetarianos</h1>
        </div>
  
        {/* Espaço entre o título e os cards */}
        <div className="my-6"></div>
  
        {/* Lista de produtos */}
        <div className="flex justify-center w-full">
          <div className="container flex flex-col mx-2 relative">
            {/* Cards */}
            <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {produtos.map((produto) => (
                <CardVegetariano key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

export default ListaVegetariano;