<template>
  <div class="view-container">
    <h1 class="title">{{ $route.name }}</h1>
    <meal-table />
    <calorie-table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealTable from "../components/MealTable.vue";
import CalorieTable from "../components/CalorieTable.vue";

export default defineComponent({
  name: "app",
  components: {
    MealTable,
    CalorieTable,
  },
});
</script>

<style lang="scss" scoped>
.view-container {
  flex-grow: 1;
  padding: 16px;
}
</style>
