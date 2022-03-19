import { app, BrowserWindow, ipcMain } from "electron";
import Path from "path";
import Store from "./fileStore";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: Path.join(__dirname, "preload.js"),
      devTools: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(Path.join(app.getAppPath(), "renderer", "index.html"));
  }
  mainWindow.webContents.openDevTools();
  // mainWindow.removeMenu();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

const store = new Store();

ipcMain.handleOnce("data", (event) => {
  return store.data;
});
ipcMain.handleOnce("config", (event) => {
  return store.config;
});

ipcMain.on("addNewMeal", (event, args) => {
  store.data.meals.push(args);
  store.writeMealData();
});
ipcMain.on("addNewFood", (event, args) => {
  store.data.foods.push(args);
  store.writeFoodData();
});
