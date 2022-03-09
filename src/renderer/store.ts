import { createStore } from "vuex";
import { ipcRenderer } from "./electron";

import { State } from "./typings/vuex";

export default createStore<State>({
  state: {
    hasLoaded: false,
    data: {
      table: [],
      meals: [],
      foods: [],
    },
    config: null,
  },
  getters: {
    foodCategories(state) {
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
  mutations: {
    addNewMeal(state, payload) {
      state.data.meals.push(payload);
    },
    removeMeal(state, meal) {
      state.data.meals.splice(state.data.meals.indexOf(meal), 1);
    },
    addNewFood(state, food) {
      state.data.foods.push(food);
    },
  },
  actions: {
    addNewMeal(context, payload) {
      ipcRenderer.send("addNewMeal", payload);
      context.commit("addNewMeal", payload);
    },
    addNewFood(context, payload) {
      ipcRenderer.send("addNewFood", payload);
      context.commit("addNewFood", payload);
    },
    init(context) {
      Promise.all([
        ipcRenderer.invoke("data").then((result) => {
          context.state.data = result;
        }),
        ipcRenderer.invoke("config").then((result) => {
          context.state.config = result;
        }),
      ]).then(() => {
        context.state.hasLoaded = true;
      });
    },
  },
});
