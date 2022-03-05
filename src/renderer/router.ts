import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./views/HomeView.vue";
import MealListView from "./views/MealListView.vue";
import FoodListView from "./views/FoodListView.vue";
import AddNewMealDialog from "./views/AddNewMealDialog.vue";
import AddNewFoodDialog from "./views/AddNewFoodDialog.vue";

const routes = [
  { name: "Meal Plan", path: "/", component: HomeView },
  {
    name: "Meal List",
    path: "/meallist",
    component: MealListView,
    children: [
      {
        name: "Add New Meal",
        path: "addNewMeal",
        component: AddNewMealDialog,
      },
    ],
  },
  {
    name: "Food List",
    path: "/foodlist",
    component: FoodListView,
    children: [
      {
        name: "Add New Food",
        path: "addNewFood",
        component: AddNewFoodDialog,
      },
    ],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
