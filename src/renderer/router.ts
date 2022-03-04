import { createRouter, createWebHashHistory } from "vue-router";

import App from "./App.vue";
import MealListView from "./views/MealListView.vue";

const routes = [
  { path: "/", component: App },
  { path: "/meallist", component: MealListView },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
