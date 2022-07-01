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
        @click="mostrar"
      ></q-btn>
    </div>
    <ListarProvComponent></ListarProvComponent>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="carousel" persistent>
        <div>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Ingresa los datos del usuario</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <BusquedaProvComponent
                @buscar="buscandoEnPadre"
              ></BusquedaProvComponent>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>
    </div>

    <div v-if="busqueda.length !== 0">
      <div v-for="proveedor in busqueda" :key="proveedor.id">
        <b>{{ proveedor.nombre }} </b>
        {{ proveedor.descripcion }}
        {{ proveedor.precio }}
        {{ proveedor.fechaRegistro }}
        {{ proveedor.status }}
        {{ proveedor.autor }}
      </div>
    </div>
  </q-page>
</template>

<script>
import ListarProvComponent from "src/components/ListarProvComponent.vue";
import { mapActions, mapState } from "vuex";
import BusquedaProvComponent from "src/components/BusquedaProvComponent.vue";
import { ref } from "vue";
export default {
  computed: {
    ...mapState(["proveedores"]),
  },
  ...mapActions(["setProv"]),
  data() {
    return {
      busqueda: [],
    };
  },
  components: {
    ListarProvComponent,
    BusquedaProvComponent,
  },
  setup() {
    return {
      carousel: ref(false),
      card: ref(false),
      sliders: ref(false),

      slide: ref(1),
      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",
    };
  },
  methods: {
    mostrar() {
      this.carousel = true;
    },
    buscandoEnPadre(objeto) {
      if (objeto.opc === 1) {
        const busqueda = this.proveedores.filter(
          (proveedor) =>
            proveedor.nombre.includes(objeto.dato) ||
            proveedor.descripcion.includes(objeto.dato)
        );
        this.busqueda = busqueda;
        console.log(busqueda);
      } else {
        if (objeto.opc === 2) {
          const busqueda = this.proveedores.filter(
            (proveedor) => proveedor.status === parseInt(objeto.dato)
          );
          this.busqueda = busqueda;
          console.log(busqueda);
        } else {
          var busqueda = [];
          const start = new Date(objeto.dato[0]);
          const end = new Date(objeto.dato[1]);
          this.proveedores.forEach((proveedor) => {
            var date = new Date(proveedor.fechaRegistro);
            if (date > start && date < end) {
              busqueda.push(proveedor);
            }
          });
          this.busqueda = busqueda;
          console.log(busqueda);
        }
      }
    },
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
