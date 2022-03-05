<template>
  <div class="view-container" v-if="$store.state.hasLoaded">
    <div class="view-header">
      <h1 class="title">Meal List</h1>
      <router-link class="button" to="/meallist/addNewMeal">New</router-link>
    </div>
    <div class="list-container">
      <div class="list-item" v-for="item in foods">
        <h6>{{ item }}</h6>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

enum SortBy {
  name,
  calories,
  carbs,
  fats,
  protein,
}

export default defineComponent({
  data() {
    return {
      ascending: true,
      sortBy: 0,
    };
  },
  computed: {
    foods() {
      return this.$store.state.data.foods;
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
    align-items: center;
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
    min-width: 450px;
    .header {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      padding: 12px 10px;
      position: relative;
      .header-item {
        font-weight: bold;
        flex: 1 1 0;
        display: flex;
        align-items: center;
        height: 24px;
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
