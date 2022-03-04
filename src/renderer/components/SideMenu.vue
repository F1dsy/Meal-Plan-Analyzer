<template>
  <div class="menu-container">
    <h1 class="title">Meal Plan Analyzer</h1>
    <div class="selection">
      <router-link to="/">Meal Plan</router-link>
      <router-link to="/meallist">Meal List</router-link>
      <router-link to="/foodlist">Food List</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 0 0 200px;
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
    font-size: 1.2em;
  }
  .selection {
    display: flex;
    flex-direction: column;
  }
}
</style>
