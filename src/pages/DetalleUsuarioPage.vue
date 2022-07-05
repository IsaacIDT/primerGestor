<template>
  <h1>{{ usuarioAux.nombre }}</h1>
  <h2>{{ usuarioAux.usuario }}</h2>
  <h3>{{ usuarioAux.fechaRegistro }}</h3>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { useRoute } from "vue-router";
export default {
  methods: {
    ...mapActions(["getUsuario"]),
  },
  data() {
    return {
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
    };
  },
  created() {
    console.log(useRoute().params.id);
    this.getUsuario(useRoute().params.id);
    this.usuarioAux = this.usuario;
    console.log(this.usuario);
  },
  computed: {
    ...mapState(["usuario"]),
  },
};
</script>

