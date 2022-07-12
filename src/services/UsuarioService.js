import {
  set,
  eliminar,
  get,
  getUsers,
  update,
  cargarLocalStorageDeUsuarios,
} from "../repos/UsuarioRepos";

export const setUsuario = (usuario) => {
  set(usuario);
};

export const eliminarUsuario = (id) => {
  eliminar(id);
};

export const getUsuario = (id) => {
  return get(id);
};

export const updateUsuario = (usuario) => {
  update(usuario);
};

export const getUsuarios = () => {
  return getUsers();
};

export const cargarLocalStorageUsuarios = (url, usuario) => {
  return cargarLocalStorageDeUsuarios(url, usuario);
};
