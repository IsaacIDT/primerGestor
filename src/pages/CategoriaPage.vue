<template>

    <q-page class="q-ma-xl">

        <div class="row q-mx-lg">
            <q-btn label="Filtros" icon="filter" rounded color="grey" class="q-px-md" @click="mostrar"></q-btn>
        </div>

        <div class="q-pa-md">
            <q-table class="my-sticky-header-table" title="Categorias" :rows="categorias" :columns="columns"
                row-key="name" flat bordered>
                <template #body-cell-nombre="{ row }">
                    <router-link class="text-center text-weight-bold text-body2"
                        style="text-decoration: none; color: inherit; padding-left: 2vw;"
                        :to="`/categorias/${row.categoria_id}`">{{ row.nombre }}</router-link>
                </template>
                <template #body-cell-status="{ row }">
                    <q-td class="text-center">
                        {{ row.status }}
                    </q-td>
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
                                    <q-item clickable v-close-popup @click="editar(row.categoria_id)">
                                        <div class="text-grey-8 q-gutter-md" style="font-size: 20px">
                                            <q-icon class="q-pt-sm" name="edit"></q-icon>
                                        </div>
                                        <q-item-section>Editar categoria</q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup @click="borrar(row.categoria_id)">
                                        <div class="text-grey-8 q-gutter-ms" style="font-size: 20px">
                                            <q-icon name="delete"></q-icon>
                                        </div>
                                        <q-item-section>Eliminar categoria</q-item-section>
                                    </q-item>
                                </q-list>
                            </div>
                        </q-menu>
                    </q-btn>
                </template>

            </q-table>
        </div>

        <q-dialog v-model="prompt" persistent>
            <div>
                <q-card style="min-width: 350px">
                    <q-card-section>
                        <div class="text-h6">Ingresa los datos de la categoria</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <FormCatComponent @recargar="recargarEnPadre" :idCategoria="id_categoria"></FormCatComponent>
                    </q-card-section>
                </q-card>
            </div>
        </q-dialog>

        <q-dialog v-model="carousel" persistent>
            <div>
                <q-card style="min-width: 350px">
                    <q-card-section>
                        <div class="text-h6">Ingresa los datos de la categoria</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <BusquedaCatComponent @buscar="buscandoEnPadre"></BusquedaCatComponent>
                    </q-card-section>
                </q-card>
            </div>
        </q-dialog>

    </q-page>
</template>

<script>
import { ref } from "vue";
import {
    getCategorias,
    eliminarCategoria,
    updateCategoria
} from "../services/CategoriaService";
import FormCatComponent from "src/components/FormCatComponent.vue";
import BusquedaCatComponent from "src/components/BusquedaCatComponent.vue";
export default {
    data() {
        return {
            id_categoria: "",
            categorias: [],
            columns: [
                {
                    name: "nombre",
                    required: true,
                    label: "NOMRBE",
                    format: (val) => `${val}`,
                    sortable: true,
                    align: "center"
                },
                {
                    name: "registro",
                    label: "REGISTRO",
                    align: "center"
                },
                {
                    name: "status",
                    label: "STATUS",
                    field: "status",
                    align: "center"
                },
                {
                    name: "actualizacion",
                    label: "ACTUALIZACION",
                    align: "center",
                },
                { name: "boton" },
            ],
        };
    },
    methods: {
        mostrar() {
            this.carousel = true;
        },
        async recargarEnPadre() {
            console.log("llega en padre")
            try {
                this.categorias = await getCategorias();
                this.prompt = false;
            } catch (e) {
                console.log(e)
            }
        },
        buscandoEnPadre(objeto) {
            if (objeto.opc === 1) {
                const busqueda = this.categorias.filter(
                    (categoria) =>
                        categoria.nombre.includes(objeto.dato)
                );
                this.categorias = busqueda;
            } else {
                if (objeto.opc === 2) {
                    const busqueda = this.categorias.filter(
                        (categoria) => categoria.status === parseInt(objeto.dato)
                    );
                    this.categorias = busqueda;
                } else {
                    var busqueda = [];
                    const start = new Date(objeto.dato[0]);
                    const end = new Date(objeto.dato[1]);
                    this.categorias.forEach((categoria) => {
                        var date = new Date(categoria.registro_fecha);
                        if (date > start && date < end) {
                            busqueda.push(categoria);
                        }
                    });
                    this.categorias = busqueda;
                }
            }
        },
        async borrar(id) {
            try {
                await eliminarCategoria(id);
                this.categorias = await getCategorias();
                //this.categorias;
            } catch (e) {
                console.log(e)
            } finally {
            }
        },
        editar(id) {
            console.log(`el id recibido es ${id}`);
            this.id_categoria = id;
            this.prompt = true;
        }
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
            lorem:
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",
        };
    },
    async mounted() {
        this.categorias = await getCategorias();
    },
    components: { BusquedaCatComponent, FormCatComponent }
}
</script>

<style lang="sass">
.my-sticky-header-table
  /* height or max-height is important */

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #0275d8
    color: white

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>