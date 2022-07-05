<template>
  <h1>{{ productoAux.nombre }}</h1>
  <h2>{{ productoAux.descripcion }}</h2>
  <h3>{{ productoAux.fechaRegistro }}</h3>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { useRoute } from "vue-router";
export default {
  methods: {
    ...mapActions(["getProducto", "getProveedor"]),
  },
  data() {
    return {
      productoAux: {
        id: "",
        nombre: "",
        descripcion: "",
        precio: 0,
        status: 0,
        fechaRegistro: "",
        autor: "",
      },
    };
  },
  created() {
    console.log(useRoute().params.id);
    this.getProveedor("Juan");
    this.getProducto(useRoute().params.id);
    this.productoAux = this.producto;
    console.log(this.producto);
  },
  computed: {
    ...mapState(["producto"]),
  },
};
</script>
