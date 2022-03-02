<template>
  <div class="table" v-if="data != null">
    <table>
      <tr v-for="row in tableData" :key="row">
        <td
          v-for="cell in row"
          :key="cell"
          v-bind:rowspan="typeof cell === 'string' ? 1 : 2"
        >
          {{ typeof cell === "string" ? cell : cell.content }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
// import { ipcRenderer } from "../electron";
import invertTable from "../helpers/InvertTable";
import { Table, Data } from "../typings/types";
import loadData from "../helpers/loadData";

export default {
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    // ipcRenderer.invoke("data").then((result: Data) => {
    //   this.data = result;
    // });
    loadData.then((result) => {
      console.log(result);
      this.data = result;
    });
  },
  computed: {
    tableData() {
      const tableData: Table = this.data.table;
      return invertTable(tableData);
    },
  },
};
</script>

<style scoped>
#hello {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
