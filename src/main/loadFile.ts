import { app } from "electron";
import fs from "fs";
import Path from "path";

export function getData(): Object {
  const path = Path.join(app.getAppPath(), "static", "data.json");
  const data = JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
  return data;
}
export function getConfig(): Object {
  const path = Path.join(app.getAppPath(), "static", "config.json");
  const data = JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
  return data;
}
