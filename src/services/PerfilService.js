import {
    set,
    eliminar,
    get,
    getProfiles,
    update, 
  } from "../repos/PerfilRepos";
  
  export const setPerfil = (perfil) => {
      return set(perfil);
    };
    
    export const eliminarPerfil = (id) => {
      return eliminar(id);
    };
    
    export const getPerfil = (id) => {
      return get(id);
    };
    
    export const updatePerfil = (perfil) => {
      return update(perfil);
    };
    
    export const getPerfiles = () => {
      return getProfiles();
    };  
  