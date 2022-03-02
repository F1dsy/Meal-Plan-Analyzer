import { ipcRenderer } from "../electron";
import { Data } from "../typings/types";

async function getData() {
  const data: Data = await ipcRenderer.invoke("data");
  function loadData() {
    return data;
  }
  return loadData();
}

const data = getData();

export default data;
