<template>
  <q-form @submit.prevent="procesarFormulario" class="q-gutter-md">
    <span>{{ idMarca }}</span
    ><q-btn @click="cargarData" v-show="idMarca != undefined"
      >Cargar datos previos</q-btn
    >
    <q-input
      filled
      v-model="marcaAux.nombre"
      label="Nombre *"
      hint="Ingrese el nombre de la marca"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length > 4 && val.length < 100) || 'Ingresa un nombre de longitud de 4 a 100 caracteres',
      ]"
    />
    <q-input
      filled
      v-model="marcaAux.registro_fecha"
      label="Fecha de registro *"
      hint="Ingresa la fecha en la que se realizó el registro"
      type="date"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />
    <q-input
      filled
      v-model="marcaAux.registro_autor_id"
      label="Id del autor *"
      type="text"
      hint="Id del autor que realizó el registro"
      lazy-rules
      :rules="[(val) => (val && val.length === 12) || 'Please type something']"
    />
     <q-input
      filled
      v-model="marcaAux.actualizacion_fecha"
      label="Fecha de actualización *"
      hint="Ingresa la fecha en la que se realizó la actualización"
      type="date"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'Please type something']"
    />
    <q-input
      filled
      v-model="marcaAux.actualizacion_autor_id"
      label="Id del autor *"
      type="text"
      hint="Id del autor que realizó la actualización"
      lazy-rules
      :rules="[(val) => (val && val.length === 12) || 'Please type something']"
    />

    <q-select v-model="marcaAux.status" :options="options" label="Estado" />
    <!--
        <q-card-actions align="right" class="text-primary"> -->
    <div align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Añadir marca" v-close-popup type="submit" />
    </div>
  </q-form>
</template>

<script>
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import {
  setMarca,
  eliminarMarca,
  getMarca,
  getMarcas,
  updateMarca,
} from "../services/MarcaService";
import { ref } from "vue";

export default {
  props: {
    idMarca: String,
  },
  setup() {
    return {
      model: ref(null),
      options: [200, 300],
    };
  },
  data() {
    return {
      marcaAux: {
        marca_id: "",
        nombre: "",
        registro_fecha: "",
        registro_autor_id: "",
        actualizacion_fecha: "",
        actualizacion_autor_id: "",
        status: 0,
      },
    };
  },
  methods: {
    async procesarFormulario() {
      let marca_id ="";
      if (this.idMarca != undefined) {
        marca_id = this.idMarca;
      }else{
         marca_id = nanoid(12);
      }
      const {
        nombre,
        registro_fecha,
        registro_autor_id,
        actualizacion_fecha,
        actualizacion_autor_id,
        status,
      } = this.marcaAux;
      const obj = {
        marca_id: marca_id,
        nombre: nombre,
        registro_fecha: registro_fecha,
        registro_autor_id: registro_autor_id,
        actualizacion_fecha: actualizacion_fecha,
        actualizacion_autor_id: actualizacion_autor_id,
        status: status,
      };
      if (this.idMarca != undefined) {
        await updateMarca(obj);
        window.location.reload();
      } else {
        await setMarca(obj);
        window.location.reload();
      }
      this.marcaAux = {
        marca_id: "",
        nombre: "",
        registro_fecha: "",
        registro_autor_id: "",
        actualizacion_fecha: "",
        actualizacion_autor_id: "",
        status: 0,
      };
    },
    async cargarData() {
      console.log(`Buscando marca con id ${this.idMarca}`);
      this.marcaAux = await getMarca(this.idMarca);
      this.marcaAux = this.marcaAux[0];
      console.log(this.marcaAux);
    },
    mounted() {
      if (this.idMarca != null) {
        console.log(
          `La marca se puedde recibir en el formulario y su id es ${this.idMarca}`
        );
        this.getMarca(idMarca);
      } else {
        console.log("No hay id");
      }
    },
  },
};
</script>

<style>
</style>
