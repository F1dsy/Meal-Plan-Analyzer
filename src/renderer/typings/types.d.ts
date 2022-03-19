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
  unitScales: Array<string>;
}

export interface Meal {
  name: string;
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
  ingredients: Ingredient[];
  caloriedensity?: number;
  preptime?: number;
  notes?: string;
  category?: string;
}

export interface Ingredient {
  food: Food;
  quantity: number;
}

/**
 * If @param ingredients is not undefined the food is a compound of other foods
 *
 * @interface
 */
export interface Food {
  name: string;
  calories: number;
  carbs: number;
  fats: number;
  protein: number;
  unit: string;
  scale: number;
  category: string;
  ingredients?: Ingredient[];
}

export interface TableItem {
  content: string;
  rowSpan: number;
  vAlign: string;
}

export type Table = Array<TableDay>;

export type TableDay = Array<string | TableItem>;
