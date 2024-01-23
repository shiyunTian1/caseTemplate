<template>
  <div class="columnChart-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart5 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart3 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart4 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart6 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart1 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart2 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart9 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart10 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart11 />
        </div>
      </el-col>
      <!-- <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart12 />
        </div>
      </el-col> -->
      <!-- <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart15 />
        </div>
      </el-col> -->
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart16 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <GradientLineChart18 />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GradientLineChart from "./components/gradientLineChart/index.vue";
import GradientLineChart1 from "./components/gradientLineChart1/index.vue";
import GradientLineChart2 from "./components/gradientLineChart2/index.vue";
import GradientLineChart3 from "./components/gradientLineChart3/index.vue";
import GradientLineChart4 from "./components/gradientLineChart4/index.vue";
import GradientLineChart5 from "./components/gradientLineChart5/index.vue";
import GradientLineChart6 from "./components/gradientLineChart6/index.vue";
import GradientLineChart7 from "./components/gradientLineChart7/index.vue";
import GradientLineChart8 from "./components/gradientLineChart8/index.vue";
import GradientLineChart9 from "./components/gradientLineChart9/index.vue";
import GradientLineChart10 from "./components/gradientLineChart10/index.vue";
import GradientLineChart11 from "./components/gradientLineChart11/index.vue";
import GradientLineChart12 from "./components/gradientLineChart12/index.vue";
import GradientLineChart13 from "./components/gradientLineChart13/index.vue";
import GradientLineChart14 from "./components/gradientLineChart14/index.vue";
import GradientLineChart15 from "./components/gradientLineChart15/index.vue";
import GradientLineChart16 from "./components/gradientLineChart16/index.vue";
import GradientLineChart17 from "./components/gradientLineChart17/index.vue";
import GradientLineChart18 from "./components/gradientLineChart18/index.vue";
</script>

<style scoped lang="scss">
:deep(.el-row) {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  height: 30% !important;
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
