import axios from "axios";

const api = axios.create({
  baseURL: "https://pratocerto.onrender.com/",
});

<<<<<<< HEAD
export const cadastrarRestaurante = async (url:string, dados: object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}

export const login = async (url:string, dados: object, setDados: Function) =>{
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}
=======
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
>>>>>>> feature_categoria

export const buscar = async (url: string, setDados: Function) => {
  const resposta = await api.get(url);
  setDados(resposta.data);
};

export const buscarLogado = async (
  url: string,
  setDados: Function,
  header: object
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

<<<<<<< HEAD
export const cadastrar = async (url:string, dados: object, setDados:Function, header: object) =>{
    const resposta = await api.post(url, dados, header)
    setDados(resposta.data)
}


export const atualizar = async (url:string, dados: object, setDados:Function, header: object) =>{
    const resposta = await api.put(url, dados, header)
    setDados(resposta.data)
}

export const deletar = async (url: string, header: object) => {
    await api.delete(url, header)
}
=======
export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);
};
>>>>>>> feature_categoria
