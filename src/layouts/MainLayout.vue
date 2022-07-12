<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div>
          <div class="col">
            <div class="row">
              <q-toolbar-title> Usuarios </q-toolbar-title>
            </div>
            <div class="row">
              <p class="row">Home/ Usuarios</p>
            </div>
          </div>
        </div>
        <q-space></q-space>

        <q-btn @click="prompt = true"> Alta de usuarios </q-btn>
        <q-btn @click="promptProd = true"> Alta de productos </q-btn>
        <q-btn @click="promptProv = true"> Alta de provedores </q-btn>
        <q-btn @click="promptMarcas = true"> Alta de Marcas </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <q-dialog v-model="prompt" persistent>
    <div>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Ingresa los datos del usuario</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <FormularioComponent></FormularioComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
  <q-dialog v-model="promptProd" persistent>
    <div>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Ingresa los datos del producto</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <FormProduComponent></FormProduComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>

  <q-dialog v-model="promptProv" persistent>
    <div>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Ingresa los datos del provedor</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <FormProvComponent></FormProvComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>

<q-dialog v-model="promptMarcas" persistent>
    <div>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Ingresa los datos de la marca</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <FormMarcaComponentVue></FormMarcaComponentVue>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>

</template>

<script>
import { defineComponent, ref } from "vue";
import FormularioComponent from "../components/FormularioComponent.vue";
import FormProduComponent from "../components/FormProduComponent.vue";
import FormProvComponent from "../components/FormProvComponent.vue";
import FormMarcaComponentVue from "src/components/FormMarcaComponent.vue";

export default defineComponent({
  setup() {
    return {
      prompt: ref(false),
      promptProd: ref(false),
      promptProv: ref(false),
      promptMarcas: ref(false),
      address: ref(""),
    };
  },
  name: "MainLayout",
  components: { FormularioComponent, FormProduComponent, FormProvComponent, FormMarcaComponentVue },
});
</script>
