export type Table = Array<TableDay>;

export type TableDay = Array<string | TableItem>;

export interface Meal {
  name: string;
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
}

export interface TableItem {
  content: string;
  rowSpan: number;
  vAlign: string;
}

export interface Data {
  table: Table;
  meals: Array<Meal>;
  foods: Array<any>;
}

export interface Config {
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
}
