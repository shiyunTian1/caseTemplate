<template>
  <div class="card">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LineChart from "./components/chart1.vue";
</script>

<style scoped lang="scss">
:deep(.el-row) {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  min-height: 36px;
  background: var(--el-header-bg-color);
  border: 1px solid var(--el-header-border-color);
  border-radius: 4px;
}
</style>
