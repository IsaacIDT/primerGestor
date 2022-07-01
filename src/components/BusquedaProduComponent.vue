<template>
  <q-carousel
    transition-prev="slide-right"
    transition-next="slide-left"
    swipeable
    animated
    v-model="slide"
    control-color="primary"
    navigation-icon="radio_button_unchecked"
    navigation
    padding
    height="200px"
    class="bg-white shadow-1 rounded-borders"
  >
    <q-carousel-slide :name="1" class="column no-wrap flex-center">
      <span>Búsqueda por texto libre (nombre y descripción)</span>
      <q-input v-model="text" />
      {{ text }}

      <q-btn @click="buscar(1)" v-close-popup>Buscar</q-btn>
    </q-carousel-slide>
    <q-carousel-slide :name="2" class="column no-wrap flex-center">
      <span>Búsqueda por estatus</span>
      <div class="q-pa-md">
        <div class="q-gutter-sm">
          <q-radio v-model="status" val="200" label="200" />
          <q-radio v-model="status" val="300" label="300" />
        </div>
        Your selection is: <strong>{{ status }}</strong>
      </div>
      <q-btn @click="buscar(2)" v-close-popup>Buscar</q-btn>
    </q-carousel-slide>

    <q-carousel-slide :name="3" class="column no-wrap flex-center">
      <span>Rango de fechas:</span>
      <div class="row">
        <q-input v-model="dateI" filled type="date" hint="Rango de inicio" />
        <q-input v-model="dateF" filled type="date" hint="Rango de fin" />
      </div>
      {{ dateI }} - {{ dateF }}

      <q-btn @click="buscar(3)" v-close-popup>Buscar</q-btn>
    </q-carousel-slide>
  </q-carousel>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      slide: ref(1),
      lorem:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus, ratione eum minus fuga, quasi dicta facilis corporis magnam, suscipit at quo nostrum!",
      text: ref(""),
      status: ref("200"),
      dateI: ref(""),
      dateF: ref(""),
    };
  },
  data() {
    return {};
  },
  props: {},
  methods: {
    buscar(n) {
      if (n === 1) {
        this.$emit("buscar", { opc: 1, dato: this.text });
      } else {
        if (n == 2) {
          this.$emit("buscar", { opc: 2, dato: this.status });
        } else {
          this.$emit("buscar", { opc: 3, dato: [this.dateI, this.dateF] });
        }
      }
    },
  },
};
</script>

<style>
</style>
