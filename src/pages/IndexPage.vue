<template>
  <q-page class="q-ma-xl">
    <div class="row q-mx-lg">
      <q-input outlined filled class="q-pr-md" label="Buscar palabra clave">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-input>
      <q-btn
        label="Limpiar"
        icon="refresh"
        rounded
        color="grey"
        class="q-px-md"
      ></q-btn>
      <q-btn
        label="Filtros"
        icon="filter"
        rounded
        color="grey"
        class="q-px-md"
      ></q-btn>
    </div>
    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        data="usuarios"
        :columns="columns"
        row-key="name"
        flat
        bordered
      >
      </q-table>
    </div>
    <ListarUsuarios></ListarUsuarios>
  </q-page>
</template>

<script>
import ListarUsuarios from "../components/ListarUsuarios.vue";
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["usuarios"]),
    arrayUsuarios() {
      console.log(this.usuarios);
      return this.usuarios;
    },
  },
  ...mapActions(["setUsuarios"]),
  data() {
    return {
      columns: [
        {
          name: "usuario",
          required: true,
          label: "USUARIO",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "nombre",
          align: "center",
          label: "NOMRBE",
          field: "nombre",
          sortable: true,
        },
        {
          name: "correo",
          label: "CORREO",
          field: "correo",
          sortable: true,
        },
        {
          name: "status",
          label: "STATUS",
          field: "status",
        },
        {
          name: "fechaRegistro",
          label: "FECHA DE REGISTRO",
          field: "fechaRegistro",
        },
        {
          name: "autor",
          label: "AUTOR",
          field: "autor",
        },
        {},
      ],

      rows: [{ ...this.usuarios }],
    };
  },
  components: {
    ListarUsuarios,
  },
};
</script>

<style lang="sass">
.my-sticky-header-table
  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #D8D8D8
</style>
