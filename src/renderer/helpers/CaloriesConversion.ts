export default function gramsToCalories(grams: number, isFat: boolean = false) {
  if (isFat) {
    return 9 * grams;
  } else {
    return grams * 4;
  }
}
