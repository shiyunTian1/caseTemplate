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
    default: "柱状图"
  }
});

var value = [5, 8, 12, 14, 16, 18, 20, 22, 24, 26, 30];

const option = {
  tooltip: {
    trigger: "item"
  },
  grid: {
    left: "-2%",
    right: "2%",
    bottom: "-2%",
    top: "20%",
    containLabel: true
  },
  dataRange: {
    show: false,
    min: 0,
    max: 12,
    calculable: true,
    color: ["#d94e5d", "#eac736", "#50a3ba"],
    y: "center"
  },

  xAxis: [
    {
      type: "category",
      show: false,
      data: ["Line", "Bar", "Scatter", "K", "Pie", "Radar", "Chord", "Force", "Map", "Gauge", "Funnel"]
    }
  ],
  yAxis: [
    {
      type: "value",
      show: false
    }
  ],
  series: [
    {
      name: "ECharts例子个数统计",
      type: "bar",
      barGap: 0.1,
      barCategoryGap: 0.01,
      itemStyle: {
        normal: {
          color: function (params) {
            // build a color map as your need.
            var colorList = [
              "#C1232B",
              "#B5C334",
              "#FCCE10",
              "#E87C25",
              "#27727B",
              "#FE8463",
              "#9BCA63",
              "#FAD860",
              "#F3A43B",
              "#60C0DD",
              "#D7504B",
              "#C6E579",
              "#F4E001",
              "#F0805A",
              "#26C0C0"
            ];
            return colorList[params.dataIndex];
          },
          label: {
            show: true,
            position: "top",
            formatter: "{b}\n{c}"
          },
          shadowBlur: 80,
          shadowColor: "rgba(0, 0, 0, 0.2)"
        }
      },
      data: value.map(function (a, idx) {
        return [idx, a + 30, idx];
      })
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
