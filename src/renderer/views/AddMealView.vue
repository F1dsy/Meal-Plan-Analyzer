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
      <div class="ingredient-container">
        <ul>
          <li v-for="ingredient in ingredients" :key="ingredient.food.name">
            <span class="quantity">{{ ingredient.quantity }}</span>
            <span class="ingredientname">{{ ingredient.food.name }}</span>
          </li>
        </ul>
        <div class="unit">
          <input
            type="number"
            name=""
            id="quantity"
            v-model="selectedIngredientQuantity"
          />
          <input
            type="text"
            name=""
            id="ingredients"
            v-model="selectedIngredientName"
            @keydown.enter="addNewIngredient()"
          />
          <button class="addIngredient">+</button>
        </div>
        <div class="datalist">
          <p v-for="food in foods()" @click="selectIngredient(food)">
            {{ food.name }}
          </p>
        </div>
      </div>
    </div>
  </side-view-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SideViewContainer from "../components/SideViewContainer.vue";
import { useStore } from "../store";
import { Meal, Food } from "../typings/types";

interface CreateMeal extends Meal {
  selectedIngredientName: string;
  selectedIngredientQuantity: number;
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
    };
  },
  methods: {
    foods() {
      return this.store.data.foods;
    },
    selectIngredient(food: Food) {
      this.selectedIngredientName = food.name;
    },
    createMeal() {
      this.$router.back();
    },
    addNewIngredient() {
      const food = this.foods().find(
        (food) => food.name === this.selectedIngredientName
      );
      if (food) {
        const ingredient = {
          food: food,
          quantity: this.selectedIngredientQuantity,
        };
        this.ingredients.push(ingredient);
        this.setByIngredients(ingredient);
      }
    },
    setByIngredients(ingredient: Ingredient) {
      if (!this.calories) this.calories = 0;
      if (!this.carbs) this.carbs = 0;
      if (!this.fats) this.fats = 0;
      if (!this.protein) this.protein = 0;
      this.calories += ingredient.food.calories * ingredient.quantity;
      this.carbs += ingredient.food.carbs * ingredient.quantity;
      this.fats += ingredient.food.fats * ingredient.quantity;
      this.protein += ingredient.food.protein * ingredient.quantity;
    },
  },
});
</script>
<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
}
label {
  color: rgba(0, 0, 0, 0.75);
  margin-top: 10px;
}

div.unit {
  border: 1px solid rgba(160, 160, 160, 0.267);
  border-radius: 5px;
  span {
    padding: 0 5px;
    color: rgba(0, 0, 0, 0.85);
  }
  &:last-of-type {
    margin-bottom: 40px;
  }
}
input,
select {
  border: none;
  background-color: whitesmoke;
  height: 30px;
  &.border {
    border-right: 1px solid rgba(160, 160, 160, 0.267);
  }
  &[type="number"] {
    width: 70px;
  }
}

.ingredient-container {
  position: relative;
  padding-left: 10px;
  input#quantity {
    width: 60px;
  }

  div.unit,
  ul {
    border: none;

    span.quantity {
      margin-right: 7px;
    }

    li {
      padding: 6px 0 0 0;
      font-size: 1em;
    }
    input {
      background-color: transparent;
    }
    button.addIngredient {
      color: white;
      border-radius: 6px;
      height: 25px;
      width: 25px;
      border: 0;
      background-color: #4c804c;
    }
  }
}
.datalist {
  position: absolute;
  border-radius: 10px;
  padding: 10px 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.24);
}

// ul {
//   padding-inline-start: 40px;
// }
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
