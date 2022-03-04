import { createStore } from "vuex";
import { ipcRenderer } from "./electron";
export default createStore({
  state: {
    data: {
      table: [],
      meals: [],
    },
    config: {},
  },
  actions: {
    async init(context) {
      context.state.data = await ipcRenderer.invoke("data");
      context.state.config = await ipcRenderer.invoke("config");
    },
  },
});
