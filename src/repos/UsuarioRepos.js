export const set = (url, usuario) => {
  console.log(`Set de usuarios: ${url} - ${usuario}`);
};

export const eliminar = (url, usuario) => {
  console.log(`Delete de usuarios: ${url} - ${usuario}`);
};

export const get = (url, usuario) => {
  console.log(`Get de usuarios: ${url} - ${usuario}`);
};

export const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:8000/usuarios");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const update = (url, usuario) => {
  console.log(`Update de usuarios: ${url} - ${usuario}`);
};

export const cargarLocalStorageDeUsuarios = (url, usuario) => {
  if (localStorage.getItem("usuarios")) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    return usuarios;
  }
};
