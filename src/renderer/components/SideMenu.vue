<template>
  <div class="menu-container">
    <h1 class="title">Meal Plan Analyzer</h1>
    <div class="selection">
      <router-link class="router-link" to="/tables"
        ><h3>Meal Plan</h3></router-link
      >
      <router-link class="router-link" to="/meallist"
        ><h3>Meal List</h3></router-link
      >
      <router-link class="router-link" to="/foodlist"
        ><h3>Food List</h3></router-link
      >
      <router-link to="/settings" class="settings"
        ><span class="material-icons-round">settings</span></router-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss" scoped>
.menu-container {
  position: sticky;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  flex: 0 0 300px;
  align-items: stretch;
  padding: 16px;
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.08);
  }

  h1.title {
    height: 40px;
    padding-left: 16px;
  }
  .selection {
    display: flex;
    flex-direction: column;

    .router-link {
      &:hover,
      &.router-link-active {
        background-color: rgba(119, 156, 224, 0.425);
      }
      width: 100%;
      color: black;
      border-radius: 20px;
      padding-left: 16px;
      text-decoration: none;
      h3 {
        padding: 12px 0;
      }
    }
  }
  .settings {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    color: rgb(24, 24, 24);
    border-radius: 7px;
    background-color: rgb(214, 214, 214);
    text-align: center;
    padding-top: 8px;
  }
}
</style>
