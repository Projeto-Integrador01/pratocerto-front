import Categoria from './Categoria';
import Restaurante from './Restaurante';

export default interface Produto {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  foto: string;
  tipoalimento: string;
  categoria: Categoria | null;
  restaurante: Restaurante | null;
}