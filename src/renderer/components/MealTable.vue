<template>
  <div class="table" v-if="$store.state.hasLoaded">
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
import { defineComponent } from "vue";
import invertTable from "../helpers/InvertTable";

export default defineComponent({
  computed: {
    tableData() {
      return invertTable(this.$store.state.data.table);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../styles/table-style.scss";
</style>
