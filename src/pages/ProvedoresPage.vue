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
    <q-table
      class="my-sticky-header-table"
      :columns="columns"
      :rows="proveedores"
      row-key="name"
      flat
      bordered
    >
      <template #body-cell-nombre="{ row }">
        <router-link
          class="text-center text-weight-bold text-body2"
          style="text-decoration: none; color: inherit"
          :to="`/provedores/${row.id}`"
          >{{ row.nombre }}</router-link
        >
      </template>
      <template #body-cell-boton="{ row }">
        <q-btn class="text-grey-8" icon="menu">
          <q-menu>
            <div>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="editar(row.nombre)">
                  <div class="text-grey-8 q-gutter-md" style="font-size: 20px">
                    <q-icon class="q-pt-sm" name="edit"></q-icon>
                  </div>
                  <q-item-section>Editar provedor</q-item-section>
                </q-item>
                <q-item
                  clickable
                  v-close-popup
                  @click="deleteProveedores(row.nombre)"
                >
                  <div class="text-grey-8 q-gutter-ms" style="font-size: 20px">
                    <q-icon name="delete"></q-icon>
                  </div>
                  <q-item-section>Eliminar provedor</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-menu>
        </q-btn>
      </template>
    </q-table>

    <q-dialog v-model="prompt" persistent>
      <div>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Ingresa los datos del provedor</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <FormProvComponent :nameProveedor="nombre"></FormProvComponent>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="carousel" persistent>
        <div>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Ingresa los datos del provedor</div>
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
import { mapActions, mapState } from "vuex";
import BusquedaProvComponent from "src/components/BusquedaProvComponent.vue";
import FormProvComponent from "../components/FormProvComponent.vue";
import { ref } from "vue";
export default {
  computed: {
    ...mapState(["proveedores"]),
  },
  data() {
    return {
      busqueda: [],
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
          name: "razonSocial",
          align: "center",
          label: "RAZÓN SOCIAL",
          field: "razonSocial",
          sortable: true,
        },
        {
          name: "telefono",
          label: "telefono",
          field: "telefono",
          sortable: true,
        },
        {
          name: "correo",
          label: "CORREO",
          field: "correo",
        },
        {
          name: "paginaWeb",
          label: "PÁGINA WEB",
          field: "paginaWeb",
        },
        {
          name: "fechaRegistro",
          label: "FECHA DE REGISTRO",
          field: "fechaRegistro",
        },
        {
          name: "boton",
        },
      ],
    };
  },
  components: {
    FormProvComponent,
    BusquedaProvComponent,
  },
  setup() {
    return {
      carousel: ref(false),
      prompt: ref(false),
      address: ref(""),
      card: ref(false),
      sliders: ref(false),

      slide: ref(1),
      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",
    };
  },
  methods: {
    ...mapActions(["deleteProveedores"]),
    ...mapActions(["setProv"]),
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
        console.log(this.proveedores);
        const busqueda = this.proveedores.filter(
          (proveedor) =>
            proveedor.nombre.includes(objeto.dato) ||
            proveedor.razonSocial.includes(objeto.dato)
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
