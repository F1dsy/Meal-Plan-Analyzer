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
      <label for="ingredients">Ingredients:</label>
      <ul class="ingredient-list">
        <li v-for="ingredient in ingredients" :key="ingredient.food.name">
          <span class="quantity">{{ ingredient.quantity }}</span>
          <span class="ingredientname">{{ ingredient.food.name }}</span>
          <button @click="removeIngredient(ingredient)">
            <span class="material-icons-round">remove</span>
          </button>
        </li>
      </ul>
      <div
        class="ingredient-input-container"
        @keydown.enter="addNewIngredient()"
      >
        <div class="unit">
          <input
            type="number"
            name=""
            id="quantity"
            v-model="selectedIngredientQuantity"
            class="border"
          />
          <div class="ingredient-input" ref="ingredientInput">
            <input
              type="text"
              name=""
              id="ingredients"
              v-model="selectedIngredientName"
            />
            <div class="datalist" v-if="isSelectingIngredient">
              <p v-for="food in foods" @click="selectIngredient(food)">
                {{ food.name }}
              </p>
            </div>
          </div>
        </div>
        <button
          class="addIngredient"
          @click="addNewIngredient()"
          :disabled="!selectedIngredientName"
        >
          <span class="material-icons-round">add</span>
        </button>
      </div>
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
          @input="logInput"
          v-model="notes"
        ></textarea>
      </div>
    </div>
  </side-view-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideViewContainer from "../components/SideViewContainer.vue";
import { useStore } from "../store";
import { Meal, Food, Ingredient } from "../typings/types";

interface CreateMeal extends Meal {
  selectedIngredientName: string;
  selectedIngredientQuantity: number;
  isSelectingIngredient: boolean;
}

export default defineComponent({
  setup() {
    const store = useStore();
    return { store };
  },
  components: { SideViewContainer },
  data(): CreateMeal {
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
      selectedIngredientName: "",
      selectedIngredientQuantity: 1.0,
      isSelectingIngredient: false,
    };
  },
  computed: {
    foods(): any {
      const foods = this.store.data.foods;
      return foods.filter((food) =>
        food.name.includes(this.selectedIngredientName)
      );
    },
  },
  methods: {
    selectIngredient(food: Food) {
      this.isSelectingIngredient = false;
      this.selectedIngredientName = food.name;
    },
    createMeal() {
      this.$router.back();
    },
    addNewIngredient() {
      const food = this.store.data.foods.find(
        (food) => food.name === this.selectedIngredientName
      );
      if (food) {
        const ingredient = {
          food: food,
          quantity: this.selectedIngredientQuantity,
        };
        this.ingredients.push(ingredient);
        this.calories += ingredient.food.calories * ingredient.quantity;
        this.carbs += ingredient.food.carbs * ingredient.quantity;
        this.fats += ingredient.food.fats * ingredient.quantity;
        this.protein += ingredient.food.protein * ingredient.quantity;
        this.selectedIngredientName = "";
        this.selectedIngredientQuantity = 1;
      }
    },
    removeIngredient(ingredient: Ingredient) {
      this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
      this.calories -= ingredient.food.calories;
      this.carbs -= ingredient.food.carbs;
      this.fats -= ingredient.food.fats;
      this.protein -= ingredient.food.protein;
    },
    clickHandler(e: MouseEvent) {
      this.isSelectingIngredient = (
        this.$refs.ingredientInput as HTMLDivElement
      ).contains(e.target as Node);
    },
    logInput() {
      console.log(this.$data);
    },
  },
  unmounted() {
    window.removeEventListener("click", this.clickHandler);
  },
  mounted() {
    window.addEventListener("click", this.clickHandler);
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/add-screen-styles.scss";

.ingredient-input-container {
  display: flex;
  align-items: center;
}
.ingredient-input {
  display: inline-block;
  position: relative;
}

li {
  &:hover button {
    opacity: 1;
  }
  padding: 6px 0 6px 0;
  font-size: 1em;
  button {
    vertical-align: middle;
    transition: opacity 0.3s;
    opacity: 0;
    border-radius: 10px;
    padding: 0;
  }
}
span.quantity {
  margin-right: 7px;
}

.buttons {
  position: absolute;
  right: 15px;
  bottom: 15px;
  button {
    color: white;
    border-radius: 8px;
    padding: 10px 10px;
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
