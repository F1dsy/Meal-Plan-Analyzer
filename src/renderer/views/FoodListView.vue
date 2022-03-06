<template>
  <div class="view-container" v-if="$store.state.hasLoaded">
    <div class="view-header">
      <h1 class="title">Food List</h1>
      <router-link class="button" to="/foodlist/addNewFood">New</router-link>
    </div>
    <div class="list-scroll-container">
      <div class="list-container">
        <div class="header">
          <div class="header-item" @click="selectSort(0)">
            <h6>Name</h6>
            <span class="material-icons-round" v-if="sortBy === 0"
              >{{ ascending ? "arrow_drop_up" : "arrow_drop_down" }}
            </span>
          </div>
          <div class="header-item" @click="selectSort(1)">
            <h6>Calories</h6>
            <span class="material-icons-round" v-if="sortBy === 1"
              >{{ ascending ? "arrow_drop_up" : "arrow_drop_down" }}
            </span>
          </div>
          <div class="header-item" @click="selectSort(2)">
            <h6>Carbs</h6>
            <span class="material-icons-round" v-if="sortBy === 2"
              >{{ ascending ? "arrow_drop_up" : "arrow_drop_down" }}
            </span>
          </div>
          <div class="header-item" @click="selectSort(3)">
            <h6>Fats</h6>
            <span class="material-icons-round" v-if="sortBy === 3"
              >{{ ascending ? "arrow_drop_up" : "arrow_drop_down" }}
            </span>
          </div>
          <div class="header-item" @click="selectSort(4)">
            <h6>Protein</h6>
            <span class="material-icons-round" v-if="sortBy === 4"
              >{{ ascending ? "arrow_drop_up" : "arrow_drop_down" }}
            </span>
          </div>
          <div class="header-item" @click="selectSort(5)">
            <h6>Unit Scale</h6>
            <span class="material-icons-round" v-if="sortBy === 5"
              >{{ ascending ? "arrow_drop_up" : "arrow_drop_down" }}
            </span>
          </div>
          <div class="header-item" @click="selectSort(6)">
            <h6>Category</h6>
            <span class="material-icons-round" v-if="sortBy === 6"
              >{{ ascending ? "arrow_drop_up" : "arrow_drop_down" }}
            </span>
          </div>
        </div>
        <div class="list-item" v-for="item in foodsSorted(ascending, sortBy)">
          <h6>{{ item.name }}</h6>
          <p>{{ item.calories }}</p>
          <p>{{ item.carbs }}</p>
          <p>{{ item.fats }}</p>
          <p>{{ item.protein }}</p>
          <p>{{ item.unitScale }}</p>
          <p>{{ item.category }}</p>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

enum SortBy {
  name,
  calories,
  carbs,
  fats,
  protein,
  unitScale,
  category,
}

export default defineComponent({
  data() {
    return {
      ascending: true,
      sortBy: 0,
    };
  },

  methods: {
    selectSort(sortBy: number) {
      if (this.sortBy === sortBy) {
        this.ascending = !this.ascending;
      } else {
        if (this.ascending) this.ascending = true;
        this.sortBy = sortBy;
      }
    },
    foodsSorted(ascending: boolean, sortBy: number) {
      return [...this.$store.state.data.foods].sort((a, b) => {
        switch (sortBy) {
          case SortBy.calories:
            return ascending
              ? a.calories - b.calories
              : b.calories - a.calories;
          case SortBy.carbs:
            return ascending ? a.carbs - b.carbs : b.carbs - a.carbs;
          case SortBy.fats:
            return ascending ? a.fats - b.fats : b.fats - a.fats;
          case SortBy.protein:
            return ascending ? a.protein - b.protein : b.protein - a.protein;
          default:
            return ascending
              ? a.name > b.name
                ? 1
                : -1
              : b.name > a.name
              ? 1
              : -1;
        }
      });
    },
  },
});
</script>

<style scoped lang="scss">
@import "../styles/list-view-styles.scss";
.list-container {
  min-width: 680px;
}
// .view-container {
//   flex-grow: 1;
//   padding: 16px;
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   .view-header {
//     display: flex;
//     justify-content: space-between;
//     height: 40px;
//     align-items: center;
//     .button {
//       color: white;
//       text-decoration: none;
//       background-color: rgb(76, 128, 76);
//       border-radius: 8px;
//       width: 60px;
//       text-align: center;
//       padding: 10px 0;
//     }
//   }
//   .list-scroll-container {
//     overflow: auto;
//     .list-container {
//       min-width: 680px;
//       .header {
//         display: flex;
//         justify-content: space-between;
//         padding: 12px 10px;
//         position: sticky;
//         top: 0;
//         background-color: white;
//         .header-item {
//           font-weight: bold;
//           flex: 1 1 0;
//           display: flex;
//           align-items: center;
//           height: 24px;
//           &:first-child {
//             flex-grow: 2;
//           }
//         }
//         &::after {
//           content: "";
//           position: absolute;
//           bottom: 0;
//           left: 0;
//           width: 100%;
//           height: 0.5px;
//           background-color: rgba(0, 0, 0, 0.2);
//         }
//       }
//       .list-item {
//         display: flex;
//         justify-content: space-between;
//         border-radius: 5px;
//         padding: 10px;
//         &:hover {
//           background-color: rgba(0, 0, 0, 0.05);
//         }
//         h6,
//         p {
//           padding: 10px 0;
//           flex: 1 1 0;
//         }
//         h6 {
//           flex-grow: 2;
//         }
//       }
//     }
//   }
// }
</style>
