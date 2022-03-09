<template>
  <dialog-vue>
    <h1 class="title">Food</h1>
    <h1 class="title">{{ food }}</h1>
    <h1 class="title">{{ getFood.calories }}</h1>
  </dialog-vue>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import DialogVue from "../components/Dialog.vue";
import { Food } from "../typings/types";

export default defineComponent({
  components: {
    DialogVue,
  },
  props: ["food"],
  computed: {
    getFood(): Food {
      return this.$store.getters.getFoodByName(this.food);
    },
  },
});
</script>
