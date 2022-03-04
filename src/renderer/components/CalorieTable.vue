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
      <tr>
        <td v-for="data in summaryData">
          {{ data.totalCalories }}kcal ({{
            (
              ((data.totalCalories - config.calories) * 100) /
              config.calories
            ).toFixed(0)
          }}%)
        </td>
      </tr>
      <tr>
        <td v-for="data in summaryData">
          {{ data.totalCarbs }}g ({{
            (((data.totalCarbs - config.carbs) * 100) / config.carbs).toFixed(
              0
            )
          }}%)
        </td>
      </tr>
      <tr>
        <td v-for="data in summaryData">
          {{ data.totalFats }}g ({{
            (((data.totalFats - config.fats) * 100) / config.fats).toFixed(0)
          }}%)
        </td>
      </tr>
      <tr>
        <td v-for="data in summaryData">
          {{ data.totalProtein }}g ({{
            (
              ((data.totalProtein - config.protein) * 100) /
              config.protein
            ).toFixed(0)
          }}%)
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import getDaysSummary from "../helpers/GetDaysData";
import { Data, Config } from "../typings/types";
export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Data>,
      required: true,
    },
    config: {
      type: Object as PropType<Config>,
      required: true,
    },
  },

  computed: {
    summaryData: function () {
      return getDaysSummary(this.data);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../public/table-style.scss";
</style>
