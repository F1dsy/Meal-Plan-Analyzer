<template>
  <side-view-container title="Add New Food" backroute="/foodlist">
    <div class="input-container">
      <label for="name">Title:</label>
      <div class="unit">
        <input type="text" name="name" id="name" v-model="name" />
      </div>
      <label for="calories">Calories:</label>
      <div class="unit">
        <input
          type="number"
          name="calories"
          id="calories"
          v-model="calories"
          class="border"
        /><span><span>kcal</span></span>
      </div>
      <label for="carbs">Carbs:</label>
      <div class="unit">
        <input
          type="number"
          name="carbs"
          id="carbs"
          v-model="carbs"
          class="border"
        /><span>g</span>
      </div>
      <label for="fats">Fats:</label>
      <div class="unit">
        <input
          type="number"
          name="fats"
          id="fats"
          v-model="fats"
          class="border"
        /><span>g</span>
      </div>
      <label for="protein">Protein:</label>
      <div class="unit">
        <input
          type="number"
          name="protein"
          id="protein"
          v-model="protein"
          class="border"
        /><span>g</span>
      </div>
      <label for="unitScale">Unit Scale:</label>
      <div class="unit">
        <select name="unitScale" id="unitScale">
          <option v-for="option in options" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
      <label for="category">Category:</label>
      <div class="unit">
        <input type="text" name="" id="category" v-model="category" />
      </div>
      <div class="compound-box">
        <label for="compound">Compound: </label>
        <input type="checkbox" name="" id="compound" v-model="isCompound" />
      </div>
    </div>
    <!-- <div class="buttons">
      <button @click="$router.push('/foodlist')" class="cancel">Cancel</button>
      <button @click="createFood()" class="submit">Create</button>
    </div>
    <span v-if="missingField">There is a field missing.</span> -->
  </side-view-container>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import SideViewContainer from "../components/SideViewContainer.vue";
import { useStore } from "../store";
import { Food } from "../typings/types";

interface CreateFood extends Food {
  missingField: boolean;
  isCompound: boolean;
}

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
  data(): CreateFood {
    return {
      missingField: false,
      name: "",
      calories: 0,
      carbs: 0,
      fats: 0,
      protein: 0,
      unit: "",
      scale: 100,
      category: "",
      isCompound: false,
      ingredients: undefined,
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
        // this.store.addNewFood({
        //   name: this.name,
        //   calories: this.calories,
        //   carbs: this.carbs,
        //   fats: this.fats,
        //   protein: this.protein,
        //   unit: this.unitScale,
        //   category: this.category,
        // });

        this.$router.back();
      }
    },
  },
});
</script>
<style lang="scss" scoped>
@import "../styles/add-screen-styles.scss";
.compound-box {
  display: flex;
  align-items: center;
  label {
    margin: 0;
    margin-right: 5px;
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
