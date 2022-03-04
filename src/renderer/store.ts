import { createStore } from "vuex";
export default createStore({
  state: {
    data: {
      table: [],
      meals: [],
      foods: [],
    },
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter((todo) => todo.done);
    },
  },
});
