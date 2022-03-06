import { app } from "electron";
import fs from "fs";
import Path from "path";
import { Config, Data } from "./types";

export default class Store {
  data: Data;
  config: Config;
  constructor() {
    this.data = this.readData();
    this.config = this.readConfig();
  }
  getPath(string: string) {
    return Path.join(app.getAppPath(), "static", string);
  }
  readData(): Data {
    const tablePath = this.getPath("table.json");
    const mealsPath = this.getPath("meals.json");
    const foodsPath = this.getPath("foods.json");
    const mealsData = JSON.parse(
      fs.readFileSync(mealsPath, { encoding: "utf8" })
    );
    const foodsData = JSON.parse(
      fs.readFileSync(foodsPath, { encoding: "utf8" })
    );
    const tableData = JSON.parse(
      fs.readFileSync(tablePath, { encoding: "utf8" })
    );
    return {
      table: tableData,
      meals: mealsData,
      foods: foodsData,
    };
  }
  readConfig(): Config {
    const path = this.getPath("config.json");
    const data = JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
    return data;
  }
  writeMealData() {
    const path = this.getPath("meals.json");
    fs.writeFileSync(path, JSON.stringify(this.data.meals));
  }
  writeFoodData() {
    const path = this.getPath("foods.json");
    fs.writeFileSync(path, JSON.stringify(this.data.foods));
  }
  writeConfig() {
    const path = this.getPath("config.json");
    fs.writeFileSync(path, JSON.stringify(this.data));
  }
}
