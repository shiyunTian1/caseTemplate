<template>
  <div class="dataVisualize-box">
    <div class="card bottom-box">
      <div class="bottom-title">工具利用率折线图</div>
      <!-- <div class="bottom-tabs">
        <el-tabs v-model="tabActive" class="demo-tabs">
          <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div> -->
      <div class="curve-echarts">
        <Line ref="curveRef" />
      </div>
    </div>
    <div class="card top-box">
      <div class="top-content">
        <el-row :gutter="24">
          <el-col class="mb40" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="item-right">
              <div class="echarts-title">成本效益雷达图</div>
              <div class="book-echarts">
                <Radar ref="pieRef" />
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="item-right">
              <div class="echarts-title">成本构成饼状图</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <div class="item-right">
              <div class="echarts-title">成本趋势柱状图</div>
              <div class="book-echarts">
                <Curve ref="curveRef" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataVisualize">
import { ref } from "vue";
import Pie from "./components/pie.vue";
import Curve from "./components/curve.vue";
import Line from "./components/chart2.vue";
import Radar from "./components/radar.vue";

const tabActive = ref(1);

const tab = [
  { label: "未来7日", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 }
];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
