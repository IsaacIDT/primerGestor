import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'allowedOrigins' : '*',
};
let http = axios.create(
  { 
    baseURL: "http://localhost:8000/categorias",
    headers: headers,
    mode: 'cors',
  }
);
//const data = [];

export const set = (data) => {
  return new Promise((resolve, reject) => {
    console.log(`Data en el repo del front:  ${JSON.stringify(data)}`)
    http.post(`/create`, {
      categoria_id                  : data.categoria_id,
      nombre                    : data.nombre,
      //registro_fecha            : data.registro_fecha,
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
    http.post(`/editar/${data.categoria_id}`, {
      nombre                    : data.nombre,
      actualizacion_fecha       : data.actualizacion_fecha,
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
    axios.get(`http://localhost:8000/categorias/${id}`).then(respuesta => {
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


export const getCategories = async () => {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8000/categorias").then(respuesta => {
      if(respuesta.status!==200)
        throw respuesta.statusText;
      resolve(respuesta.data);
    }).catch(error => {
      reject({reagin: `'cause : ${error}`});
    });
  });
};


