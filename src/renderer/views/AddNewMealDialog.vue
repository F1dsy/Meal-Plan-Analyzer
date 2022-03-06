<template>
  <Dialog :styles="styles">
    <h1 class="title">Add New Meal</h1>

    <div class="input-container">
      <label for="name" class="name">Title:</label>
      <label for="name" class="unit">
        <input
          type="text"
          name="name"
          id="name"
          v-model="name"
          class="no-border"
        />
      </label>
      <label for="calories" class="name">Calories:</label>
      <label for="calories" class="unit">
        <input
          type="number"
          name="calories"
          id="calories"
          v-model="calories"
        /><span><span>kcal</span></span>
      </label>
      <label for="carbs" class="name">Carbs:</label>
      <label for="carbs" class="unit">
        <input type="number" name="carbs" id="carbs" v-model="carbs" /><span
          >g</span
        >
      </label>
      <label for="fats" class="name">Fats:</label>
      <label for="fats" class="unit">
        <input type="number" name="fats" id="fats" v-model="fats" /><span
          >g</span
        >
      </label>
      <label for="protein" class="name">Protein:</label>
      <label for="protein" class="unit">
        <input
          type="number"
          name="protein"
          id="protein"
          v-model="protein"
        /><span>g</span>
      </label>
      <label for="unitScale" class="unit"> </label>
      <label for="category" class="name">Category:</label>
      <label for="category" class="unit">
        <input type="text" name="" id="category" class="no-border" />
      </label>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dialog from "../components/Dialog.vue";

export default defineComponent({
  components: { Dialog },
  data() {
    return {
      styles: `width: 500px;`,
      name: null,
      calories: null,
      carbs: null,
      fats: null,
      protein: null,
    };
  },
  methods: {
    createMeal() {
      this.$store.dispatch("addNewMeal", {
        name: this.name,
        calories: this.calories,
        carbs: this.carbs,
        fats: this.fats,
        protein: this.protein,
      });
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
  width: 300px;
  label.name {
    color: rgba(0, 0, 0, 0.75);
    margin-top: 10px;
  }
  label.unit {
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
