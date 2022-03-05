<template>
  <Dialog :styles="styles">
    <h1 class="title">Add New Meal</h1>

    <form @submit.prevent="createMeal()" class="input-container">
      <input type="text" name="title" id="name" v-model="name" />
      <input type="number" name="calories" id="name" v-model="calories" />
      <input type="number" name="carbs" id="name" v-model="carbs" />
      <input type="number" name="fats" id="name" v-model="fats" />
      <input type="number" name="protein" id="name" v-model="protein" />
      <input type="submit" value="Create" />
    </form>
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
      this.$store.commit("addNewMeal", {
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
}
</style>
