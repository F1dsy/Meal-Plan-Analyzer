<template>
  <Dialog :styles="styles">
    <h1 class="title">Hii</h1>
    <div class="input-container">
      <input type="text" name="title" id="name" />
      <input type="number" name="calories" id="name" />
      <input type="number" name="carbs" id="name" />
      <input type="number" name="fats" id="name" />
      <input type="number" name="protein" id="name" />
    </div>
    <button>Create</button>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Dialog from "../components/Dialog.vue";

export default defineComponent({
  components: { Dialog },
  data() {
    return {
      styles: `width: 500px;`,
    };
  },
});
</script>
<style lang="scss" scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
