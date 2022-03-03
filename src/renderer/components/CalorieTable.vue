<template>
  <div class="table" v-if="data != null">
    <table>
      <tr></tr>
      <tr></tr>
      <tr></tr>
      <tr></tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getDaysCalories } from "../helpers/GetDaysData";
export default defineComponent({
  props: {
    data: String,
  },
  computed: {
    getCaloriesList() {
      return getDaysCalories(this.data.table[0], this.data.meals);
    },
  },
});
</script>

<style></style>
