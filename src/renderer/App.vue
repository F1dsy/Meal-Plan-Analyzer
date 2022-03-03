<template>
  <div id="app" v-if="data != null">
    <h1>App</h1>
    <meal-table :data="data" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealTable from "./components/MealTable.vue";
import { ipcRenderer } from "./electron";
import { Data } from "./typings/types";
interface State {
  data: Data;
}
export default defineComponent({
  name: "app",
  components: {
    MealTable,
  },
  data(): State {
    return {
      data: { table: [], meals: [] },
    };
  },
  async created() {
    this.data = await ipcRenderer.invoke("data");
  },
});
</script>
