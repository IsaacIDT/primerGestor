import {
  set,
  eliminar,
  get,
  getBrands,
  update, 
} from "../repos/MarcaRepos";

export const setMarca = (marca) => {
    return set(marca);
  };
  
  export const eliminarMarca = (id) => {
    eliminar(id);
  };
  
  export const getMarca = (id) => {
    return get(id);
  };
  
  export const updateMarca = (marca) => {
    return update(marca);
  };
  
  export const getMarcas = () => {
    return getBrands();
  };  
