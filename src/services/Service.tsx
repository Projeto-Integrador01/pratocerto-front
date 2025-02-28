/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";

const api = axios.create({
  baseURL: "https://pratocerto.onrender.com/",
});

export const cadastrarRestaurante = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (url: string, setDados: Function) => {
<<<<<<< HEAD
  const resposta = await api.get(url);
  setDados(resposta.data);
};
=======
    const resposta = await api.get(url)
    setDados(resposta.data)
}

export const buscarLogado = async (url: string, setDados: Function, header: object) => {
    const resposta = await api.get(url, header)
    setDados(resposta.data)
}
>>>>>>> developer

export const buscarLogado = async (url: string, setDados: Function) => {
  const resposta = await api.get(url);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.put(url, dados);
  setDados(resposta.data);
};

export const deletar = async (url: string) => {
  await api.delete(url);
};
