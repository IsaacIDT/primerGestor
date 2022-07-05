<template>
  <h1>{{ proveedorAux.nombre }}</h1>
  <h2>{{ proveedorAux.razonSocial }}</h2>
  <h3>{{ proveedorAux.fechaRegistro }}</h3>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { useRoute } from "vue-router";
export default {
  methods: {
    ...mapActions(["getProveedor"]),
  },
  data() {
    return {
      proveedorAux: {
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
    };
  },
  created() {
    console.log(useRoute().params.id);
    this.getProveedor(useRoute().params.id);
    this.proveedorAux = this.proveedor;
    console.log(this.proveedor);
  },
  computed: {
    ...mapState(["proveedor"]),
  },
};
</script>


