import Produto from "./Produtos";

export default interface Restaurante {
  map(arg0: (restaurante: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  senha: string;
  endereco:string;
  produto?: Produto | null;
}