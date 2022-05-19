<template>
  <div class="view-container">
    <div class="view-header">
      <h1 class="title">Meal Plan</h1>
      <div class="calendar-selection">
        <button @click="selectCalendar(0)">Timeline</button>
        <button @click="selectCalendar(1)">Week</button>
        <button @click="selectCalendar(2)">Monthly</button>
      </div>
      <router-link class="button" to="/tables/addNewMealPlan">New</router-link>
    </div>
    <h1 v-if="calendarSelection === 0">Timeline</h1>
    <h1 v-else-if="calendarSelection === 1">Week</h1>
    <calendar-monthly v-else :span="itemSpan"></calendar-monthly>
  </div>
  <calendar-side-menu-vue></calendar-side-menu-vue>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MealTable from "../components/MealTable.vue";
import CalorieTable from "../components/CalorieTable.vue";
import CalendarMonthly from "../components/CalendarMonthly.vue";
import CalendarSideMenuVue from "../components/CalendarSideMenu.vue";
import interact from "interactjs";

export default defineComponent({
  name: "app",
  setup() {
    let position = { x: 0, y: 0 };
    let itemSpan = ref(1);
    interact(".draggable").draggable({
      listeners: {
        move(event) {
          event.target.classList.remove("endDrag");
          position.x += event.dx;
          position.y += event.dy;
          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
        end(event) {
          event.target.style.transform = "translate(0px, 0px)";
          position = { x: 0, y: 0 };
          event.target.classList.add("endDrag");
          itemSpan = event.target.innerText;
          // event.target.style.opacity = "1";
        },
      },
    });
    return { itemSpan };
  },
  components: {
    MealTable,
    CalorieTable,
    CalendarMonthly,
    CalendarSideMenuVue,
  },
  data() {
    return {
      calendarSelection: 0,
    };
  },
  methods: {
    selectCalendar(num: number) {
      this.calendarSelection = num;
    },
  },
});
</script>

<style lang="scss" scoped>
.view-container {
  flex-grow: 1;
  padding: 16px;
}
.view-header {
  display: flex;
  justify-content: space-between;
  height: 40px;
  align-items: center;
}
.button {
  color: white;
  text-decoration: none;
  background-color: rgb(76, 128, 76);
  border-radius: 8px;
  width: 60px;
  text-align: center;
  padding: 10px 0;
}
</style>
