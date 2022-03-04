<template>
  <div class="menu-container">
    <h1 class="title">Meal Plan Analyzer</h1>
    <div class="selection">
      <router-link class="router-link" to="/"><h3>Meal Plan</h3></router-link>
      <router-link class="router-link" to="/meallist"
        ><h3>Meal List</h3></router-link
      >
      <!-- <router-link to="/foodlist">Food List</router-link> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-container {
  position: relative;
  display: flex;
  align-items: center;
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
}
</style>
