<template>
  <q-form @submit.prevent="procesarFormulario" class="q-gutter-md">
    <span>PRODUCTOS</span
    ><q-btn @click="cargarData" v-show="nameProducto != undefined"
      >Cargar datos previos</q-btn
    >
    <q-input
      filled
      v-model="productoAux.nombre"
      label="Nombre *"
      hint="Ingresa el nombre del producto"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length > 0 && val.length < 60) || 'Please type something',
      ]"
    />
    <q-input
      filled
      v-model="productoAux.descripcion"
      label="Descripción *"
      hint="Ingresa la descripción del producto"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length > 20 && val.length < 100) ||
          'Please type something',
      ]"
    />
    <q-input
      filled
      v-model="productoAux.precio"
      label="Precio *"
      hint="Ingresa el precio del producto"
      type="number"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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
    ...mapState(["producto"]),
  },
  props: {
    nameProducto: String,
  },
  data() {
    return {
      productoAux: {
        id: "",
        usuario: "",
        nombre: "",
        correo: "",
        status: 0,
        fechaRegistro: "",
        autor: "",
      },
    };
  },
  methods: {
    ...mapActions(["setProductos", "getProducto", "updateProducto"]),
    procesarFormulario() {
      const todayDate = new Date().toISOString().slice(0, 10);
      this.productoAux.fechaRegistro = todayDate;
      this.productoAux.status = 200;
      this.productoAux.id = shortid.generate();
      this.productoAux.autor = "Isaac";
      const { id, nombre, descripcion, precio, fechaRegistro, status, autor } =
        this.productoAux;
      const obj = {
        id: id,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        fechaRegistro: fechaRegistro,
        status: status,
        autor: autor,
      };
      console.log(obj);
      if (this.nameProducto != undefined) {
        this.updateProducto(obj);
      } else {
        this.setProductos(obj);
      }
      this.productoAux = {
        id: "",
        nombre: "",
        descripcion: "",
        precio: 0,
        fechaRegistro: "",
        status: 0,
        autor: "",
      };
    },
    cargarData() {
      console.log(`Buscando usuario con id ${this.nameProducto}`);
      this.getProducto(this.nameProducto);
      console.log(this.producto);
      this.productoAux = this.producto;
      console.log(this.producto);
    },
    created() {
      if (this.nameProducto != null) {
        console.log(
          `El usuario se puedde recibir en el formulario y su id es ${this.nameProducto}`
        );
        this.getProducto(this.nameProducto);
        console.log("pasa");
        this.productoAux = this.producto;
        console.log(this.producto);
      } else {
        console.log("NO hay id");
      }
    },
  },
};
</script>

<style>
</style>
