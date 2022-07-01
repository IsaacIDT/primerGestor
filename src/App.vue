<template>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  methods: {
    ...mapActions(["cargarLocalStorage"]),
  },
  created() {
    this.cargarLocalStorage();
  },
});
</script>
