<template>
  <div class="card">
    <el-row :gutter="20">
      <!-- <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart2 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart3 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart4 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart5 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart6 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart7 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart8 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart9 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart10 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart11 />
        </div>
      </el-col> -->
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart12 />
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <LineChart13 />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LineChart from "./components/chart1.vue";
import LineChart2 from "./components/chart2.vue";
import LineChart3 from "./components/chart3.vue";
import LineChart4 from "./components/chart4.vue";
import LineChart5 from "./components/chart5.vue";
import LineChart6 from "./components/chart6.vue";
import LineChart7 from "./components/chart7.vue";
import LineChart8 from "./components/chart8.vue";
import LineChart9 from "./components/chart9.vue";
import LineChart10 from "./components/chart10.vue";
import LineChart11 from "./components/chart11.vue";
import LineChart12 from "./components/chart12.vue";
import LineChart13 from "./components/chart13.vue";
</script>

<style scoped lang="scss">
:deep(.el-row) {
  margin-bottom: 20px;
}
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
