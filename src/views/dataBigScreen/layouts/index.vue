<template>
  <div class="common-layout card">
    <component :is="LayoutComponents['layout5']"></component>
  </div>
</template>

<script setup lang="ts">
import layout1 from "./components/layout1.vue";
import layout2 from "./components/layout2.vue";
import layout3 from "./components/layout3.vue";
import layout4 from "./components/layout4.vue";
import layout5 from "./components/layout5.vue";

const LayoutComponents = {
  layout1: layout1,
  layout2: layout2,
  layout3: layout3,
  layout4: layout4,
  layout5: layout5
};
</script>

<style lang="scss" scoped>
.common-layout {
  --l-main-color: #000000;

  height: 100%;
  :deep(.el-container) {
    height: 100%;
    .el-header,
    .el-footer,
    .el-main,
    .el-aside {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .el-header,
    .el-footer {
      color: var(--el-text-color-primary);
      text-align: center;
      background-color: var(--el-color-primary-light-7);
    }
    .el-main {
      color: var(--el-text-color-primary);
      text-align: center;
      background-color: var(--el-color-primary-light-9);
    }
    .el-aside {
      width: var(--el-aside-width, 300px) !important;
      color: var(--el-text-color-primary);
      text-align: center;
      background-color: var(--el-color-primary-light-8) !important;
    }
  }
}
</style>
