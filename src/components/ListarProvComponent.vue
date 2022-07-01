<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Razon Social</th>
        <th scope="col">Telefono</th>
        <th scope="col">Correo</th>
        <th scope="col">Página Web</th>
        <th scope="col">Fecha de Registro</th>
        <th scope="col">Status</th>
        <th scope="col">Autor</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(proveedor, index) in proveedores" :key="index">
        <td>{{ proveedor.nombre }}</td>
        <td>{{ proveedor.razonSocial }}</td>
        <td>{{ proveedor.telefono }}</td>
        <td>{{ proveedor.correo }}</td>
        <td>{{ proveedor.paginaWeb }}</td>
        <td>{{ proveedor.fechaRegistro }}</td>
        <td>{{ proveedor.status }}</td>
        <td>{{ proveedor.autor }}</td>
        <td>
          <q-btn class="text-grey-8" icon="menu">
            <q-menu>
              <div>
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="editar(proveedor.nombre)"
                  >
                    <div
                      class="text-grey-8 q-gutter-md"
                      style="font-size: 20px"
                    >
                      <q-icon class="q-pt-sm" name="edit"></q-icon>
                    </div>
                    <q-item-section>Editar proveedor</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="deleteProveedores(proveedor.nombre)"
                  >
                    <div
                      class="text-grey-8 q-gutter-ms"
                      style="font-size: 20px"
                    >
                      <q-icon name="delete"></q-icon>
                    </div>
                    <q-item-section>Eliminar Proovedor</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-menu>
          </q-btn>
        </td>
      </tr>
    </tbody>
  </table>
  <q-dialog v-model="prompt" persistent>
    <div>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Ingresa los datos del usuario</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <FormProvComponent :nameProveedor="nombre"></FormProvComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions } from "vuex";
import FormProvComponent from "./FormProvComponent.vue";
export default {
  setup() {
    return {
      prompt: ref(false),
      address: ref(""),
    };
  },
  data() {
    return { nombre: "" };
  },
  computed: {
    ...mapState(["proveedores"]),
  },
  methods: {
    ...mapActions(["deleteProveedores"]),
    editar(nombre) {
      console.log(`el nombre recibido es ${nombre}`);
      this.nombre = nombre;
      this.prompt = true;
    },
  },
  components: { FormProvComponent },
};
</script>
