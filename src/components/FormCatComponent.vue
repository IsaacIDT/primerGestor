<template>
    <q-form @submit.prevent="procesarFormulario" class="q-gutter-md" v-if="dataLista">
        <span>{{ idCategoria }}</span>
        <q-input filled v-model="categoriaAux.nombre" label="Nombre *" hint="Ingrese el nombre de la categoria"
            lazy-rules :rules="[
                (val) =>
                    (val && val.length > 4 && val.length < 100) || 'Ingresa un nombre de longitud de 4 a 100 caracteres',
            ]" />
        <!--
        <q-card-actions align="right" class="text-primary"> -->
        <div align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat type="submit">{{ idCategoria ? "Actualizar" : "Agregar" }} Perfil</q-btn>
        </div>
        <div>
            {{ categoriaAux.nombre.length }}
        </div>
    </q-form>
</template>

<script>
import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import {
    setCategoria,
    getCategoria,
    updateCategoria,
} from "../services/CategoriaService";
import { ref } from "vue";

export default {
    props: {
        idCategoria: String,
    },
    setup() {
        return {
            model: ref(null),
            options: [200, 300],
        };
    },
    data() {
        return {
            dataLista: false,
            categoriaAux: {
                categoria_id: "",
                nombre: "",
                status: 0,
            },
        };
    },

    async mounted() {
        if (this.idCategoria != undefined) {
            console.log(
                `La marca se puedde recibir en el formulario y su id es ${this.idCategoria}`
            );
            this.categoriaAux = await getCategoria(this.idCategoria);
            this.categoriaAux = this.categoriaAux[0];
            this.dataLista = true;
            //this.getMarca(idCategoria);
        } else {
            console.log("No hay id");
            this.dataLista = true;
        }
    },
    computed: {
    },
    methods: {
        async procesarFormulario() {
            const {
                nombre,
            } = this.categoriaAux;
            let obj = {};
            let categoria_id = "";
            if (this.idCategoria != undefined) {
                categoria_id = this.idCategoria;
                let actualizacion_autor_id = nanoid(12);
                obj = {
                    categoria_id: categoria_id,
                    nombre: nombre,
                    actualizacion_autor_id: actualizacion_autor_id,
                };
            } else {
                categoria_id = nanoid(12);
                let registro_autor_id = nanoid(12);
                obj = {
                    categoria_id: categoria_id,
                    nombre: nombre,
                    registro_autor_id: registro_autor_id,
                };
            }
            try {
                if (this.idCategoria != undefined) {
                    await updateCategoria(obj);
                } else {
                    await setCategoria(obj); /////////////se tiene que recibir el emit en el layout
                }
                this.categoriaAux = {
                    nombre: "",
                };
                this.$emit("recargar");
            } catch (e) {
                console.log(e)
            }
        },
    },
};
</script>

<style>
</style>
