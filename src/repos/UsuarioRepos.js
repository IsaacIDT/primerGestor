import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'allowedOrigins' : '*',
};
let http = axios.create(
  { 
    baseURL: "http://localhost:8000/usuarios",
    headers: headers,
    mode: 'cors',
  }
);
//const data = [];

export const set = (data) => {
  return new Promise((resolve, reject) => {
    console.log(`Data en el repo del front:  ${JSON.stringify(data)}`)
    http.post(`/create`, {
      usuario: data.usuario,
      password: data.password,
      nombre: data.nombre,
      correo: data.correo
    }).then( res =>{ 
      console.log('resolve', resolve) 
      console.log('res', res) 
    }).catch(error => { 
      console.log('error', error)
      console.log(reject)
    });
  });
};

export const update = (data) => {
  return new Promise((resolve, reject) => {
    console.log(`Data en el repo del front:  ${JSON.stringify(data)}`)
    http.post(`/editar/${data.id}`, {
      usuario: data.usuario,
      password: data.password,
      nombre: data.nombre,
      correo: data.correo
    }).then(respuesta => {
      console.log('resolve ', resolve)
      console.log('res ', respuesta)
      //resolve(respuesta.data);
    }).catch(error => {
      console.log('error', error)
      console.log(reject)
    });
  });
};

export const eliminar = (id) => {
  return new Promise((resolve, reject) => {
    http.delete(`/${id}`).then( res =>{ 
      console.log('resolve', resolve) 
      console.log('res', res) 
    }).catch(error => { 
      console.log('error', error)
      console.log(reject)
    });
  });
}

export const get = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:8000/usuarios/${id}`).then(respuesta => {
      if(respuesta.status!==200){
        throw respuesta.statusText;
      }
      console.log('usuario', respuesta);
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

export const cargarLocalStorageDeUsuarios = (url, usuario) => {
  if (localStorage.getItem("usuarios")) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    return usuarios;
  }
};
