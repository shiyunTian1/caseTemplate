<template>
  <div class="line-title">
    <p class="title">{{ titleName }}</p>
    <div class="echars-container">
      <ECharts :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";
import * as echarts from "echarts";
const props = defineProps({
  titleName: {
    type: String,
    default: "饼图"
  }
});

const option = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  color: ["#8fc31f", "#f35833", "#00ccff", "#ffcc00"],

  series: [
    {
      name: "签到比例分析",
      type: "pie",
      radius: "70%",
      center: ["50%", "50%"],
      data: [
        { value: 335, name: "准时" },
        { value: 310, name: "迟到" },
        { value: 234, name: "请假" },
        { value: 135, name: "未到" }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      },
      itemStyle: {
        normal: {
          label: {
            show: true,
            //	                            position:'inside',
            formatter: "{b} : {c} ({d}%)"
          }
        },
        labelLine: { show: true }
      }
    }
  ]
};
</script>

<style scoped lang="scss">
.line-title {
  .title {
    padding: 20px;
    font-size: 14px;
    color: var(--el-header-text-color);
    border-bottom: 1px solid var(--el-header-border-color);
  }
  .echars-container {
    height: 240px;
    padding: 10px;
  }
}
</style>
