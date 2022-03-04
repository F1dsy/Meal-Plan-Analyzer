<template>
  <div class="view-container">
    <h1>{{ $route.name }}</h1>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ipcRenderer } from "../electron";
import { Config, Data } from "../typings/types";

export default defineComponent({
  data(): { data: Data | null; config: Config | null } {
    return {
      data: null,
      config: null,
    };
  },
  async created() {
    this.data = await ipcRenderer.invoke("data");
    this.config = await ipcRenderer.invoke("config");
  },
});
</script>

<style scoped lang="scss">
.view-container {
  flex-grow: 1;
  padding: 5px;
  h1 {
    font-size: 2em;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  padding: 15px 5px;
  position: relative;
  h6 {
    width: 100%;
    font-weight: bold;
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
  padding: 5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  h6,
  p {
    width: 100%;
    padding: 10px 0;
  }
}
</style>
