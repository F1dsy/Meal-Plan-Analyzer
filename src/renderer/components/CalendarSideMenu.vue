<template>
  <div class="side-container">
    <div class="draggable">
      <span>1</span>
    </div>
    <div class="draggable">
      <span>2</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss">
.side-container {
  width: 300px;
  height: 100%;
  .draggable {
    width: 200px;
    height: 80px;
    background-color: rgb(148, 148, 148);
    &.endDrag {
      transition: transform 500ms ease;
    }
  }
}
</style>
