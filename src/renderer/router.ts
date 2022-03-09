import { createRouter, createWebHashHistory } from "vue-router";

import HomeViewVue from "./views/HomeView.vue";
import MealListViewVue from "./views/MealListView.vue";
import FoodListViewVue from "./views/FoodListView.vue";
import AddMealViewVue from "./views/AddMealView.vue";
import AddFoodViewVue from "./views/AddFoodView.vue";
import AddMealPlanViewVue from "./views/AddNewMealPlanView.vue";
import FoodViewVue from "./views/FoodView.vue";

const routes = [
  {
    name: "Meal Plan",
    path: "/tables",
    component: HomeViewVue,
    children: [
      {
        name: "Add New Meal Plan",
        path: "addNewMealPlan",
        component: AddMealPlanViewVue,
      },
    ],
  },
  {
    name: "Meal List",
    path: "/meallist",
    component: MealListViewVue,
    children: [
      {
        name: "Add New Meal",
        path: "addNewMeal",
        component: AddMealViewVue,
      },
      {
        name: "Show Meal",
        path: "show/:name",
        component: AddMealViewVue,
        props: true,
      },
    ],
  },
  {
    name: "Food List",
    path: "/foodlist",
    component: FoodListViewVue,
    children: [
      {
        name: "Add New Food",
        path: "addNewFood",
        component: AddFoodViewVue,
      },
      {
        name: "Show Food",
        path: "show/:name",
        component: FoodViewVue,
        props: true,
      },
    ],
  },
  { path: "/", redirect: "/tables" },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
