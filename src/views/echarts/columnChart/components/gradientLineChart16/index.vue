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
  },
  dataList: {
    type: Array,
    default: [80, 200, 150, 300, 180]
  }
});
let { dataList } = props;
const option = {
  grid: {
    top: "10%",
    left: "14%",
    right: "3%",
    bottom: "10%"
  },
  xAxis: {
    type: "category",
    axisTick: false,
    axisLabel: {
      interval: 0
    },
    axisLabel: {
      color: "rgb(170,170,170)",
      fontSize: 18
    }
  },
  yAxis: {
    type: "value",
    interval: 100,
    splitLine: {
      lineStyle: {
        color: "rgba(255, 255, 255, 0.2)"
      }
    },
    axisLabel: {
      color: "rgb(170,170,170)",
      fontSize: 18
    }
  },
  series: [
    {
      data: dataList,
      type: "pictorialBar",
      symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
      itemStyle: {
        normal: {
          color: function (params) {
            let color = {
              type: "linear",
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#EEEEEE" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#BD6503" // 100% 处的颜色
                }
              ]
            };
            return color;
          }
        }
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
