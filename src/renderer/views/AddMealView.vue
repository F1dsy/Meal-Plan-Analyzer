<template>
  <side-view-container title="Add New Meal" backroute="/meallist">
    <div class="input-container">
      <label for="name">Title:</label>
      <div class="unit">
        <input type="text" name="name" id="name" v-model="name" />
      </div>
      <label for="calories">Calories:</label>
      <div class="unit">
        <input
          type="number"
          name="calories"
          id="calories"
          v-model="calories"
          class="border"
        /><span><span>kcal</span></span>
      </div>
      <label for="carbs">Carbs:</label>
      <div class="unit">
        <input
          type="number"
          name="carbs"
          id="carbs"
          v-model="carbs"
          class="border"
        /><span>g</span>
      </div>
      <label for="fats">Fats:</label>
      <div class="unit">
        <input
          type="number"
          name="fats"
          id="fats"
          v-model="fats"
          class="border"
        /><span>g</span>
      </div>
      <label for="protein">Protein:</label>
      <div class="unit">
        <input
          type="number"
          name="protein"
          id="protein"
          v-model="protein"
          class="border"
        /><span>g</span>
      </div>
      <label for="category">Category:</label>
      <div class="unit">
        <input type="text" name="" id="category" />
      </div>
      <ingredient-list
        :ingredients="ingredients"
        :add-ingredient="addNewIngredient"
        :remove-ingredient="removeIngredient"
      ></ingredient-list>
      <label for="preptime">Prep Time:</label>
      <div class="unit">
        <input
          type="number"
          name="preptime"
          id="preptime"
          v-model="preptime"
          class="border"
        /><span>min</span>
      </div>
      <label for="caloriedensity">Calorie Density:</label>
      <div class="unit">
        <input
          type="number"
          name="caloriedensity"
          id="caloriedensity"
          v-model="caloriedensity"
          class="border"
        /><span>kcal/100g</span>
      </div>
      <label for="notes">Method:</label>
      <div class="unit">
        <textarea
          name="notes"
          id="notes"
          cols="30"
          rows="10"
          v-model="notes"
        ></textarea>
      </div>
    </div>
    <div class="buttons">
      <button @click="$router.replace('/meallist')" class="cancel">
        Cancel
      </button>
      <button @click="createMeal" class="submit">Create</button>
    </div>
  </side-view-container>
</template>

<script lang="ts">
import { defineComponent, toRaw } from "vue";
import SideViewContainer from "../components/SideViewContainer.vue";
import IngredientList from "../components/IngredientList.vue";
import { useStore } from "../store";
import { Meal, Ingredient } from "../typings/types";

export default defineComponent({
  setup() {
    const store = useStore();
    return { store };
  },
  components: { SideViewContainer, IngredientList },
  data(): Meal {
    return {
      name: "",
      calories: 0,
      carbs: 0,
      fats: 0,
      protein: 0,
      ingredients: [],
      preptime: undefined,
      caloriedensity: undefined,
      notes: undefined,
      category: undefined,
    };
  },
  watch: {
    calories(val: number) {
      if (typeof val === "number") this.calories = parseFloat(val.toFixed(1));
    },
    carbs(val: number) {
      if (typeof val === "number") this.carbs = parseFloat(val.toFixed(1));
    },
    fats(val: number) {
      if (typeof val === "number") this.fats = parseFloat(val.toFixed(1));
    },
    protein(val: number) {
      if (typeof val === "number") this.protein = parseFloat(val.toFixed(1));
    },
  },
  methods: {
    addNewIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      const food = this.store.getFoodByName(ingredient.food);
      if (!food) return;
      this.calories += food.calories * ingredient.quantity;
      this.carbs += food.carbs * ingredient.quantity;
      this.fats += food.fats * ingredient.quantity;
      this.protein += food.protein * ingredient.quantity;
    },
    removeIngredient(ingredient: Ingredient) {
      this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
      const food = this.store.getFoodByName(ingredient.food);
      if (!food) return;
      this.calories -= food.calories;
      this.carbs -= food.carbs;
      this.fats -= food.fats;
      this.protein -= food.protein;
    },
    createMeal() {
      if (!this.calories) this.calories = 0;
      if (!this.carbs) this.carbs = 0;
      if (!this.fats) this.fats = 0;
      if (!this.protein) this.protein = 0;
      if (!(this.name && this.ingredients.length)) return;
      const rawFood = toRaw(this.$data);
      this.store.addNewMeal(rawFood);
      this.$router.replace("/meallist");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/side-screen-styles.scss";
</style>
