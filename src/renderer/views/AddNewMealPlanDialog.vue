<template>
  <dialog-vue>
    <h1 class="title">Add New Meal Plan</h1>
    <div class="input-container">
      <table>
        <tr v-for="row in numRows" :key="row">
          <td v-for="column in 7" :key="column">
            <input type="text" v-model="inputData[column - 1][row - 1]" />
          </td>

          <button @click="decreaseNumRows(row - 1)">
            <span class="material-icons-round"> remove </span>
          </button>
        </tr>
      </table>
      <div class="adjust-rows">
        <button @click="increaseNumRows">
          <span class="material-icons-round"> add </span>
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
  data() {
    return {
      numRows: 3,
      inputData: [[], [], [], [], [], [], []],
    };
  },
  methods: {
    increaseNumRows() {
      this.numRows++;
    },
    decreaseNumRows(rowIndex: number) {
      this.inputData.forEach((column) => {
        column.splice(rowIndex, 1);
      });
      this.numRows--;
    },
  },
});
</script>

<style lang="scss" scoped>
.title {
  height: 40px;
}
table {
  // table-layout: fixed;
  width: 100%;
  // border: 0.5px solid rgb(110, 110, 110);
}

th {
  font-weight: bold;
  text-align: left;
}
th,
td {
  border: 0.5px solid rgb(110, 110, 110);
  // padding: 5px;
  border-spacing: 0;
  vertical-align: middle;
}

input {
  width: 100%;
  line-height: 40px;
  background-color: transparent;
  border: none;
}
.adjust-rows {
  display: flex;
  justify-content: center;
}
button {
  border: 0;
  padding: 10px;
  border-radius: 25px;
  background-color: rgb(201, 201, 201);
}
</style>
