import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./views/HomeView.vue";
import MealListView from "./views/MealListView.vue";

const routes = [
  { name: "Meal Plan", path: "/", component: HomeView },
  { name: "Meal List", path: "/meallist", component: MealListView },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
