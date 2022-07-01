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
    <ListarProductos></ListarProductos>
    <div class="q-pa-md q-gutter-sm">
      <!--
      <q-dialog v-model="carousel">
        <q-carousel
          transition-prev="slide-right"
          transition-next="slide-left"
          swipeable
          animated
          v-model="slide"
          control-color="primary"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          height="200px"
          class="bg-white shadow-1 rounded-borders"
        >
          <BusquedaProduComponent></BusquedaProduComponent
        ></q-carousel>
      </q-dialog> -->

      <q-dialog v-model="carousel" persistent>
        <div>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Ingresa los datos del usuario</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <BusquedaProduComponent
                @buscar="buscandoEnPadre"
              ></BusquedaProduComponent>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>
    </div>

    <div v-if="busqueda.length !== 0">
      <div v-for="producto in busqueda" :key="producto.id">
        <b>{{ producto.nombre }} </b>
        {{ producto.descripcion }}
        {{ producto.precio }}
        {{ producto.fechaRegistro }}
        {{ producto.status }}
        {{ producto.autor }}
      </div>
    </div>
  </q-page>
</template>

<script>
import ListarProductos from "../components/ListarProductos.vue";
import { mapActions, mapState } from "vuex";
import BusquedaProduComponent from "src/components/BusquedaProduComponent.vue";
import { ref } from "vue";
export default {
  computed: {
    ...mapState(["productos"]),
  },
  ...mapActions(["setProductos"]),
  data() {
    return {
      busqueda: [],
    };
  },
  components: {
    ListarProductos,
    BusquedaProduComponent,
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
        const busqueda = this.productos.filter(
          (producto) =>
            producto.nombre.includes(objeto.dato) ||
            producto.descripcion.includes(objeto.dato)
        );
        this.busqueda = busqueda;
        console.log(busqueda);
      } else {
        if (objeto.opc === 2) {
          const busqueda = this.productos.filter(
            (producto) => producto.status === parseInt(objeto.dato)
          );
          this.busqueda = busqueda;
          console.log(busqueda);
        } else {
          var busqueda = [];
          const start = new Date(objeto.dato[0]);
          const end = new Date(objeto.dato[1]);
          this.productos.forEach((producto) => {
            var date = new Date(producto.fechaRegistro);
            if (date > start && date < end) {
              busqueda.push(producto);
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
