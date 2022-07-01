<template>
  {{ usuarios }}
  <table class="table">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Usuario</th>
        <th scope="col">Nombre</th>
        <th scope="col">Correo</th>
        <th scope="col">Status</th>
        <th scope="col">Fecha de registro</th>
        <th scope="col">Autor</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(usuario, index) in usuarios" :key="index">
        <th scope="row">{{ usuario.id }}</th>
        <td>{{ usuario.usuario }}</td>
        <td>{{ usuario.nombre }}</td>
        <td>{{ usuario.correo }}</td>
        <td>{{ usuario.status }}</td>
        <td>{{ usuario.fechaRegistro }}</td>
        <td>{{ usuario.autor }}</td>
        <td>
          <q-btn class="text-grey-8" icon="menu">
            <q-menu>
              <div>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup @click="editar(usuario.id)">
                    <div
                      class="text-grey-8 q-gutter-md"
                      style="font-size: 20px"
                    >
                      <q-icon class="q-pt-sm" name="edit"></q-icon>
                    </div>
                    <q-item-section>Editar usuario</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup
                    @click="deleteUsuarios(usuario.id)"
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
          <FormularioComponent :idUsuario="id"></FormularioComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { mapState, mapActions } from "vuex";
import FormularioComponent from "./FormularioComponent.vue";
export default {
  setup() {
    return {
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      address: ref(""),
    };
  },
  data() {
    return { id: "" };
  },
  computed: {
    ...mapState(["usuarios"]),
  },
  methods: {
    ...mapActions(["deleteUsuarios"]),
    editar(id) {
      console.log(`el id recibido es ${id}`);
      this.id = id;
      this.prompt = true;
    },
  },
  components: { FormularioComponent },
};
</script>
