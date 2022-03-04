<template>
  <div id="app" v-if="data != null && config != null">
    <header class="app-header">
      <h1 class="title">Meal Plan</h1>
      <div class="selection">
        <button class="meals" @click="showMeals = !showMeals">Meals</button>
        <button class="foods" @click="showFoods = !showFoods">Foods</button>
      </div>
    </header>
    <meal-table :data="data" />
    <calorie-table :data="data" :config="config" />
    <div class="dialogs">
      <Dialog v-if="showMeals" @close="showMeals = !showMeals"
        ><h1>Meals</h1></Dialog
      >
      <Dialog v-if="showFoods" @close="showFoods = !showFoods">
        <h1>Foods</h1></Dialog
      >
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MealTable from "./components/MealTable.vue";
import CalorieTable from "./components/CalorieTable.vue";
import Dialog from "./components/Dialog.vue";
import { ipcRenderer } from "./electron";

export default defineComponent({
  name: "app",
  components: {
    MealTable,
    CalorieTable,
    Dialog,
  },
  data() {
    return {
      data: null,
      config: null,
      showMeals: false,
      showFoods: false,
    };
  },
  async created() {
    this.data = await ipcRenderer.invoke("data");
    this.config = await ipcRenderer.invoke("config");
  },
});
</script>

<style lang="scss">
@import "./public/style-reset.css";
body {
  font-family: "Roboto", sans-serif;
  padding: 20px;
}
header.app-header {
  display: flex;
  justify-content: space-between;
  h1.title {
    font-size: 2em;
  }
}
.table {
  padding-bottom: 15px;
  min-width: 650px;
  table {
    table-layout: fixed;
    width: 100%;
    border: 0.5px solid rgb(110, 110, 110);

    tr {
      th {
        font-weight: bold;
        text-align: left;
      }
    }
  }
}
th,
td {
  border: 0.5px solid rgb(110, 110, 110);
  padding: 5px;
  border-spacing: 0;
  vertical-align: middle;
}
.dialogs {
  h1 {
    font-size: 2em;
  }
}
</style>
