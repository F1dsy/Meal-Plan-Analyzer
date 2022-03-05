export type Table = Array<TableDay>;

export type TableDay = Array<string | TableItem>;

export type Food = string;

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
  foods: Array<Food>;
}

export interface Config {
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
}
