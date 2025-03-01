import Produto from "./Produtos";

export default interface Restaurante {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  endereco:string;
  produto?: Produto | null;
}