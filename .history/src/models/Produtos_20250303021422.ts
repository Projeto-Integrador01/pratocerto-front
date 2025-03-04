import Categoria from './Categoria';

export default interface Produto {
  restaurante: any;
  id: number;
  nome: string;
  preco: Number;
  descricao: string;
  foto: string;
  tipoAlimento: string;
  categoria: Categoria | null;
}




