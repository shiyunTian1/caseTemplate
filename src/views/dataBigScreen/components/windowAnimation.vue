<template>
  <div class="card mb10">
    <h4 class="title">窗口动画</h4>
    <div class="window-animation-container">
      <el-radio-group v-model="radio">
        <el-radio v-for="(v, i) in radioList" :label="v.id">{{ v.label }}</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const radio = ref(0);
const radioList = ref([
  {
    id: 0,
    label: "左右滑动"
  },
  {
    id: 1,
    label: "滑动顶部"
  },
  {
    id: 2,
    label: "滑动底部"
  }
]);
</script>

<style scoped lang="scss">
.title {
  margin: 0 0 15px;
  font-size: 17px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}
</style>
