<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <div>
          <div class="col">
            <div class="row">
            </div>
            <div class="row">
              <div style="font-size: 2em" class="cursor-pointer non-selectable">
                <q-icon name="menu"></q-icon>
              </div>
              <q-menu auto-close>
                <q-list style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section>
                      <router-link to="/" style="text-decoration: none; color: inherit;">Usuarios</router-link>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <router-link style="text-decoration: none; color: inherit;" to="/products">Productos</router-link>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <router-link style="text-decoration: none; color: inherit;" to="/provedores">Provedores
                      </router-link>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <router-link style="text-decoration: none; color: inherit;" to="/marcas">Marcas</router-link>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <router-link style="text-decoration: none; color: inherit;" to="/perfiles">Perfiles</router-link>
                    </q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>
                      <router-link style="text-decoration: none; color: inherit;" to="/categorias">Categorias
                      </router-link>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </div>
        </div>
        <q-space></q-space>

        <q-btn @click="prompt = true"> Alta de usuario </q-btn>
        <q-btn @click="promptProd = true"> Alta de producto </q-btn>
        <q-btn @click="promptProv = true"> Alta de provedor </q-btn>
        <q-btn @click="promptMarcas = true"> Alta de Marca </q-btn>
        <q-btn @click="promptPerfiles = true"> Alta de Perfil </q-btn>
        <q-btn @click="promptCategorias = true"> Alta de Categorias </q-btn>
      </q-toolbar>
    </q-header>

    <!-- RECARGAR ROUTER VIEWWWWWWWWWWWW-->
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
          <FormMarcaComponent @recargar="recargarEnMenu"></FormMarcaComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>

  <q-dialog v-model="promptPerfiles" persistent>
    <div>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Ingresa los datos del perfil </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <FormPerfilComponent @recargar="recargarEnMenu"></FormPerfilComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>

  <q-dialog v-model="promptCategorias" persistent>
    <div>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Ingresa los datos de la categoria </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <FormCatComponent @recargar="recargarEnMenu"></FormCatComponent>
        </q-card-section>
      </q-card>
    </div>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import FormularioComponent from "../components/FormularioComponent.vue";
import FormProduComponent from "../components/FormProduComponent.vue";
import FormProvComponent from "../components/FormProvComponent.vue";
import FormMarcaComponent from "src/components/FormMarcaComponent.vue";
import FormPerfilComponent from "src/components/FormPerfilComponent.vue";
import FormCatComponent from "src/components/FormCatComponent.vue";

export default {
  setup() {
    return {
      prompt: ref(false),
      promptProd: ref(false),
      promptProv: ref(false),
      promptMarcas: ref(false),
      promptPerfiles: ref(false),
      promptCategorias: ref(false),
      address: ref(""),
    };
  },
  methods: {
    recargarEnMenu() {
      console.log("llega al layout")
      this.promptCategorias = this.promptMarcas = this.promptPerfiles = false;
    }
  },
  components: { FormularioComponent, FormProduComponent, FormProvComponent, FormMarcaComponent, FormPerfilComponent, FormCatComponent },
};
</script>
