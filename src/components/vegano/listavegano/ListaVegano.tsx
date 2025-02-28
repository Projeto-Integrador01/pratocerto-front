import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produtos";
import { buscar } from "../../../services/Service";
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
            await buscar('/produtos', setProdutos)
        } catch (error: any) {
            ToastAlerta ("Produtos não tao vindo irmão", "erro")
        }
    }

    // Esse useEffect verifica se quando o usuário acessou esse componente, ele tem um token válido
    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado!", "info")
            navigate('/');
        }
    }, [token])

    // Esse useEffect dispara a função de busca sempre quando o componente é renderizado
    useEffect(() => {
        buscarProdutos()
    }, [produtos.length])

    return (
        <>
            {produtos.length === 0 && ( // Se não houver temas ou estiver no momento de requisição mostre um Loader
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className='container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            >
                {produtos.map((produto) => (
                    <CardVegano key={produto.id} produto={produto} />
                ))}

            </div>
        </>
    );
}

export default ListaVegano;