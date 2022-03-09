<template>
  <dialog-vue :styles="styles">
    <h1 class="title">{{ foodname }}</h1>
    <div class="input-container">
      <label for="name" class="name">Title:</label>
      <div class="unit">
        <input type="text" name="name" id="name" v-model="foodname" />
      </div>
      <label for="calories" class="name">Calories:</label>
      <div class="unit">
        <input
          type="number"
          name="calories"
          id="calories"
          v-model="food.calories"
          class="border"
        /><span><span>kcal</span></span>
      </div>
      <label for="carbs" class="name">Carbs:</label>
      <div class="unit">
        <input
          type="number"
          name="carbs"
          id="carbs"
          v-model="food.carbs"
          class="border"
        /><span>g</span>
      </div>
      <label for="fats" class="name">Fats:</label>
      <div class="unit">
        <input
          type="number"
          name="fats"
          id="fats"
          v-model="food.fats"
          class="border"
        /><span>g</span>
      </div>
      <label for="protein" class="name">Protein:</label>
      <div class="unit">
        <input
          type="number"
          name="protein"
          id="protein"
          v-model="food.protein"
          class="border"
        /><span>g</span>
      </div>
      <label for="unitScale" class="name">Unit Scale:</label>
      <div class="unit">
        <select name="unitScale" id="unitScale" v-model="food.unitScale">
          <option v-for="option in options" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <label for="category" class="name">Category:</label>
      <div class="unit">
        <input type="text" name="" id="category" v-model="food.category" />
      </div>
    </div>
  </dialog-vue>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DialogVue from "../components/Dialog.vue";
import { Food } from "../typings/types";

export default defineComponent({
  components: {
    DialogVue,
  },
  data() {
    return {
      styles: "width: 500px;",
      food: null,
    };
  },
  props: ["foodname"],
  computed: {
    food(): Food {
      return this.$store.getters.getFoodByName(this.foodname);
    },
    options(): any {
      return this.$store.state.config!.unitScales;
    },
  },
});
</script>
<style lang="scss">
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
}

label.name {
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
  &:not(.no-border) {
    border-right: 1px solid rgba(160, 160, 160, 0.267);
  }
  &[type="number"] {
    width: 70px;
  }
}
</style>
