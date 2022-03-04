<template>
  <div class="view-container" v-if="data != null && config != null">
    <h1 class="title">{{ $route.name }}</h1>
    <meal-table :data="data" />
    <calorie-table :data="data" :config="config" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealTable from "../components/MealTable.vue";
import CalorieTable from "../components/CalorieTable.vue";
import { ipcRenderer } from "../electron";

export default defineComponent({
  name: "app",
  components: {
    MealTable,
    CalorieTable,
  },
  data() {
    return {
      data: null,
      config: null,
    };
  },
  async created() {
    this.data = await ipcRenderer.invoke("data");
    this.config = await ipcRenderer.invoke("config");
  },
});
</script>

<style lang="scss" scoped>
.view-container {
  flex-grow: 1;
  padding: 16px;
}
</style>
