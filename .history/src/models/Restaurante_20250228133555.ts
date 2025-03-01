import Produto from "./Produtos";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  endereco:string;
  produto?: Produto | null;
}