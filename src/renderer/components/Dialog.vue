<template>
  <div class="dialog-background">
    <div class="dialog-container">
     
      <span class="close" @click="$emit('close')">&#215</span>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({

}); 
</script>

<style lang="scss" scoped>
.dialog-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.25);
  .dialog-container {
    background-color: whitesmoke;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    padding: 25px;
    position: relative;
  
    span.close{
        font-size: 2em;
        position: absolute;
        right: 14px;
        top: 10px;
    }
  }
}
</style>
