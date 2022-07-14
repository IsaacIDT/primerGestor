import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'allowedOrigins' : '*',
};
let http = axios.create(
  { 
    baseURL: "http://localhost:8000/perfiles",
    headers: headers,
    mode: 'cors',
  }
);
//const data = [];

export const set = (data) => {
  return new Promise((resolve, reject) => {
    http.post(`/create`, {
      perfil_id                  : data.perfil_id,
      nombre                    : data.nombre,
      clave                     : data.clave,
      descripcion               : data.descripcion,
      registro_autor_id         : data.registro_autor_id,
    }).then( res =>{ 
      resolve({message: `done ${res}`});
    }).catch(error => { 
      reject({reagin: `'cause : ${error}`});
    });
  });
};

export const update = (data) => {
  return new Promise((resolve, reject) => {
    console.log(`Data en el repo del front:  ${JSON.stringify(data)}`)
    http.post(`/editar/${data.perfil_id}`, {
      nombre                    : data.nombre,
      clave                     : data.clave,
      descripcion               : data.descripcion,
      actualizacion_autor_id    : data.actualizacion_autor_id,
    }).then(respuesta => {
      resolve({message: `done ${respuesta}`})
      //resolve(respuesta.data);
    }).catch(error => {
      reject({reagin: `'cause : ${error}`});
    });
  });
};

export const eliminar = (id) => {
  return new Promise((resolve, reject) => {
    http.delete(`/${id}`).then( res =>{ 
      resolve({message: `done ${res}`})
    }).catch(error => { 
      reject({reagin: `'cause : ${error}`});
    });
  });
}

export const get = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`http://localhost:8000/perfiles/${id}`).then(respuesta => {
      if(respuesta.status!==200){
        throw respuesta.statusText;
      }
      console.log('usuario', respuesta);
      resolve(respuesta.data);
    }).catch(error => {
      reject({reagin: `'cause : ${error}`});
    });
  });
};


export const getProfiles = async () => {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8000/perfiles").then(respuesta => {
      if(respuesta.status!==200)
        throw respuesta.statusText;
      resolve(respuesta.data);
    }).catch(error => {
      reject({reagin: `'cause : ${error}`});
    });
  });
};


