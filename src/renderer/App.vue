<template>
  <div id="app"><meal-table /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealTable from "./components/MealTable.vue";
import { ipcRenderer } from "./electron";

export default defineComponent({
  name: "app",
  components: {
    MealTable,
  },
  setup() {
    ipcRenderer.send("message", "Hello from App.vue!");
  },
});
</script>
