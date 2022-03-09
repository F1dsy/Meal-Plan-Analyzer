<template>
  <dialog-vue @click="(e) => focusOut(e)">
    <h1 class="title">Add New Meal Plan</h1>
    <div class="input-container">
      <table>
        <tr v-for="row in numRows" :key="row">
          <td v-for="column in 7" :key="column" ref="input">
            <input
              type="text"
              v-model="inputData[column - 1][row - 1]"
              @focusin="
                focusIn(
                  column - 1 + 7 * (row - 1),
                  inputData[column - 1][row - 1]
                )
              "
              @keyup="(e) => filterMeals(e)"
            />
            <div
              class="datalist"
              :class="{
                focus: focusIndex == column - 1 + 7 * (row - 1),
              }"
            >
              <p
                v-for="meal in meals()"
                :key="meal"
                @click="selectDataFromList(meal, column - 1, row - 1)"
              >
                {{ meal }}
              </p>
            </div>
          </td>
          <td>
            <button @click="decreaseNumRows(row - 1)" :disabled="numRows <= 3">
              <span class="material-icons-round">remove</span>
            </button>
          </td>
        </tr>
      </table>
      <div class="adjust-rows">
        <button @click="increaseNumRows" :disabled="numRows >= 6">
          <span class="material-icons-round">add</span>
        </button>
      </div>
    </div>
  </dialog-vue>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DialogVue from "../components/Dialog.vue";

export default defineComponent({
  components: {
    DialogVue,
  },
  data(): {
    numRows: number;
    inputData: string[][];
    focusIndex: any;
    filterWord: string;
  } {
    return {
      numRows: 3,
      inputData: [[], [], [], [], [], [], []],
      focusIndex: -1,
      filterWord: "",
    };
  },

  methods: {
    meals() {
      const meals = this.$store.state.data.meals.map((e) => {
        return e.name;
      });
      return meals.filter((meal) => meal.includes(this.filterWord));
    },
    increaseNumRows() {
      if (this.numRows >= 6) return;
      this.numRows++;
    },
    decreaseNumRows(rowIndex: number) {
      if (this.numRows <= 3) return;
      this.inputData.forEach((column) => {
        column.splice(rowIndex, 1);
      });
      this.numRows--;
    },
    selectDataFromList(meal: string, col: number, row: number) {
      this.inputData[col][row] = meal;
      this.focusIndex = -1;
    },
    focusIn(index: number, data: string) {
      this.focusIndex = index;
      if (!data) {
        this.filterWord = "";
      } else {
        this.filterWord = data;
      }
    },
    focusOut(event: MouseEvent) {
      if (this.focusIndex == -1) return;
      if (
        !(this.$refs.input as HTMLTableCellElement[])[this.focusIndex].contains(
          event.target as Node
        )
      ) {
        this.focusIndex = -1;
      }
    },
    filterMeals(e: KeyboardEvent) {
      this.filterWord = (e.target as HTMLInputElement).value;
    },
  },
});
</script>

<style lang="scss" scoped>
.title {
  height: 40px;
}
table {
  width: 100%;
}

th {
  font-weight: bold;
  text-align: left;
}
th,
td {
  border: 0.5px solid rgb(110, 110, 110);
  border-spacing: 0;
  vertical-align: middle;
  position: relative;
  &:last-child {
    border: 0;
    padding-left: 5px;
  }
}

input {
  width: 100%;
  line-height: 40px;
  background-color: transparent;
  border: none;
  padding: 0;
  outline-color: rgb(63, 63, 63);
  appearance: none;
  z-index: 0;
}
div.datalist {
  display: none;
  position: absolute;
  margin-top: 2px;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.24);
  z-index: 1;
  cursor: pointer;
  height: 350px;
  overflow-y: auto;
  &.focus {
    display: block;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  p:hover {
    background-color: rgba(80, 80, 80, 0.3);
  }
}

.adjust-rows {
  text-align: center;
  padding-top: 8px;
}

button {
  border: 0;
  width: 26px;
  height: 26px;
  border-radius: 16px;
  padding: 0;
  background-color: rgb(97, 97, 97);
  color: white;
  &:disabled {
    opacity: 0.4;
  }
  span {
    vertical-align: middle;
  }
}
</style>
