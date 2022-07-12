<template>
<div v-if="dataLista">
  <h1>{{ marcaAux.marca_id }}</h1>
  <h2>{{ marcaAux.nombre }}</h2>
  <h3>{{ marcaAux.registro_fecha }}</h3>
  <h3>{{ marcaAux.registro_autor_id }}</h3>
  <h3>{{ marcaAux.actualizacion_fecha }}</h3>
  <h3>{{ marcaAux.actualizacion_autor_id }}</h3>
  <h3>{{ marcaAux.status }}</h3>
</div>
</template>

<script>
import { useRoute } from "vue-router";
import {
    getMarca,
} from "../services/MarcaService";
export default {
  data() {
    return {
      dataLista: false,
      marcaAux: {
        marca_id: "",
        nombre: "",
        registro_fecha: "",
        registro_autor_id: "",
        actualizacion_fecha: "",
        actualizacion_autor_id: "",
        status: 0,
      },
      id: "",
    };
  },
  async mounted(){
    this.marcaAux = await getMarca(this.id);
    this.marcaAux = this.marcaAux[0];
    this.dataLista = true;
  },
  created() {
    this.id = useRoute().params.id;
  }
};
</script>

