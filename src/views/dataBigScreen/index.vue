<template>
  <div class="card mb10">
    <h4 class="title">数据大屏</h4>
    <span class="text"> 数据大屏配置 </span>
  </div>
  <Theme />
  <CustomBackground />
  <WindowAnimation />
  <LayoutDisplay />
  <ComponentSelection />
</template>

<script setup lang="ts">
import Theme from "./components/theme.vue";
import CustomBackground from "./components/customBackground.vue";
import WindowAnimation from "./components/windowAnimation.vue";
import LayoutDisplay from "./components/layoutDisplay.vue";
import ComponentSelection from "./components/componentSelection.vue";
import { ref, reactive } from "vue";
</script>

<style scoped lang="scss">
.card {
  .text {
    font-size: 15px;
    line-height: 25px;
    color: var(--el-text-color-regular);
    .el-link {
      font-size: 15px;
    }
  }
}
:deep(.title) {
  margin: 0 0 15px;
  font-size: 17px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}
</style>
