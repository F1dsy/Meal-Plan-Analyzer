<template>
  <side-view-container title="Add New Food" backroute="/foodlist">
    <div class="input-container">
      <label for="name" class="name">Title:</label>
      <label for="name" class="unit">
        <input
          type="text"
          name="name"
          id="name"
          v-model="name"
          class="no-border"
        />
      </label>
      <label for="calories" class="name">Calories:</label>
      <label for="calories" class="unit">
        <input
          type="number"
          name="calories"
          id="calories"
          v-model="calories"
        /><span><span>kcal</span></span>
      </label>
      <label for="carbs" class="name">Carbs:</label>
      <label for="carbs" class="unit">
        <input type="number" name="carbs" id="carbs" v-model="carbs" /><span
          >g</span
        >
      </label>
      <label for="fats" class="name">Fats:</label>
      <label for="fats" class="unit">
        <input type="number" name="fats" id="fats" v-model="fats" /><span
          >g</span
        >
      </label>
      <label for="protein" class="name">Protein:</label>
      <label for="protein" class="unit">
        <input
          type="number"
          name="protein"
          id="protein"
          v-model="protein"
        /><span>g</span>
      </label>
      <label for="unitScale" class="name">Unit Scale:</label>
      <label for="unitScale" class="unit">
        <select
          name="unitScale"
          id="unitScale"
          v-model="unitScale"
          class="no-border"
        >
          <option v-for="option in options" :value="option">
            {{ option }}
          </option>
        </select>
      </label>
      <label for="category" class="name">Category:</label>
      <label for="category" class="unit">
        <input
          type="text"
          name=""
          id="category"
          class="no-border"
          v-model="category"
        />
      </label>
    </div>
    <div class="buttons">
      <button @click="$router.push('/foodlist')" class="cancel">Cancel</button>
      <button @click="createFood()" class="submit">Create</button>
    </div>
    <span v-if="missingField">There is a field missing.</span>
  </side-view-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import SideViewContainer from "../components/SideViewContainer.vue";
import { useStore } from "../store";

export default defineComponent({
  setup() {
    const store = useStore();
    let unitScale = ref(store.config!.unitScales[0]);
    const options = computed(() => {
      return store.config!.unitScales;
    });
    return { store, options, unitScale };
  },
  components: { SideViewContainer },
  data() {
    return {
      styles: `width: 900px;`,
      missingField: false,
      name: null,
      calories: null,
      carbs: null,
      fats: null,
      protein: null,
      category: null,
    };
  },
  // computed: {
  //   options: () => {
  //     return this.store.config?.unitScales;
  //   },
  // },
  methods: {
    createFood() {
      if (
        !(
          this.name &&
          this.calories &&
          this.carbs &&
          this.fats &&
          this.protein &&
          this.unitScale &&
          this.category
        )
      ) {
        this.missingField = true;
        return;
      } else {
        this.store.addNewFood({
          name: this.name,
          calories: this.calories,
          carbs: this.carbs,
          fats: this.fats,
          protein: this.protein,
          unitScale: this.unitScale,
          category: this.category,
        });

        this.$router.back();
      }
    },
  },
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
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding-bottom: 40px;
  label.name {
    color: rgba(0, 0, 0, 0.75);
    margin-top: 10px;
  }
  label.unit {
    border: 1px solid rgba(160, 160, 160, 0.267);
    border-radius: 5px;
    span {
      padding: 0 5px;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  input,
  select {
    border: none;
    background-color: whitesmoke;
    height: 30px;
    &:not(.no-border) {
      border-right: 1px solid rgba(160, 160, 160, 0.267);
    }
    &[type="number"] {
      width: 70px;
    }
  }
}
.buttons {
  position: absolute;
  right: 15px;

  button {
    color: white;
    border-radius: 8px;
    padding: 10px 10px;
    border: 0;
    &.cancel {
      background-color: rgb(218, 55, 55);
      margin-right: 8px;
    }
    &.submit {
      background-color: #4c804c;
    }
  }
}
</style>
