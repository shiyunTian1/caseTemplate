<template>
  <div class="card">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <Chart1 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <Chart4 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <Chart5 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <chart2 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <chart3 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <chart6 />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Chart1 from "./components/chart1.vue";
import Chart2 from "./components/chart2.vue";
import Chart3 from "./components/chart3.vue";
import Chart4 from "./components/chart4.vue";
import Chart5 from "./components/chart5.vue";
import Chart6 from "./components/chart6.vue";
</script>

<style scoped lang="scss">
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  margin-bottom: 20px;
  border-radius: 4px;
}
.grid-content {
  min-height: 36px;
  background: var(--el-header-bg-color);
  border: 1px solid var(--el-header-border-color);
  border-radius: 4px;
}
</style>
