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
  readData(): Data {
    const tablePath = Path.join(app.getAppPath(), "static", "table.json");
    const mealsPath = Path.join(app.getAppPath(), "static", "meals.json");
    const foodsPath = Path.join(app.getAppPath(), "static", "foods.json");
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
    const path = Path.join(app.getAppPath(), "static", "config.json");
    const data = JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
    return data;
  }
  writeMealData() {
    const path = Path.join(app.getAppPath(), "static", "meals.json");
    fs.writeFileSync(path, JSON.stringify(this.data.meals));
  }
  writeConfig() {
    const path = Path.join(app.getAppPath(), "static", "config.json");
    fs.writeFileSync(path, JSON.stringify(this.data));
  }
}
