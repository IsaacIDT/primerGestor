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
    <div class="q-pa-md" v-if="dataLista">
      <q-table
        class="my-sticky-header-table"
        :columns="columns"
        :rows="marcas"
        row-key="name"
        flat
        bordered
      >
        <template #body-cell-nombre="{ row }">
          <router-link
            class="text-center text-weight-bold text-body2"
            style="text-decoration: none; color: inherit"
            :to="`/marcas/${row.marca_id}`"
            >{{ row.nombre }}</router-link
          >
        </template>

        <template #body-cell-registro="{ row }">
          <q-td class="text-center">
            {{ row.registro_fecha }} | {{ row.registro_autor_id }}
          </q-td>
        </template>

        <template #body-cell-actualizacion="{ row }">   
          <q-td class="text-center">       
            {{ row.actualizacion_fecha }} | {{ row.actualizacion_autor_id }}
          </q-td>
        </template>
        
        <template #body-cell-boton="{ row }">
          <q-btn class="text-grey-8" icon="menu">
            <q-menu>
              <div>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="editar(row.marca_id)">
                    <div
                      class="text-grey-8 q-gutter-md"
                      style="font-size: 20px"
                    >
                      <q-icon class="q-pt-sm" name="edit"></q-icon>
                    </div>
                    <q-item-section>Editar Marca</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="borrar(row.marca_id)"
                  >
                    <div
                      class="text-grey-8 q-gutter-ms"
                      style="font-size: 20px"
                    >
                      <q-icon name="delete"></q-icon>
                    </div>
                    <q-item-section>Eliminar marca</q-item-section>
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
              <div class="text-h6">Ingresa los datos de la marca</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <FormMarcaComponent :idMarca="id"></FormMarcaComponent>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import FormMarcaComponent from "../components/FormMarcaComponent.vue";
import {
  eliminarMarca,
  getMarcas,
} from "../services/MarcaService";
export default {
  data() {
    return {
      dataLista: false,
      id: "",
      columns: [
        {
          name: "marca_id",
          required: true,
          label: "ID",
          field: "marca_id",
        },
        {
          name: "nombre",
          required: true,
          label: "NOMRBE",
          align: "left",
          field: "nombre",
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "status",
          label: "STATUS",
          field: "status",
        },
        {
          name: "registro",
          label: "REGISTRO",
          align: "center"
        },
        {
          name: "actualizacion",
          label: "ACTUALIZACIÓN",
          field: "actualizacion",
          align: "center"
        },
        { name: "boton" },
      ],
      marcas: [],
      rows: [{ ...this.marcas }],
    };
  },
  setup() {
    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      address: ref(""),
    };
  },
  async mounted() {
      this.marcas= await getMarcas();
      this.dataLista = true;
  },
//   computed: {
//     //...mapState(["usuarios"]),
//     array() {
//       console.log(this.usuarios);
//       return this.usuarios;
//     },
//   },
  methods: {
    //...mapActions(["deleteUsuarios"]),
    borrar(id){
      eliminarMarca(id);
    },
    editar(id) {
      console.log(`el id recibido es ${id}`);
      this.id = id;
      this.prompt = true;
    },
  },
  components: { FormMarcaComponent },
};
</script>

<style lang="sass">
.my-sticky-header-table
  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #D8D8D8
</style>
