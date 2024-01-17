<template>
  <div>
    <div class="card mb10">
      <h4 class="title">项目风格配置方案</h4>
      <span class="text"> 项目框架灵活配置 </span>
    </div>
    <Theme />
    <Nav />
    <!-- <CustomBackground /> -->
    <WindowAnimation />
    <LayoutDisplay />
    <ComponentSelection />
  </div>
</template>

<script setup lang="ts">
import Theme from "./components/theme.vue";
import Nav from "./components/nav.vue";
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
