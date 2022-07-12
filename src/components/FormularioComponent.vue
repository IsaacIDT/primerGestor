<template>
  <q-form @submit.prevent="procesarFormulario" class="q-gutter-md">
    <span>{{ idUsuario }}</span
    ><q-btn @click="cargarData" v-show="idUsuario != undefined"
      >Cargar datos previos</q-btn
    >
    <q-input
      filled
      v-model="usuarioAux.usuario"
      label="Usuario *"
      hint="Ingrese un nombre de usuario"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length > 4 && val.length < 60) || 'Please type something',
      ]"
    /><q-input
      filled
      v-model="usuarioAux.password"
      label="Contraseña *"
      type="password"
      hint="Ingresa la contraseña"
      lazy-rules
      :rules="[(val) => (val && val.length > 8) || 'Please type something']"
    />
    <q-input
      filled
      v-model="usuarioAux.nombre"
      label="Nombre *"
      hint="Ingresa el nombre completo"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length > 20 && val.length < 80) ||
          'Please type something',
      ]"
    />
    <q-input
      filled
      v-model="usuarioAux.correo"
      label="Correo *"
      hint="Ingresa el correo electrónico"
      lazy-rules
      :rules="[(val) => (val && val.length > 15) || 'Please type something']"
    />
    

<!--     
    <q-select v-model="usuarioAux.status" :options="options" label="Estado" />
    <q-input
      filled
      v-model="usuarioAux.fechaRegistro"
      label="Fecha de registro *"
      hint="Ingresa la fecha en la que se realizó el registro"
      type="date"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />
    <q-input
      filled
      v-model="usuarioAux.autor"
      label="Autor *"
      hint="Ingresa el Tipo de autor"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    /> -->
    <!--
        <q-card-actions align="right" class="text-primary"> -->
    <div align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Añadir usuario" v-close-popup type="submit" />
    </div>
  </q-form>
</template>

<script>
import {
  setUsuario,
  eliminarUsuario,
  getUsuario,
  getUsuarios,
  updateUsuario,
  cargarLocalStorageUsuarios,
} from "../services/UsuarioService";
import { mapState, mapActions } from "vuex";
import { ref } from "vue";
const shortid = require("shortid");

export default {
  computed: {
    //...mapState(["usuario"]),
  },
  props: {
    idUsuario: Number,
  },
  setup() {
    return {
      model: ref(null),
      options: [200, 300],
    };
  },
  data() {
    return {
      usuarioAux: {
        id: 0,
        usuario: "",
        password: "",
        nombre: "",
        correo: "",
        // status: 0,
        // fechaRegistro: "",
        // autor: "",
      },
    };
  },
  methods: {
    //...mapActions(["setUsuarios", "getUsuario", "updateUsuario"]),
    procesarFormulario() {
      const {
        usuario,
        password,
        nombre,
        id,
        correo,
        // status,
        // fechaRegistro,
        // autor,
      } = this.usuarioAux;
      const obj = {
        id: id,
        usuario: usuario,
        password: password,
        nombre: nombre,
        correo: correo,
        // status: status,
        // fechaRegistro: fechaRegistro,
        // autor: autor,
      };
      console.log(obj);
      if (this.idUsuario != undefined) {
        updateUsuario(obj);
      } else {
        setUsuario(obj);
      }
      this.usuarioAux = {
        id: 0,
        usuario: "",
        password: "",
        nombre: "",
        correo: "",
        // status: 0,
        // fechaRegistro: "",
        // autor: "",
      };
    },
    async cargarData() {
      console.log(`Buscando usuario con id ${this.idUsuario}`);
      this.usuarioAux = await getUsuario(this.idUsuario);
      this.usuarioAux = this.usuarioAux[0];
      console.log(this.usuarioAux);
    },
    mounted() {
      if (this.idUsuario != null) {
        console.log(
          `El usuario se puedde recibir en el formulario y su id es ${this.idUsuario}`
        );
        this.getUsuario(idUsuario);
      } else {
        console.log("No hay id");
      }
    },
  },
};
</script>

<style>
</style>
