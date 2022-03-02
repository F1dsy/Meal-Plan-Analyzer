import { Table } from "../typings/types";

export default function invertTable(array: Table) {
  let newArray: Array<any> = [];
  for (let i = 0; i < array[0].length; i++) {
    newArray.push([]);
  }
  array.forEach((e, i) => {
    let offset = 0;
    e.forEach((f, j) => {
      newArray[j + offset].push(f);
      if (typeof f === "object") offset++;
    });
  });
  return newArray;
}
