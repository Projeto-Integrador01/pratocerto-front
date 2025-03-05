import Produto from "./Produtos";

export default interface RestauranteLogin {
    id: number;
    nome: string;
    usuario: string;
    senha: string;
    foto: string;
    endereco:string;
    token: string;
    produto?: Produto | null;
}