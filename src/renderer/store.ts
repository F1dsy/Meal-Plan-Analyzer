import { ipcRenderer } from "./electron";
import { defineStore } from "pinia";

import { State } from "./typings/store";
import { Food, Meal } from "./typings/types";

export const useStore = defineStore("main", {
  state: (): State => {
    return {
      hasLoaded: false,
      data: {
        table: [],
        meals: [],
        foods: [],
      },
      config: null,
    };
  },
  getters: {
    foodCategories: (state) => {
      let set = new Set();
      state.data.foods.forEach((e) => {
        set.add(e.category);
      });
      return set.values;
    },
    getFoodByName: (state) => (name: string) => {
      return state.data.foods.find((e) => e.name == name);
    },
  },
  actions: {
    addNewMeal(meal: Meal) {
      ipcRenderer.send("addNewMeal", meal);
      this.data.meals.push(meal);
    },
    removeMeal(meal: Meal) {
      this.data.meals.splice(this.data.meals.indexOf(meal), 1);
    },
    addNewFood(food: Food) {
      ipcRenderer.send("addNewFood", food);
      this.data.foods.push(food);
    },
    // removeFood(food: Food) {
    //   this.data.foods.splice(this.data.meals.indexOf(food), 1);
    // },
    updateFood(updated: Food, old: Food) {
      this.data.foods[this.data.foods.indexOf(old)] = updated;
    },
    async init() {
      Promise.all([
        ipcRenderer.invoke("data").then((result) => {
          this.data = result;
        }),
        ipcRenderer.invoke("config").then((result) => {
          this.config = result;
        }),
      ]).then(() => {
        this.hasLoaded = true;
      });
    },
  },
});
