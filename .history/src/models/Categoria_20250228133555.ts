import Produto from "./Produtos";

export default interface Categoria {
    id: number;
    nome:string;
    foto: string;
    produto?: Produto | null;
}