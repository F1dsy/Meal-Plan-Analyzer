import { Data, Config } from "./types";

export interface State {
  hasLoaded: boolean;
  data: Data;
  config: Config | null;
}
