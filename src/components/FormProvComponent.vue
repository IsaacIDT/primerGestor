<template>
  <q-form @submit.prevent="procesarFormulario" class="q-gutter-md">
    <span>PROVEEDORES</span
    ><q-btn @click="cargarData" v-show="nameProveedor != undefined"
      >Cargar datos previos</q-btn
    >
    <q-input
      filled
      v-model="proveedorAux.nombre"
      label="Nombre *"
      hint="Ingresa el nombre del proveedor"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.trim().length > 0 && val.length < 60) ||
          'Please type something',
      ]"
    />
    <q-input
      filled
      v-model="proveedorAux.razonSocial"
      label="Razon social *"
      hint="Ingresa la razón social del proveedor"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length > 0 && val.length < 80) || 'Please type something',
      ]"
    />
    <q-input
      filled
      v-model="proveedorAux.telefono"
      label="Telefono *"
      hint="Ingresa el teléfono del proveedor"
      type="number"
      lazy-rules
      :rules="[
        (val) => (val && val.length === 10) || 'Ingresa un numero válido',
      ]"
    />
    <q-input
      filled
      v-model="proveedorAux.correo"
      label="Correo*"
      hint="Ingresa
    el correo del proveedor"
      type="text"
      lazy-rules
      :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
    />
    <q-input
      filled
      v-model="proveedorAux.paginaWeb"
      label="Página Web *"
      hint="Ingresa la página web del proveedor"
      type="text"
      lazy-rules
      :rules="[(val) => !!val || 'Website is missing', isValidWebsite]"
    />
    <!--
        <q-card-actions align="right" class="text-primary"> -->
    <div align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Add address" v-close-popup type="submit" />
    </div>
  </q-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
const shortid = require("shortid");

export default {
  computed: {
    ...mapState(["proveedor"]),
  },
  props: {
    nameProveedor: String,
  },
  data() {
    return {
      regEmail: "",
      proveedorAux: {
        nombre: "",
        razonSocial: "",
        telefono: "",
        correo: "",
        paginaWeb: "",
        fechaRegistro: "",
        status: 0,
        autor: "",
      },
    };
  },
  methods: {
    ...mapActions(["setProveedores", "getProveedor", "updateProveedor"]),
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Correo inválido";
    },
    isValidWebsite(val) {
      const websitePattern =
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
      return websitePattern.test(val) || "Sitio web inválido";
    },
    procesarFormulario() {
      const todayDate = new Date().toISOString().slice(0, 10);
      this.proveedorAux.fechaRegistro = todayDate;
      this.proveedorAux.status = 200;
      this.proveedorAux.autor = "Isaac";
      const {
        nombre,
        razonSocial,
        telefono,
        correo,
        paginaWeb,
        fechaRegistro,
        status,
        autor,
      } = this.proveedorAux;
      const obj = {
        nombre: nombre,
        razonSocial: razonSocial,
        telefono: telefono,
        correo: correo,
        paginaWeb: paginaWeb,
        fechaRegistro: fechaRegistro,
        status: status,
        autor: autor,
      };
      console.log(obj);
      if (this.nameProveedor != undefined) {
        this.updateProveedor(obj);
      } else {
        this.setProveedores(obj);
      }
      this.proveedorAux = {
        nombre: "",
        razonSocial: "",
        telefono: "",
        correo: "",
        paginaWeb: "",
        fechaRegistro: "",
        status: 0,
        autor: "",
      };
    },
    cargarData() {
      console.log(`Buscando usuario con id ${this.nameProveedor}`);
      this.getProveedor(this.nameProveedor.trim().toString());
      this.proveedorAux = this.proveedor;
      console.log(this.proveedor);
    },
    created() {
      if (this.nameProveedor != null) {
        console.log(
          `El usuario se puedde recibir en el formulario y su id es ${this.nameProveedor}`
        );
        this.getProv(this.nameProveedor);
      } else {
        console.log("NO hay id");
      }
    },
  },
};
</script>

<style>
</style>
