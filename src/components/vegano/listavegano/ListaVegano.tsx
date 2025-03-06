import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produtos";
import { buscar, buscarLogado } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import CardVegano from "../cardvegano/CardVegano";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaVegano() {

    // Hook para gerenciar a navegação do usuário
    const navigate = useNavigate();

    // Váriavel de Estado que recebe as produtos do back em um Array
    const [produtos, setProdutos] = useState<Produto[]>([]);


    // useContext acessa nosso contexto, buscando dele as informações necessárias para esse Componente
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;


    // Função que chama a service buscar() para receber e guardar as produtos
    async function buscarProdutos() {
        try {
            await buscarLogado("/produtos/tipoalimento/vegano", setProdutos, {
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
    // Esse useEffect dispara a função de busca sempre quando o componente é renderizado
    useEffect(() => {
        buscarProdutos()
    }, [produtos.length])

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
          <h1 className="text-3xl font-bold mr-6">Produtos Veganos</h1>
        </div>
  
        {/* Espaço entre o título e os cards */}
        <div className="my-6"></div>
  
        {/* Lista de produtos */}
        <div className="flex justify-center w-full">
          <div className="container flex flex-col mx-2 relative">
            {/* Cards */}
            <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {produtos.map((produto) => (
                <CardVegano key={produto.id} produto={produto} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

export default ListaVegano;