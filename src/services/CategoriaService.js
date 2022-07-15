import {
    set,
    eliminar,
    get,
    getCategories,
    update, 
  } from "../repos/CategoriaRepos";
  
  export const setCategoria = (categoria) => {
      return set(categoria);
    };
    
    export const eliminarCategoria = (id) => {
      return eliminar(id);
    };
    
    export const getCategoria = (id) => {
      return get(id);
    };
    
    export const updateCategoria = (categoria) => {
      return update(categoria);
    };
    
    export const getCategorias = () => {
      return getCategories();
    };  
  