<template>
  <side-view-container title="Add New Food" backroute="/foodlist">
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
      <label for="unitScale">Unit Scale:</label>
      <div class="unit">
        <select name="unitScale" id="unitScale">
          <option v-for="option in options" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <label for="category">Category:</label>
      <div class="unit">
        <input type="text" name="" id="category" v-model="category" />
      </div>
      <div class="compound-box">
        <label for="compound">Compound: </label>
        <input type="checkbox" name="" id="compound" v-model="isCompound" />
      </div>
      <ingredient-list
        v-if="isCompound"
        :ingredients="ingredients"
        :add-ingredient="addNewIngredient"
        :remove-ingredient="removeIngredient"
      ></ingredient-list>
    </div>
    <div class="buttons">
      <button @click="$router.replace('/foodlist')" class="cancel">
        Cancel
      </button>
      <button @click="createFood" class="submit">Create</button>
    </div>
    <!-- <span v-if="missingField">There is a field missing.</span> -->
  </side-view-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRaw } from "vue";
import SideViewContainer from "../components/SideViewContainer.vue";
import { useStore } from "../store";
import { Food, Ingredient } from "../typings/types";
import IngredientList from "../components/IngredientList.vue";

export default defineComponent({
  setup() {
    const store = useStore();
    let unitScale = ref(store.config!.unitScales[0]);
    const options = computed(() => {
      return store.config!.unitScales;
    });
    return { store, options, unitScale };
  },
  components: { SideViewContainer, IngredientList },
  data(): Food {
    return {
      name: "",
      calories: 0,
      carbs: 0,
      fats: 0,
      protein: 0,
      unit: "",
      scale: 100,
      category: "",
      isCompound: false,
      ingredients: undefined,
    };
  },
  watch: {
    isCompound() {
      this.isCompound
        ? (this.ingredients = [])
        : (this.ingredients = undefined);
    },
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
      this.ingredients!.push(ingredient);
      const food = this.store.getFoodByName(ingredient.food);
      if (!food) return;
      this.calories += food.calories * ingredient.quantity;
      this.carbs += food.carbs * ingredient.quantity;
      this.fats += food.fats * ingredient.quantity;
      this.protein += food.protein * ingredient.quantity;
    },
    removeIngredient(ingredient: Ingredient) {
      this.ingredients!.splice(this.ingredients!.indexOf(ingredient), 1);
      const food = this.store.getFoodByName(ingredient.food);
      if (!food) return;
      this.calories -= food.calories;
      this.carbs -= food.carbs;
      this.fats -= food.fats;
      this.protein -= food.protein;
    },
    createFood() {
      if (!this.calories) this.calories = 0;
      if (!this.carbs) this.carbs = 0;
      if (!this.fats) this.fats = 0;
      if (!this.protein) this.protein = 0;
      if (!this.name) return;
      if (this.isCompound && !this.ingredients?.length) return;
      const rawFood = toRaw(this.$data);
      this.store.addNewFood(rawFood);
      this.$router.replace("/foodlist");
    },
  },
});
</script>
<style lang="scss" scoped>
// @import "../styles/add-screen-styles.scss";
.compound-box {
  display: flex;
  align-items: center;
  label {
    margin: 0;
    margin-right: 5px;
  }
}
</style>
