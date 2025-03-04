import Categoria from './Categoria';
import Restaurante from './Restaurante';

export default interface Produto {
  token: any;
  id: number;
  nome: string;
  preco: Number;
  descricao: string;
  foto: string;
  tipoalimento: string;
  categoria: Categoria | null;
  restaurante: Restaurante | null;
}