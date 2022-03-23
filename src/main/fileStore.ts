import { app } from "electron";
import fs from "fs";
import Path from "path";
import { Config, Data, Food, Meal } from "./types";

export default class Store {
  data: Data;
  config: Config;
  // genUID: Generator<number, void, unknown>;
  constructor() {
    this.data = this.readData();
    this.config = this.readConfig();
    // this.genUID = this.generateUID(this.config.UIDIndex);
  }
  getPath(string: string) {
    return Path.join(app.getAppPath(), "static", string);
  }
  // *generateUID(start: number) {
  //   let index = start;
  //   while (true) {
  //     yield index++;
  //   }
  // }

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
    const data = JSON.parse(
      fs.readFileSync(path, { encoding: "utf8" })
    ) as Config;
    data.units = new Map(Object.entries(data.units));
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
    let config = this.config as any;
    (config.units = Object.fromEntries(config.units)),
      fs.writeFileSync(path, JSON.stringify(config));
  }
}
