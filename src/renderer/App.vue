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
  created() {
    this.$store.dispatch("init");
  },
});
</script>

<style lang="scss">
@import "./styles/style-reset.css";
@import "./styles/global-styles.scss";
#app {
  display: flex;
  width: 100%;
  height: 100vh;
  font-family: "Roboto", sans-serif;
}
</style>
