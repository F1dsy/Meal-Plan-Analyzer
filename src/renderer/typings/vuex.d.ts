// import { Store } from "vuex";
import { Data, Config } from "./types";

export interface State {
  hasLoaded: boolean;
  data: Data;
  config: Config | null;
}
// declare module "@vue/runtime-core" {
//   // declare your own store states

//   // provide typings for `this.$store`
//   interface ComponentCustomProperties {
//     $store: Store<State>;
//   }
// }
