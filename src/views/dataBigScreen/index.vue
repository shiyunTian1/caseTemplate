<template>
  <div class="card mb10">
    <h4 class="title">数据大屏</h4>
    <span class="text"> 数据大屏配置 </span>
  </div>
  <div class="card"></div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
</script>

<style scoped lang="scss">
.card {
  .title {
    margin: 0 0 15px;
    font-size: 17px;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
  .text {
    font-size: 15px;
    line-height: 25px;
    color: var(--el-text-color-regular);
    .el-link {
      font-size: 15px;
    }
  }
}
</style>
