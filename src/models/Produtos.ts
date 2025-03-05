import Categoria from './Categoria';
import Restaurante from './Restaurante';

export default interface Produto {
  id: number;
  nome: string;
  preco: Number;
  descricao: string;
  foto: string;
  tipoAlimento: string;
  categoria: Categoria | null;
  restaurante: Restaurante | null;
}