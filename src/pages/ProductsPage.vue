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

    <div class="q-pa-md">
      <q-table
        class="my-sticky-header-table"
        :columns="columns"
        :rows="productos"
        row-key="name"
        flat
        bordered
      >
        <template #body-cell-nombre="{ row }">
          <router-link
            class="text-center text-weight-bold text-body2"
            style="text-decoration: none; color: inherit"
            :to="`/products/${row.id}`"
            >{{ row.nombre }}</router-link
          >
        </template>
        <template #body-cell-boton="{ row }">
          <q-btn class="text-grey-8" icon="menu">
            <q-menu>
              <div>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="editar(row.nombre)">
                    <div
                      class="text-grey-8 q-gutter-md"
                      style="font-size: 20px"
                    >
                      <q-icon class="q-pt-sm" name="edit"></q-icon>
                    </div>
                    <q-item-section>Editar producto</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="deleteProductos(row.nombre)"
                  >
                    <div
                      class="text-grey-8 q-gutter-ms"
                      style="font-size: 20px"
                    >
                      <q-icon name="delete"></q-icon>
                    </div>
                    <q-item-section>Eliminar producto</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-menu>
          </q-btn>
        </template>
      </q-table>
    </div>
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
    <q-dialog v-model="prompt" persistent>
      <div>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Ingresa los datos del producto</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <FormProduComponent :nameProducto="nombre"></FormProduComponent>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>

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
import { mapActions, mapState } from "vuex";
import BusquedaProduComponent from "src/components/BusquedaProduComponent.vue";
import { ref } from "vue";
import FormProduComponent from "../components/FormProduComponent.vue";
export default {
  computed: {
    ...mapState(["productos"]),
  },
  data() {
    return {
      nombre: "",
      columns: [
        {
          name: "nombre",
          required: true,
          label: "NOMBRE",
          align: "left",
          field: "nombre",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "descripcion",
          align: "center",
          label: "DESCRIPCIÓN",
          field: "descripcion",
          sortable: true,
        },
        {
          name: "precio",
          label: "PRECIO",
          field: "precio",
          sortable: true,
        },
        {
          name: "fechaRegistro",
          label: "FECHA DE REGISTRO",
          field: "fechaRegistro",
        },
        {
          name: "status",
          label: "STATUS",
          field: "status",
        },
        {
          name: "autor",
          label: "AUTOR",
          field: "autor",
        },
        {
          name: "boton",
        },
      ],
      busqueda: [],
    };
  },
  components: {
    BusquedaProduComponent,
    FormProduComponent,
  },
  setup() {
    return {
      prompt: ref(false),
      address: ref(""),
      carousel: ref(false),
      card: ref(false),
      sliders: ref(false),

      slide: ref(1),
      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",
    };
  },
  methods: {
    ...mapActions(["deleteProductos"]),
    ...mapActions(["setProductos"]),
    editar(nombre) {
      console.log(`el nombre recibido es ${nombre}`);
      this.nombre = nombre;
      this.prompt = true;
    },
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
