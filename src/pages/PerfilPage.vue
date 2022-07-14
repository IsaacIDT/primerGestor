<template>

  <q-page class="q-ma-xl">

    <div class="row q-mx-lg">
      <q-btn
        label="Filtros"
        icon="filter"
        rounded
        color="grey"
        class="q-px-md"
        @click="mostrar"
      ></q-btn>
    </div>

      <div class="q-pa-md">
          <q-table
            class="my-sticky-header-table"
            title="Perfiles"
            :rows="perfiles"
            :columns="columns"
            row-key="name"
            flat
            bordered
        >
        <template #body-cell-perfil_id="{ row }">
          <router-link
            class="text-center text-weight-bold text-body2"
            style="text-decoration: none; color: inherit; padding-left: 2vw;"
            :to="`/perfiles/${row.perfil_id}`"
            >{{ row.perfil_id }}</router-link
          >
        </template>
        <template #body-cell-descripcion="{ row }">
          <q-td class="text-center">
            {{ (row.descripcion.length > 30) ? `${row.descripcion.slice(0,30)}...` : row.descripcion }}
          </q-td>
        </template>
        <template #body-cell-registro="{ row }">
          <q-td class="text-center">
            {{ row.registro_fecha }} | {{ row.registro_autor_id }}
          </q-td>
        </template>
        </q-table>
    </div>

     <q-dialog v-model="carousel" persistent>
        <div>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Ingresa los datos del usuario</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <BusquedaPerfilComponent
                @buscar="buscandoEnPadre"
              ></BusquedaPerfilComponent>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>

  </q-page>
</template>

<script>
import { ref } from "vue";
import {
    getPerfiles
} from "../services/PerfilService";
import BusquedaPerfilComponent from "src/components/BusquedaPerfilComponent.vue";
  export default {
    setup() {
        return {
            alert: ref(false),
            confirm: ref(false),
            address: ref(""),
            carousel: ref(false),
            card: ref(false),
            sliders: ref(false),
        };
    },
    data() {
        return {
            perfiles: [],
            columns: [
                {
                    name: "perfil_id",
                    required: true,
                    label: "ID",
                    field: "perfil_id",
                    align: "center"
                },
                {
                    name: "nombre",
                    required: true,
                    label: "NOMRBE",
                    field: "nombre",
                    format: (val) => `${val}`,
                    sortable: true,
                    align: "center"
                },
                {
                    name: "descripcion",
                    label: "DESCRIPCIÓN",
                    align: "center",
                },
                {
                    name: "registro",
                    label: "REGISTRO",
                    align: "center"
                },
                {
                    name: "status",
                    label: "STATUS",
                    field: "status",
                    align: "center"
                },
                { name: "boton" },
            ],
        };
    },
    methods: {
        mostrar() {
            this.carousel = true;
        },
      buscandoEnPadre(objeto) {
        if (objeto.opc === 1) {
          const busqueda = this.perfiles.filter(
            (perfil) =>
              perfil.nombre.includes(objeto.dato)
          );
            this.perfiles = busqueda;
        } else {
          if (objeto.opc === 2) {
            const busqueda = this.perfiles.filter(
              (perfil) => perfil.status === parseInt(objeto.dato)
            );
            this.perfiles = busqueda;
          } else {
            var busqueda = [];
            const start = new Date(objeto.dato[0]);
            const end = new Date(objeto.dato[1]);
            this.perfiles.forEach((perfil) => {
              var date = new Date(perfil.registro_fecha);
              if (date > start && date < end) {
                busqueda.push(perfil);
              }
            });
            this.perfiles = busqueda;
          }
        }
      },
    },
    async mounted() {
        this.perfiles = await getPerfiles();
    },
    components: { BusquedaPerfilComponent }
}
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #0275d8
    color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>