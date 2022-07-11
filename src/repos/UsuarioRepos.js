import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'allowedOrigins' : ['localhost:8080'],
};
let http = axios.create(
  { 
    baseURL: "http://localhost:8000/usuarios",
    headers: headers,
    mode: 'cors',
  }
);
const data = [];
export const set = (url, usuario) => {
  console.log(`Set de usuarios: ${url} - ${usuario}`);
};

export const eliminar = (id) => {
  return new Promise((resolve, reject) => {
    // axios.delete("http://localhost:8000/usuarios", id).then(respuesta => {
    //   if(respuesta.status!==200)
    //     throw respuesta.statusText;
    //   resolve(respuesta.data);
    // }).catch(error => console.log('error', error));
    //http.post(`/${id}`, {headers :{
    http.delete(`/${id}`).then( res =>{ 
      console.log('resolve', resolve) 
      console.log('res', res) 
    }).catch(error => { 
      console.log('error', error)
      console.log(reject)
    });

  //   http.post({
  //     data: {
  //       id: id,
  //     },
  //     // data: {
  //     //   source: source
  //     // }
  //   } //).then(respuesta => {
  //   //   if(respuesta.status!==200)
  //   //     throw respuesta.statusText;
  //   //   resolve(respuesta.data);
  //   // }).catch(error => console.log('error', error));
  // );

  });
}

export const get = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:8000/usuarios/${id}`).then(respuesta => {
      if(respuesta.status!==200)
        console.log('usuario', this.usuarioAux);
        throw respuesta.statusText;
      resolve(respuesta.data);
    }).catch(error => console.log('error', error));
  });
};

export const getUsers = async (filtros) => {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8000/usuarios").then(respuesta => {
      if(respuesta.status!==200)
        throw respuesta.statusText;
      resolve(respuesta.data);
    }).catch(error => console.log('error', error));
  });
};

export const update = (id, usuario) => {
  return new Promise((resolve, reject) => {
    axios.post(`http://localhost:8000/usuarios/update/${id}`, usuario).then(respuesta => {
      if(respuesta.status!==200)
        throw respuesta.statusText;
      resolve(respuesta.data);
    }).catch(error => console.log('error', error));
  });
};

export const cargarLocalStorageDeUsuarios = (url, usuario) => {
  if (localStorage.getItem("usuarios")) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    return usuarios;
  }
};
