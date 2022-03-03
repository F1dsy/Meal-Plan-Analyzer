<template>
  <div class="table" v-if="data != null">
    <table>
      <tr>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
        <th>Sunday</th>
      </tr>
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
import { defineComponent, PropType } from "vue";
import invertTable from "../helpers/InvertTable";
import { Table, Data } from "../typings/types";

export default defineComponent({
  props: {
    data: { type: Object as PropType<Data>, required: true },
  },
  computed: {
    tableData() {
      const tableData: Table = this.data.table;

      return invertTable(tableData);
    },
  },
});
</script>

<style scoped lang="scss"></style>
