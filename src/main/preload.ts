// const {contextBridge, ipcRenderer} = require('electron');
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: ipcRenderer,
});
