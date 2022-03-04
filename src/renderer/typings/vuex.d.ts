import { Store } from "vuex";
import { Data, Config } from "./types";

declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    data: Data;
    config: Config;
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
