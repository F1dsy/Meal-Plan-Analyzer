<template>
  <side-view-container :title="food.name" backroute="/foodlist">
    <div class="input-container">
      <label for="name" class="name">Title:</label>
      <div class="input">
        <input type="text" name="name" id="name" v-model="food.name" />
      </div>
      <label for="calories" class="name">Calories:</label>
      <div class="input">
        <input
          type="number"
          name="calories"
          id="calories"
          v-model="food.calories"
          class="border"
        /><span><span>kcal</span></span>
      </div>
      <label for="carbs" class="name">Carbs:</label>
      <div class="input">
        <input
          type="number"
          name="carbs"
          id="carbs"
          v-model="food.carbs"
          class="border"
          @change="onChange"
        /><span>g</span>
      </div>
      <label for="fats" class="name">Fats:</label>
      <div class="input">
        <input
          type="number"
          name="fats"
          id="fats"
          v-model="food.fats"
          class="border"
        /><span>g</span>
      </div>
      <label for="protein" class="name">Protein:</label>
      <div class="input">
        <input
          type="number"
          name="protein"
          id="protein"
          v-model="food.protein"
          class="border"
        /><span>g</span>
      </div>
      <label for="unit" class="name">Unit:</label>
      <div class="input">
        <select name="unit" id="unit" v-model="food.unit">
          <option v-for="[key] in store.config!.units" :value="key">
            {{ key }}
          </option>
        </select>
      </div>
      <label for="category" class="name">Category:</label>
      <div class="input">
        <input type="text" name="" id="category" v-model="food.category" />
      </div>
    </div>
    <div v-if="hasChanged" class="buttons">
      <button @click="$router.push('/foodlist')" class="cancel">Cancel</button>
      <button class="submit" @click="saveChanges">Save</button>
    </div>
  </side-view-container>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import SideViewContainer from "../components/SideViewContainer.vue";
import { useStore } from "../store";
import { Food } from "../typings/types";

export default defineComponent({
  setup(props) {
    const store = useStore();
    const original = store.getFoodByName(props.foodname)!;
    const food = reactive({ ...original });
    return { store, food, original };
  },
  components: {
    SideViewContainer,
  },
  data() {
    return {
      hasChanged: false,
    };
  },
  props: ["foodname"],
  methods: {
    onChange() {
      this.hasChanged = true;
      console.log("change");
    },
    saveChanges() {
      this.store.updateFood(this.food as Food, this.original);
      this.$router.back();
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/side-screen-styles.scss";
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

.buttons {
  position: absolute;
  right: 15px;
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
