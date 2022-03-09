import { createRouter, createWebHashHistory } from "vue-router";

import HomeViewVue from "./views/HomeView.vue";
import MealListViewVue from "./views/MealListView.vue";
import FoodListViewVue from "./views/FoodListView.vue";
import AddNewMealDialogVue from "./views/AddNewMealDialog.vue";
import AddNewFoodDialogVue from "./views/AddNewFoodDialog.vue";
import AddNewMealPlanDialogVue from "./views/AddNewMealPlanDialog.vue";
import EditFoodDialogVue from "./views/EditFoodDialog.vue";

const routes = [
  {
    name: "Meal Plan",
    path: "/tables",
    component: HomeViewVue,
    children: [
      {
        name: "Add New Meal Plan",
        path: "addNewMealPlan",
        component: AddNewMealPlanDialogVue,
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
        component: AddNewMealDialogVue,
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
        component: AddNewFoodDialogVue,
      },
      {
        name: "Edit Food",
        path: "show/:food",
        component: EditFoodDialogVue,
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
