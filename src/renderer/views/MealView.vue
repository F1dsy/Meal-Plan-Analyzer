<template>
  <side-view-container :title="meal.name" backroute="/meallist">
    <div class="input-container">
      <label for="name" class="name">Title:</label>
      <div class="unit">
        <input type="text" name="name" id="name" v-model="meal.name" />
      </div>
      <label for="calories" class="name">Calories:</label>
      <div class="unit">
        <input
          type="number"
          name="calories"
          id="calories"
          v-model="meal.calories"
          class="border"
        /><span><span>kcal</span></span>
      </div>
      <label for="carbs" class="name">Carbs:</label>
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
      <label for="fats" class="name">Fats:</label>
      <div class="unit">
        <input
          type="number"
          name="fats"
          id="fats"
          v-model="meal.fats"
          class="border"
        /><span>g</span>
      </div>
      <label for="protein" class="name">Protein:</label>
      <div class="unit">
        <input
          type="number"
          name="protein"
          id="protein"
          v-model="meal.protein"
          class="border"
        /><span>g</span>
      </div>
      <label for="unitScale" class="name">Unit Scale:</label>
      <div class="unit">
        <select name="unitScale" id="unitScale" v-model="meal.unitScale">
          <option v-for="option in options" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <label for="category" class="name">Category:</label>
      <div class="unit">
        <input type="text" name="" id="category" v-model="meal.category" />
      </div>
      <div v-if="hasChanged" class="buttons">
        <button @click="$router.push('/meallist')" class="cancel">
          Cancel
        </button>
        <button class="submit" @click="saveChanges">Save</button>
      </div>
    </div>
  </side-view-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import SideViewContainer from "../components/SideViewContainer.vue";
import { useStore } from "../store";

export default defineComponent({
  setup(props) {
    const store = useStore();
    const original = store.getFoodByName(props.mealname)!;
    const meal = reactive({ ...original });
    return { store, meal, original };
  },
  components: {
    SideViewContainer,
  },
  data() {
    return {
      styles: "width: 500px;",
      hasChanged: false,
    };
  },
  props: ["mealname"],
  computed: {
    options(): any {
      return this.store.config?.unitScales;
    },
  },
  methods: {
    onChange() {
      this.hasChanged = true;
      console.log("change");
    },
    saveChanges() {
      //   this.store.updateFood(this.meal as Meal, this.original);
      this.$router.back();
    },
  },
});
</script>

<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-bottom: 40px;
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
