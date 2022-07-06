import {
  set,
  eliminar,
  get,
  getUsers,
  update,
  cargarLocalStorageDeUsuarios,
} from "../repos/UsuarioRepos";

export const setUsuario = (url, usuario) => {
  set(url, usuario);
};

export const eliminarUsuario = (url, usuario) => {
  eliminar(url, usuario);
};

export const getUsuario = (url, usuario) => {
  get(url, usuario);
};

export const updateUsuario = (url, usuario) => {
  update(url, usuario);
};

export const getUsuarios = () => {
  return getUsers();
};

export const cargarLocalStorageUsuarios = (url, usuario) => {
  return cargarLocalStorageDeUsuarios(url, usuario);
};
