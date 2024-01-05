<template>
  <div class="home">
    <div v-for="item in 12" :key="item.id" class="card" @click="handleCard">
      {{ item }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const projectarr = ref([
  {
    name: "桥梁项目",
    image: "",
    url: "http://webtest.cloudansys.com/bridge/#/Login"
  }
]);

const handleCard = () => {
  console.log(projectarr.value);
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  .card {
    width: 24%;
    height: 30%;
    margin: 0 10px 10px 0;
  }
}
</style>
