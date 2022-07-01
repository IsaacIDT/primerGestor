<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Descripción</th>
        <th scope="col">Precio</th>
        <th scope="col">Fecha de registro</th>
        <th scope="col">Status</th>
        <th scope="col">Autor</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(producto, index) in productos" :key="index">
        <td>{{ producto.nombre }}</td>
        <td>{{ producto.descripcion }}</td>
        <td>{{ producto.precio }}</td>
        <td>{{ producto.fechaRegistro }}</td>
        <td>{{ producto.status }}</td>
        <td>{{ producto.autor }}</td>
        <td>
          <q-btn class="text-grey-8" icon="menu">
            <q-menu>
              <div>
                <q-list style="min-width: 100px">
                  <q-item
                    clickable
                    v-close-popup
                    @click="editar(producto.nombre)"
                  >
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
                    @click="deleteProductos(producto.nombre)"
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
          <FormProduComponent :nameProducto="nombre"></FormProduComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions } from "vuex";
import FormProduComponent from "./FormProduComponent.vue";
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
    ...mapState(["productos"]),
  },
  methods: {
    ...mapActions(["deleteProductos"]),
    editar(nombre) {
      console.log(`el nombre recibido es ${nombre}`);
      this.nombre = nombre;
      this.prompt = true;
    },
  },
  components: { FormProduComponent },
};
</script>
