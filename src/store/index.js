import { createStore } from "vuex";
import router from "../router";

export default createStore({
  state: {
    usuarios: [
      {
        id: "1",
        usuario: "lemaster2000",
        contraseña: "contraseña",
        nombre: "Carlos ALberto Juanes Perez",
        correo: "lemaster.2000@dummy.com",
        status: 200,
        fechaRegistro: "2021-05-10",
        autor: "Capacitador",
      },
    ],
    usuario: {
      id: "",
      usuario: "",
      password: "",
      nombre: "",
      correo: "",
      status: 0,
      fechaRegistro: "",
      autor: "",
    },
    productos: [
      {
        id: "Yog2331",
        nombre: "Yogurth",
        descripcion: "Sabor manzana descremado",
        precio: 35,
        fechaRegistro: "2021-05-10",
        status: 200,
        autor: "Isaac",
      },
      {
        id: "sabr123as",
        nombre: "Sabritas",
        descripcion:
          "Papas fritas adobadas sabor chile jalapeño con un toque se especias",
        precio: 15,
        fechaRegistro: "2022-06-08",
        status: 200,
        autor: "Isaac",
      },
      {
        id: "chur12312",
        nombre: "Churros",
        descripcion: "Churros fritos con azucar y canela",
        precio: 30,
        fechaRegistro: "2022-05-08",
        status: 200,
        autor: "Isaac",
      },
    ],
    producto: {
      id: "",
      nombre: "",
      descripcion: "",
      precio: 0,
      fechaRegistro: "",
      status: 0,
      autor: "",
    },
    proveedores: [
      {
        id: "wfwwr21",
        nombre: "Juan",
        razonSocial: "IDT",
        telefono: "2228716726",
        correo: "juan@idt.com",
        paginaWeb: "juanidt.com",
        fechaRegistro: "2022-05-10",
        status: 200,
        autor: "Isaac",
      },
      {
        id: "sad234",
        nombre: "Maria",
        razonSocial: "Evelyn",
        telefono: "2228726726",
        correo: "maria@evelyn.com",
        paginaWeb: "mariaevelyn.com",
        fechaRegistro: "2022-02-12",
        status: 200,
        autor: "Isaac",
      },
      {
        id: "asdqwe12",
        nombre: "Rosa",
        razonSocial: "Lomas",
        telefono: "2228456726",
        correo: "Rosa@lomas.com",
        paginaWeb: "rosalomas.com",
        fechaRegistro: "2022-01-10",
        status: 200,
        autor: "Isaac",
      },
    ],
    proveedor: {
      id: "",
      nombre: "",
      razonSocial: "",
      telefono: "",
      correo: "",
      paginaWeb: "",
      fechaRegistro: "",
      status: 0,
      autor: "",
    },
  },
  getters: {
    productoAccedido(state) {
      return state.producto;
    },
  },
  mutations: {
    set(state, payload) {
      state.usuarios.push(payload);
      console.log(state.usuarios);
      localStorage.setItem("usuarios", JSON.stringify(state.usuarios));
    },
    eliminar(state, payload) {
      state.usuarios = state.usuarios.filter((item) => item.id !== payload);
      localStorage.setItem("usuarios", JSON.stringify(state.usuarios));
    },
    get(state, payload) {
      if (!state.usuarios.find((item) => item.id === payload)) {
        this.$router.push({ path: "/" });
        return;
      }
      state.usuario = state.usuarios.find((item) => item.id === payload);
    },
    update(state, payload) {
      state.usuarios = state.usuarios.map((item) =>
        item.id === payload.id ? payload : item
      );
      this.$router.push({ path: "/" });
      localStorage.setItem("usuarios", JSON.stringify(state.usuarios));
    },
    cargar(state, payload) {
      state.usuarios = payload;
    },
    cargarP(state, payload) {
      state.productos = payload;
    },
    setProd(state, payload) {
      var finded = false;
      state.productos.find((item) => {
        if (item.nombre === payload.nombre) {
          finded = true;
          console.log(finded);
        }
      });
      console.log(finded);
      if (finded !== true) {
        state.productos.push(payload);
        console.log(state.productos);
        localStorage.setItem("productos", JSON.stringify(state.productos));
      }
    },
    eliminarProd(state, payload) {
      state.productos.find((item) => {
        if (item.nombre === payload) {
          item.status = 300;
        }
      });
      localStorage.setItem("productos", JSON.stringify(state.productos));
    },
    getProd(state, payload) {
      if (
        !state.productos.find((item) => item.nombre === payload) &&
        !state.productos.find((item) => item.id === payload)
      ) {
        this.$router.push({ path: "/" });
        return;
      }
      state.producto = state.productos.find((item) => item.nombre === payload);
      if (state.producto === undefined)
        state.producto = state.productos.find((item) => item.id === payload);
    },
    updateProd(state, payload) {
      var finded = false;
      state.productos.find((item) => {
        if (item.nombre === payload.nombre) {
          finded = true;
        }
      });
      if (finded !== true) {
        state.productos = state.productos.map((item) =>
          item.nombre === payload.nombre ? payload : item
        );
        this.$router.push({ path: "/" });
        localStorage.setItem("productos", JSON.stringify(state.productos));
      }
    },

    cargarProv(state, payload) {
      state.proveedores = payload;
    },
    setProv(state, payload) {
      var finded = false;
      state.proveedores.find((item) => {
        if (item.nombre === payload.nombre) {
          finded = true;
          console.log(finded);
        }
      });
      console.log(finded);
      if (finded !== true) {
        state.proveedores.push(payload);
        console.log(state.proveedores);
        localStorage.setItem("proveedores", JSON.stringify(state.proveedores));
      }
    },
    eliminarProv(state, payload) {
      state.proveedores.find((item) => {
        if (item.nombre === payload) {
          item.status = 300;
        }
      });
      localStorage.setItem("proveedores", JSON.stringify(state.proveedores));
    },
    getProv(state, payload) {
      if (
        !state.proveedores.find((item) => item.nombre === payload) &&
        !state.proveedores.find((item) => item.id === payload)
      ) {
        this.$router.push({ path: "/" });
        return;
      }
      state.proveedor = state.proveedores.find(
        (item) => item.nombre === payload
      );
      if (state.proveedor === undefined)
        state.proveedor = state.proveedores.find((item) => item.id === payload);
    },
    updateProv(state, payload) {
      var finded = false;
      state.proveedores.find((item) => {
        if (item.nombre === payload.nombre) {
          finded = true;
        }
      });
      if (finded !== true) {
        state.proveedores = state.proveedores.map((item) =>
          item.nombre === payload.nombre ? payload : item
        );
        this.$router.push({ path: "/" });
        localStorage.setItem("proveedores", JSON.stringify(state.proveedores));
      }
    },
  },
  actions: {
    cargarLocalStorage({ commit }) {
      if (localStorage.getItem("usuarios")) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios"));
        commit("cargar", usuarios);
        if (localStorage.getItem("productos")) {
          const productos = JSON.parse(localStorage.getItem("productos"));
          commit("cargarP", productos);
          if (localStorage.getItem("proveedores")) {
            const proveedores = JSON.parse(localStorage.getItem("proveedores"));
            commit("cargarProv", proveedores);
            return;
          }
        }
      }

      localStorage.setItem("usuarios", JSON.stringify([]));
    },
    setUsuarios({ commit }, usuario) {
      commit("set", usuario);
    },
    deleteUsuarios({ commit }, id) {
      commit("eliminar", id);
    },
    getUsuario({ commit }, id) {
      commit("get", id);
    },
    updateUsuario({ commit }, usuario) {
      commit("update", usuario);
    },

    setProductos({ commit }, producto) {
      commit("setProd", producto);
    },
    deleteProductos({ commit }, nombre) {
      commit("eliminarProd", nombre);
    },
    getProducto({ commit }, nombre) {
      commit("getProd", nombre);
    },
    updateProducto({ commit }, producto) {
      commit("updateProd", producto);
    },

    setProveedores({ commit }, proveedor) {
      commit("setProv", proveedor);
    },
    deleteProveedores({ commit }, nombre) {
      commit("eliminarProv", nombre);
    },

    getProveedor({ commit }, nombre) {
      commit("getProv", nombre);
    },
    getProveedores({ commit }, nombre) {
      commit("getProv", nombre);
    },
    updateProveedor({ commit }, proveedor) {
      commit("updateProv", proveedor);
    },
    // cleanUsuario({ commit }) {
    //   commit("clean");
    // },
  },
  modules: {},
});
