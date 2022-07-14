<template>
  <q-form @submit.prevent="procesarFormulario" class="q-gutter-md" v-if="dataLista">
    <q-input
      filled
      v-model="perfilAux.nombre"
      label="Nombre *"
      hint="Ingrese el nombre del perfil"
      lazy-rules
      :rules="[
        (val) =>
          (val && val.length > 4 && val.length < 100) || 'Ingresa un nombre de longitud de 4 a 100 caracteres',
      ]"
    />
    <q-input
      filled
      v-model="perfilAux.clave"
      label="Clave *"
      hint="Ingresa la clave del perfil"
      type="text"
      lazy-rules
      :rules="[(val) => (val && val.length === 12 ) || 'Please type something']"
    />
    <q-input
      filled
      v-model="perfilAux.descripcion"
      label="Descripción *"
      hint="Ingresa la descripción del perfil"
      type="text"
      lazy-rules
      :rules="[(val) => (val && val.length > 4) || 'Please type something']"
    />
    <!--
        <q-card-actions align="right" class="text-primary"> -->
    <div align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat type="submit">{{ idPerfil ? "Actualizar" : "Agregar" }} Perfil</q-btn>
    </div>
    <!-- <div>
      {{ perfilAux.nombre.length }}
      {{ perfilAux.clave.length }}
      {{ perfilAux.descripcion.length }}
    </div> -->
  </q-form>
</template>

<script>
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import {
  setPerfil,
  getPerfil,
  updatePerfil,
} from "../services/PerfilService";
import { ref } from "vue";

export default {
  props: {
    idPerfil: String,
  },
  setup() {
    return {
      model: ref(null),
      options: [200, 300],
    };
  },
  data() {
    return {
      dataLista : false,
      perfilAux: {
        nombre: "",
        clave: "",
        descripcion: "",
      },
    };
  },

  async mounted() {
    if (this.idPerfil != undefined) {
      this.perfilAux = await getPerfil(this.idPerfil);
      this.perfilAux = this.perfilAux[0];
      this.dataLista=true;
    } else {
      console.log("No hay id");
      this.dataLista=true;
    }
  },
  computed: {
  },
  methods: {
    async procesarFormulario() {
      const {
        nombre,
        clave,
        descripcion
      } = this.perfilAux;
      let obj = {};
      let perfil_id ="";
      if (this.idPerfil != undefined) {
        perfil_id = this.idPerfil;
        let actualizacion_autor_id = nanoid(12);
        obj = {
          perfil_id: perfil_id,
          nombre: nombre,
          clave: clave,
          descripcion: descripcion,
          actualizacion_autor_id: actualizacion_autor_id,
        };
      }else{
        perfil_id = nanoid(12);
        let registro_autor_id = nanoid(12);
        obj = {
            perfil_id: perfil_id,
            nombre: nombre,
            clave: clave,
            descripcion: descripcion,
            registro_autor_id: registro_autor_id,
        };
      }
      try{
        if (this.idPerfil != undefined) {
          await updatePerfil(obj);
        } else {
          await setPerfil(obj); /////////////se tiene que recibir el emit en el layout
        }
        this.perfilAux = {};
        this.$emit("recargar");
      }catch(e){
        console.log(e)
      }
    },
  },
};
</script>

<style>
</style>
