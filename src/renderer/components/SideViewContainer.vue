<template>
  <div class="view">
    <span class="close" @click="$router.push(backroute)">&#215;</span>
    <h1 class="title">{{ title }}</h1>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title", "backroute"],
});
</script>

<style lang="scss" scoped>
.view {
  padding: 16px;
  position: relative;
  flex: 0 0 300px;
}
span.close {
  font-size: 2em;
  position: absolute;
  right: 14px;
  top: 10px;
}
</style>
