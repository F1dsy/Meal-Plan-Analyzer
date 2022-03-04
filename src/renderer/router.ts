import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./views/HomeView.vue";
import MealListView from "./views/MealListView.vue";
import AddNewMealDialog from "./views/AddNewMealDialog.vue";

const routes = [
  { name: "Meal Plan", path: "/", component: HomeView },
  {
    name: "Meal List",
    path: "/meallist",
    component: MealListView,
    children: [
      {
        Name: "Add New Meal",
        path: "addNewMeal",
        component: AddNewMealDialog,
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
