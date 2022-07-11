<template>
<div v-if="dataLista">
  <h1>{{ usuarioAux.nombre }}</h1>
  <h2>{{ usuarioAux.usuario }}</h2>
  <h3>{{ usuarioAux.fechaRegistro }}</h3>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { useRoute } from "vue-router";
import {
  getUsuario,
} from "../services/UsuarioService";
export default {
  data() {
    return {
      dataLista: false,
      usuarioAux: {
        id: "",
        usuario: "",
        password: "",
        nombre: "",
        correo: "",
        status: 0,
        fechaRegistro: "",
        autor: "",
      },
      id: 0,
    };
  },
  async mounted(){
    this.usuarioAux = await getUsuario(this.id);
    this.usuarioAux = this.usuarioAux[0];
    this.dataLista = true;
  },
  created() {
    this.id = useRoute().params.id;
  },
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>

