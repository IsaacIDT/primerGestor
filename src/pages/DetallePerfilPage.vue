<template>
    <div class="q-pa-md q-pt-xl row fixed-center vertical-middle q-gutter-md">
      <q-card class="my-card bg-primary text-white">
          <q-card-section>
            <div class="text-h6">{{ perfilAux.nombre }}</div>
          <div class="text-subtitle2">{{ perfilAux.id_perfil }}</div>
        </q-card-section>

        <q-card-section>
          <b>Clave del perfil:</b> {{ perfilAux.clave }} <br>
          <b>Descripción del perfil:</b> {{ perfilAux.descripcion }} <br>
          <b>Fecha de Registro:</b> {{ perfilAux.registro_fecha }} <br>
          <b>Id del autor que registró:</b> {{ perfilAux.registro_autor_id }} <br>
          <b>Fecha de actualización:</b> {{ perfilAux.actualizacion_fecha }} <br>
          <b>Id del autor que actualizó:</b> {{ perfilAux.actualizacion_autor_id }} <br>
          <b>Status: </b> {{ perfilAux.status }}
        </q-card-section>

        <q-separator dark />

        <div class="row">
            <div class="col-9">
                <q-space />
            </div>
            <div class="col-3">
                <q-card-actions>
                  <q-btn @click="editar" flat>Editar</q-btn>
                  <q-btn @click="borrar" flat>Eliminar</q-btn>
                </q-card-actions>
            </div>
        </div>
      </q-card>
    </div>
    <q-dialog v-model="prompt" persistent>
        <div>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Ingresa los datos del perfil </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <FormPerfilComponent @recargar="recargarEnPadre" :idPerfil="id_perfil" ></FormPerfilComponent>
            </q-card-section>
          </q-card>
        </div>
      </q-dialog>
</template>

<script>
import { ref } from "vue";
  import{
    getPerfil,
    eliminarPerfil,
    updatePerfil
  } from "../services/PerfilService";
  import { useRoute } from "vue-router";
import FormPerfilComponent from "src/components/FormPerfilComponent.vue";
  export default {
    data() {
        return {
            perfilAux: {},
            id_perfil: "",
            dataLista: false,
            perfil: {}
        };
    },
    methods: {
        async borrar() {
            try {
                this.dataLista = false;
                console.log(this.id_perfil);
                await eliminarPerfil(this.id_perfil);
                console.log(this.id_perfil);
                this.perfilAux = await getPerfil(this.id_perfil);
                this.perfilAux = this.perfilAux[0];
                this.dataLista = true;
            }
            catch (e) {
                console.log(e);
            }
            finally {
            }
        },
        editar() {
            this.prompt = true;
        },
        async recargarEnPadre() {
            console.log("llega en padre");
            try {
                this.perfilAux = await getPerfil(this.id_perfil);
                this.perfilAux = this.perfilAux[0];
                this.prompt = false;
            }
            catch (e) {
                console.log(e);
            }
        },
    },
    async mounted() {
        this.perfilAux = await getPerfil(this.id_perfil);
        this.perfilAux = this.perfilAux[0];
        this.dataLista = true;
    },
    created() {
        this.id_perfil = useRoute().params.id;
    },
    setup() {
        return {
            alert: ref(false),
            confirm: ref(false),
            prompt: ref(false),
            address: ref(""),
            carousel: ref(false),
            card: ref(false),
            sliders: ref(false),
            slide: ref(1),
            lorem: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",
        };
    },
    components: { FormPerfilComponent }
}
</script>