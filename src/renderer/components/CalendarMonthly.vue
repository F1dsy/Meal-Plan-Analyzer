<template>
  <h1>Monthly</h1>
  <div class="grid-container">
    <div class="day">
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
      <span>Sun</span>
    </div>
    <div class="week">
      <span v-for="i in 6">{{ i + 10 }}</span>
    </div>

    <div
      class="grid-item"
      v-for="(item, index) in getCalendarByMonth(new Date(2022, 4))"
      :data-index="index"
    >
      {{
        item.day.getDate() === 1
          ? format(item.day, "d. MMM")
          : item.day.getDate()
      }}
      <div class="meal-list">Meal List</div>
    </div>
    <div class="grid-item-active" ref="active"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { previousMonday, addDays, format } from "date-fns";
import interact from "interactjs";
export default defineComponent({
  setup(props) {
    const active = ref<HTMLDivElement | null>(null);
    onMounted(() => {
      interact(".grid-item").dropzone({
        ondragenter: function (event) {
          const i = event.target.dataset.index;

          const x = (i % 7) + 2;
          const y = Math.floor(i / 7) + 2;
          active.value!.style.transform = "scale(1)";
          active.value!.style.gridColumn = `${x} / span 1`;
          active.value!.style.gridRow = `${y} / span 1`;

          // event.relatedTarget.style.opacity = "0";
        },
        ondragleave: function (event) {
          active.value!.style.transform = "scale(0)";
          // event.relatedTarget.style.opacity = "1";
        },
      });
    });
    console.log(props);
    return { active };
  },
  props: ["span"],
  methods: {
    getCalendarByMonth(date: Date) {
      const first = new Date(date.getFullYear(), date.getMonth());
      const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      const arr = [];
      console.log(previousMonday(first));

      for (let i = 0; i < 42; i++) {
        arr.push({ day: addDays(previousMonday(first), i), meals: ["hi"] });
      }
      return arr;
    },
    format: format,
  },
});
</script>

<style lang="scss" scoped>
.grid-container {
  position: relative;
  display: grid;
  height: 700px;
  grid-template-columns: 50px 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 50px 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "day day day day day day day day"
    "week . . . . . . ."
    "week . . . . . . ."
    "week . . . . . . ."
    "week . . . . . . ."
    "week . . . . . . ."
    "week . . . . . . .";
  background-color: rgb(85, 124, 158);
  padding: 10px;
  border-radius: 7px;
}
.week {
  grid-area: week;
  display: flex;
  flex-direction: column;
  // height: 100%;
  // width: 100%;
  background-color: brown;
  justify-content: space-around;
  align-items: center;
}
.day {
  grid-area: day;
  background-color: antiquewhite;
  padding-left: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.grid-item {
  width: 100%;
  height: 100%;
  background-color: aqua;
  border-right: 1px black solid;
  border-bottom: 1px black solid;
  text-align: center;
}
.grid-item-active {
  position: absolute;
  background-color: burlywood;
  height: 100%;
  width: 100%;
  grid-row: 1 / span 1;
  grid-column: 1 / span 1;
  // transform: scale(0);
  transition: 200ms ease;
}
</style>
