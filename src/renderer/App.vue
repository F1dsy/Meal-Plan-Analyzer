<template>
  <side-menu></side-menu>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import SideMenu from "./components/SideMenu.vue";

export default defineComponent({
  name: "app",
  components: {
    SideMenu,
  },
});
</script>

<style lang="scss">
@import "./public/style-reset.css";

#app {
  display: flex;
  width: 100%;
  font-family: "Roboto", sans-serif;
  padding: 20px;
}
</style>
