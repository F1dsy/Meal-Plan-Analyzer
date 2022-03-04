import { Table } from "../typings/types";

export default function invertTable(array: Table) {
  let newArray: Array<any> = [];
  let indexOfLongest = 0;
  array.forEach((e, i) => {
    if (e.length > array[indexOfLongest].length) {
      indexOfLongest = i;
    }
  });
  for (let i = 0; i < array[indexOfLongest].length; i++) {
    newArray.push([]);
  }
  array.forEach((e) => {
    let offset = 0;
    e.forEach((f, j) => {
      newArray[j + offset].push(f);
      if (typeof f === "object") offset++;
    });
  });
  return newArray;
}
