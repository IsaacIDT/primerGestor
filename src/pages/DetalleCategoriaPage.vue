<template>
    <div class="q-pa-md q-pt-xl row fixed-center vertical-middle q-gutter-md">
        <q-card class="my-card bg-primary text-white">
            <q-card-section>
                <div class="text-h6">{{ categoriaAux.nombre }}</div>
                <div class="text-subtitle2">{{ categoriaAux.id_categoria }}</div>
            </q-card-section>

            <q-card-section>
                <b>Fecha de Registro:</b> {{ categoriaAux.registro_fecha }} <br>
                <b>Id del autor que registró:</b> {{ categoriaAux.registro_autor_id }} <br>
                <b>Fecha de actualización:</b> {{ categoriaAux.actualizacion_fecha }} <br>
                <b>Id del autor que actualizó:</b> {{ categoriaAux.actualizacion_autor_id }} <br>
                <b>Status: </b> {{ categoriaAux.status }}
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { ref } from "vue";
import {
    getCategoria,
} from "../services/CategoriaService";
import { useRoute } from "vue-router";
export default {
    data() {
        return {
            categoriaAux: {},
            id_categoria: "",
            dataLista: false,
            perfil: {}
        };
    },
    methods: {
    },
    async mounted() {
        this.categoriaAux = await getCategoria(this.id_categoria);
        this.categoriaAux = this.categoriaAux[0];
        this.dataLista = true;
    },
    created() {
        this.id_categoria = useRoute().params.id;
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
}
</script>