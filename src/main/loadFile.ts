// import fs from "fs";
// import path from "path";
// import electron from "electron";

// const userDataDir = electron.app.getPath("userData");

// const dataPath = path.join(userDataDir, "data.json");

// JSON.parse(fs.readFileSync(dataPath));

import { app } from "electron";
import fs from "fs";
import Path from "path";

export default function getData(): Object {
  const path = Path.join(app.getAppPath(), "static", "data.json");
  const data = JSON.parse(fs.readFileSync(path, { encoding: "utf8" }));
  return data;
}
