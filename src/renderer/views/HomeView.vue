<template>
  <div class="view-container">
    <div class="view-header">
      <h1 class="title">Meal Plan</h1>
      <router-link class="button" to="/tables/addNewMealPlan">New</router-link>
    </div>
    <meal-table />
    <calorie-table />
  </div>
  <router-view></router-view>
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
.view-header {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
}
.button {
  color: white;
  text-decoration: none;
  background-color: rgb(76, 128, 76);
  border-radius: 8px;
  width: 60px;
  text-align: center;
  padding: 10px 0;
}
</style>
