import axios from 'axios';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'allowedOrigins' : '*',
};
let http = axios.create(
  { 
    baseURL: "http://localhost:8000/marcas",
    headers: headers,
    mode: 'cors',
  }
);
//const data = [];

export const set = (data) => {
  return new Promise((resolve, reject) => {
    http.post(`/create`, {
      marca_id                  : data.marca_id,
      nombre                    : data.nombre,
      registro_fecha            : data.registro_fecha,
      registro_autor_id         : data.registro_autor_id,
      actualizacion_fecha       : data.actualizacion_fecha,
      actualizacion_autor_id    : data.actualizacion_autor_id,
      status                    : data.status
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
    http.post(`/editar/${data.marca_id}`, {
      marca_id                  : data.marca_id,
      nombre                    : data.nombre,
      registro_fecha            : data.registro_fecha,
      registro_autor_id         : data.registro_autor_id,
      actualizacion_fecha       : data.actualizacion_fecha,
      actualizacion_autor_id    : data.actualizacion_autor_id,
      status                    : data.status
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
    axios.get(`http://localhost:8000/marcas/${id}`).then(respuesta => {
      if(respuesta.status!==200){
        throw respuesta.statusText;
      }
      console.log('usuario', respuesta);
      resolve(respuesta.data);
    }).catch(error => console.log('error', error));
  });
};


export const getBrands = async (filtros) => {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8000/marcas").then(respuesta => {
      if(respuesta.status!==200)
        throw respuesta.statusText;
      resolve(respuesta.data);
    }).catch(error => console.log('error', error));
  });
};


