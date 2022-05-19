<template>
  <div class="view-container">
    <div class="view-header">
      <h1 class="title">Settings</h1>
    </div>
    <h3>Language</h3>
    <h3>Color Theme</h3>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "../store";

export default defineComponent({
  setup() {
    const store = useStore();

    return store;
  },
});
</script>

<style lang="scss">
@import "../styles/list-view-styles.scss";
</style>
