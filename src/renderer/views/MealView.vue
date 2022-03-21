<template>
  <side-view-container :title="meal.name" backroute="/meallist">
    <div class="input-container">
      <label for="name">Title:</label>
      <div class="unit">
        <input type="text" name="name" id="name" v-model="meal.name" />
      </div>
      <label for="calories">Calories:</label>
      <div class="unit">
        <input
          type="number"
          name="calories"
          id="calories"
          v-model="meal.calories"
          class="border"
          @change="onChange"
        /><span><span>kcal</span></span>
      </div>
      <label for="carbs">Carbs:</label>
      <div class="unit">
        <input
          type="number"
          name="carbs"
          id="carbs"
          v-model="meal.carbs"
          class="border"
          @change="onChange"
        /><span>g</span>
      </div>
      <label for="fats">Fats:</label>
      <div class="unit">
        <input
          type="number"
          name="fats"
          id="fats"
          v-model="meal.fats"
          class="border"
          @change="onChange"
        /><span>g</span>
      </div>
      <label for="protein">Protein:</label>
      <div class="unit">
        <input
          type="number"
          name="protein"
          id="protein"
          v-model="meal.protein"
          class="border"
          @change="onChange"
        /><span>g</span>
      </div>
      <label for="category">Category:</label>
      <div class="unit">
        <input type="text" name="" id="category" @change="onChange" />
      </div>
      <ingredient-list
        :ingredients="meal.ingredients"
        :add-ingredient="addNewIngredient"
        :remove-ingredient="removeIngredient"
      ></ingredient-list>
      <label for="preptime">Prep Time:</label>
      <div class="unit">
        <input
          type="number"
          name="preptime"
          id="preptime"
          v-model="meal.preptime"
          class="border"
          @change="onChange"
        /><span>min</span>
      </div>
      <label for="caloriedensity">Calorie Density:</label>
      <div class="unit">
        <input
          type="number"
          name="caloriedensity"
          id="caloriedensity"
          v-model="meal.caloriedensity"
          class="border"
          @change="onChange"
        /><span>kcal/100g</span>
      </div>
      <label for="notes">Method:</label>
      <div class="unit">
        <textarea
          name="notes"
          id="notes"
          cols="30"
          rows="10"
          v-model="meal.notes"
          @change="onChange"
        ></textarea>
      </div>
    </div>
    <div v-if="hasChanged" class="buttons">
      <button @click="$router.push('/meallist')" class="cancel">Cancel</button>
      <button class="submit" @click="saveChanges">Save</button>
    </div>
  </side-view-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import SideViewContainer from "../components/SideViewContainer.vue";
import IngredientList from "../components/IngredientList.vue";
import { useStore } from "../store";
import { Ingredient } from "typings/types";

export default defineComponent({
  setup(props) {
    const store = useStore();
    const original = store.getMealByName(props.mealname)!;
    const meal = reactive(JSON.parse(JSON.stringify(original)));
    return { store, meal, original };
  },
  components: {
    SideViewContainer,
    IngredientList,
  },
  data() {
    return {
      hasChanged: false,
    };
  },
  props: {
    mealname: {
      type: String,
      required: true,
    },
  },
  methods: {
    addNewIngredient(ingredient: Ingredient) {
      this.meal.ingredients.push(ingredient);
      this.onChange();
      const food = this.store.getFoodByName(ingredient.food);
      if (!food) return;
      this.meal.calories += food.calories * ingredient.quantity;
      this.meal.carbs += food.carbs * ingredient.quantity;
      this.meal.fats += food.fats * ingredient.quantity;
      this.meal.protein += food.protein * ingredient.quantity;
    },
    removeIngredient(ingredient: Ingredient) {
      this.meal.ingredients.splice(
        this.meal.ingredients.indexOf(ingredient),
        1
      );
      this.onChange();
      const food = this.store.getFoodByName(ingredient.food);
      if (!food) return;
      this.meal.calories -= food.calories;
      this.meal.carbs -= food.carbs;
      this.meal.fats -= food.fats;
      this.meal.protein -= food.protein;
    },
    onChange() {
      this.hasChanged = true;
      console.log("change");
    },
    saveChanges() {
      this.store.updateMeal(this.meal, this.original);
      this.$router.back();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/side-screen-styles.scss";

input,
select {
  border: none;
  background-color: whitesmoke;
  height: 30px;
  &:not(.no-border) {
    border-right: 1px solid rgba(160, 160, 160, 0.267);
  }
  &[type="number"] {
    width: 70px;
  }
}
.buttons {
  position: absolute;
  right: 15px;
  bottom: 15px;
  button {
    color: white;
    border-radius: 8px;
    padding: 10px 10px;
    border: 0;
    &.cancel {
      background-color: rgb(218, 55, 55);
      margin-right: 8px;
    }
    &.submit {
      background-color: #4c804c;
    }
  }
}
</style>
