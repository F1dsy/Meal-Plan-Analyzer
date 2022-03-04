<template>
  <div class="view-container">
    <div class="view-header">
      <h1 class="title">{{ $route.name }}</h1>
      <router-link class="button" to="/meallist/addNewMeal">New</router-link>
    </div>
    <div class="list-container" v-if="data != null">
      <div class="header">
        <h6>Name</h6>
        <h6>Calories</h6>
        <h6>Carbs</h6>
        <h6>Fats</h6>
        <h6>Protein</h6>
      </div>
      <div class="list-item" v-for="item in data.meals">
        <h6>{{ item.name }}</h6>
        <p>{{ item.calories }}</p>
        <p>{{ item.carbs }}</p>
        <p>{{ item.fat }}</p>
        <p>{{ item.protein }}</p>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    data() {
      return this.$store.state.data;
    },
  },
});
</script>

<style scoped lang="scss">
.view-container {
  flex-grow: 1;
  padding: 16px;
  .view-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: flex-start;
    .button {
      color: white;
      text-decoration: none;
      background-color: rgb(76, 128, 76);
      border-radius: 8px;
      width: 60px;
      text-align: center;
      padding: 10px 0;
    }
  }
  .list-container {
    width: 100%;
    .header {
      display: flex;
      justify-content: space-between;
      padding: 12px 10px;
      position: relative;
      h6 {
        font-weight: bold;
        flex: 1 1 0;
        &:first-child {
          flex-grow: 2;
        }
      }
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.5px;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
    .list-item {
      display: flex;
      justify-content: space-between;
      border-radius: 5px;
      padding: 10px;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      h6,
      p {
        padding: 10px 0;
        flex: 1 1 0;
      }
      h6 {
        flex-grow: 2;
      }
    }
  }
}
</style>
