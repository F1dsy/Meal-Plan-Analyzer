<template>
  <label for="ingredients">Ingredients:</label>
  <ul class="ingredient-list">
    <li v-for="ingredient in ingredients" :key="ingredient.food">
      <span class="quantity"
        >{{ ingredient.quantity }} {{ ingredient.unit }}&nbsp;</span
      >
      <span class="ingredientname">{{ ingredient.food }}</span>
      <button @click="removeIngredient(ingredient)">
        <span class="material-icons-round">remove</span>
      </button>
    </li>
  </ul>
  <div class="ingredient-input-container">
    <div class="input">
      <input type="text" id="quantity" v-model="selectedIngredientQuantity" />
      <select name="unit" id="unit" v-model="selectedIngredientUnit">
        <option v-for="val in units" :value="val.name">
          {{ val.name }}
        </option>
      </select>
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
</template>

<script lang="ts">
import { useStore } from "../store";
import { defineComponent, PropType } from "vue";
import { Food, Ingredient } from "../typings/types";

interface Data {
  selectedIngredientName: string;
  selectedIngredientUnit: string;
  selectedIngredientQuantity: string;
  isSelectingIngredient: boolean;
}

export default defineComponent({
  setup() {
    const store = useStore();
    for (const val of store.config!.units.entries()) {
      console.log(val);
    }
    return { store };
  },
  data(): Data {
    return {
      selectedIngredientUnit: "",
      // selectedIngredientUnitType: "",
      selectedIngredientName: "",
      selectedIngredientQuantity: "1",
      isSelectingIngredient: false,
    };
  },
  props: {
    ingredients: {
      type: Object as PropType<Ingredient[]>,
    },
    addIngredient: {
      type: Function,
      required: true,
    },
    removeIngredient: {
      type: Function,
      required: true,
    },
  },
  computed: {
    foods(): any {
      const foods = this.store.data.foods;
      return foods.filter((food) =>
        food.name.includes(this.selectedIngredientName)
      );
    },

    units(): { name: string; weight: number }[] {
      return Array.from(this.store.config!.units.values()).reduce((pre, nex) =>
        pre.concat(nex)
      );
    },
  },
  methods: {
    selectIngredient(food: Food) {
      this.isSelectingIngredient = false;
      this.selectedIngredientName = food.name;
      // this.selectedIngredientUnitType = food.unit;
    },
    addNewIngredient() {
      const ingredient = {
        food: this.selectedIngredientName,
        quantity: this.selectedIngredientQuantity,
        unit: this.selectedIngredientUnit,
      };
      this.addIngredient(ingredient);
      this.selectedIngredientName = "";
      this.selectedIngredientQuantity = "";
      // this.selectedIngredientUnitKey = "";
      // this.selectedIngredientUnit = "";
    },
    clickHandler(e: MouseEvent) {
      this.isSelectingIngredient = (
        this.$refs.ingredientInput as HTMLDivElement
      ).contains(e.target as Node);
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
@import "../styles/side-screen-styles.scss";
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

.ingredient-input-container {
  display: flex;
  align-items: center;

  div.input {
    display: flex;
    align-items: center;
    background-color: whitesmoke;
    max-width: 200px;
  }
  input,
  select {
    width: 100%;
  }
}
input#quantity {
  flex: 1;
}
select#unit {
  flex: 2;
}
.ingredient-input {
  display: inline-block;
  position: relative;
  flex: 4;
}

button.addIngredient {
  color: white;
  border-radius: 6px;
  padding: 0;
  background-color: #4c804c;
  margin-left: 5px;
  &:disabled {
    opacity: 0.4;
  }
}
.datalist {
  position: absolute;
  border-radius: 10px;
  top: 35px;
  padding: 5px;
  background-color: white;
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.24);
  p {
    &:hover {
      background-color: rgba(80, 80, 80, 0.1);
    }
    padding: 3px 20px;
    border-radius: 4px;
  }
}
</style>
