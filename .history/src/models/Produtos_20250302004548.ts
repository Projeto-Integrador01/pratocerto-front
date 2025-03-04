import Categoria from './Categoria';

export default interface Produto {
  id: number;
  nome: string;
  preco: Number;
  descricao: string;
  foto: string;
  tipoalimento: string;
  categoria: Categoria | null;
}




