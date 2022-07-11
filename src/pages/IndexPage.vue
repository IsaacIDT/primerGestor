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
        :rows="usuarios"
        row-key="name"
        flat
        bordered
      >
        <template #body-cell-nombre="{ row }">
          <router-link
            class="text-center text-weight-bold text-body2"
            style="text-decoration: none; color: inherit"
            :to="`/${row.id}`"
            >{{ row.nombre }}</router-link
          >
        </template>
        <template #body-cell-boton="{ row }">
          <q-btn class="text-grey-8" icon="menu">
            <q-menu>
              <div>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="editar(row.id)">
                    <div
                      class="text-grey-8 q-gutter-md"
                      style="font-size: 20px"
                    >
                      <q-icon class="q-pt-sm" name="edit"></q-icon>
                    </div>
                    <q-item-section>Editar Usuario</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="borrar(row.id)"
                  >
                    <div
                      class="text-grey-8 q-gutter-ms"
                      style="font-size: 20px"
                    >
                      <q-icon name="delete"></q-icon>
                    </div>
                    <q-item-section>Eliminar usuario</q-item-section>
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
              <div class="text-h6">Ingresa los datos del usuario</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <FormularioComponent :idUsuario="id"></FormularioComponent>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>
    </div>
    <q-btn @click="probar">Probar</q-btn>
  </q-page>
</template>

<script>
import { ref } from "vue";
import FormularioComponent from "../components/FormularioComponent.vue";
import { mapActions, mapState } from "vuex";
import {
  eliminarUsuario,
  getUsuarios,
  cargarLocalStorageUsuarios,
} from "../services/UsuarioService";
export default {
  data() {
    return {
      dataLista: false,
      id: "",
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          field: "id",
        },
        {
          name: "usuario",
          required: true,
          label: "USUARIO",
          align: "left",
          field: "usuario",
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
        { name: "boton" },
      ],
      usuarios: [],
      rows: [{ ...this.usuarios }],
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
      this.usuarios= await getUsuarios();
      this.dataLista = true;
  },
  computed: {
    //...mapState(["usuarios"]),
    arrayUsuarios() {
      console.log(this.usuarios);
      return this.usuarios;
    },
  },
  methods: {
    //...mapActions(["deleteUsuarios"]),
    ...mapActions(["setUsuarios"]),
    async probar() {
      console.log(cargarLocalStorageUsuarios("www.funciona.com", "prueba"));
      const usuarios2 = await getUsuarios();
      console.log(usuarios2);
      this.usuarios = usuarios2;
    },
    borrar(id){
      eliminarUsuario(id);
    },
    editar(id) {
      console.log(`el id recibido es ${id}`);
      this.id = id;
      this.prompt = true;
    },
  },
  components: { FormularioComponent },
};
</script>

<style lang="sass">
.my-sticky-header-table
  .q-table__top,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #D8D8D8
</style>
