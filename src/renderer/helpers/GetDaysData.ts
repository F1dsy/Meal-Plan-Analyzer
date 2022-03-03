import { Meal, TableItem, TableDay } from "../typings/types";
import gramsToCalories from "./CaloriesConversion.js";

export function getMealData(
  name: string | { content: string },
  data
): Meal | undefined {
  let mealData: Meal | undefined;
  if (typeof name === "object") {
    return data.meals.find((e: Meal) => e.name == name.content);
  } else {
    return data.meals.find((e: Meal) => e.name == name);
  }
}

export function getDaysCalories(day: Array<string | TableItem>, meals) {
  let totalCalories = 0;
  for (const meal of day) {
    const mealData = getMealData(meal, meals);
    if (!mealData) continue;
    if (
      !mealData.calories &&
      mealData.carbs &&
      mealData.fat &&
      mealData.protein
    ) {
      totalCalories +=
        gramsToCalories(mealData.carbs) +
        gramsToCalories(mealData.protein) +
        gramsToCalories(mealData.fat, true);
    } else {
      totalCalories += mealData.calories!;
    }
  }
  return totalCalories;
}
export function getDaysCarbs(day: Array<string | TableItem>, meals) {
  let totalCalories = 0;
  for (const meal of day) {
    const mealData = getMealData(meal, meals);
    if (!mealData || !mealData.carbs) continue;
    totalCalories += mealData.carbs;
  }
  return totalCalories;
}
export function getDaysProtein(day: Array<string | TableItem>, meals) {
  let totalCalories = 0;
  for (const meal of day) {
    const mealData = getMealData(meal, meals);
    if (!mealData || !mealData.protein) continue;
    totalCalories += mealData.protein;
  }
  return totalCalories;
}
export function getDaysFats(day: Array<string | TableItem>, meals) {
  let totalCalories = 0;
  for (const meal of day) {
    const mealData = getMealData(meal, meals);
    if (!mealData || !mealData.fat) continue;
    totalCalories += mealData.fat;
  }
  return totalCalories;
}
