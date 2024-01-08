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
    default: "折线图"
  }
});

var xAxisData = [];
var data = [];
var data2 = [];
for (var i = 0; i < 50; i++) {
  xAxisData.push(i);
  data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
  data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3);
}

const option = {
  xAxis: [
    {
      show: false,
      data: xAxisData
    },
    {
      show: false,
      data: xAxisData
    }
  ],
  grid: {
    left: "6%",
    right: "6%",
    bottom: "9%",
    top: "6%"
  },
  visualMap: {
    show: false,
    min: 0,
    max: 50,
    dimension: 0,
    inRange: {
      color: ["#4a657a", "#308e92", "#b1cfa5", "#f5d69f", "#f5898b", "#ef5055"]
    }
  },
  yAxis: {
    axisLine: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: "#4a657a"
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#08263f"
      }
    },
    axisTick: {
      show: false
    }
  },
  series: [
    {
      name: "back",
      type: "bar",
      data: data2,
      z: 1,
      itemStyle: {
        normal: {
          opacity: 1,
          barBorderRadius: 5,
          shadowBlur: 3
          // shadowColor: "#111",
        }
      }
    },
    {
      name: "Simulate Shadow",
      type: "line",
      data: data,
      z: 2,
      showSymbol: false,
      animationDelay: 0,
      animationEasing: "linear",
      animationDuration: 1200,
      lineStyle: {
        normal: {
          color: "transparent"
        }
      },
      areaStyle: {
        normal: {
          color: "transparent",
          shadowBlur: 2
          // shadowColor: "#000",
        }
      }
    },
    {
      name: "front",
      type: "bar",
      data: data,
      xAxisIndex: 1,
      z: 3,
      itemStyle: {
        normal: {
          barBorderRadius: 5
        }
      }
    }
  ],
  animationEasing: "elasticOut",
  animationEasingUpdate: "elasticOut",
  animationDelay: function (idx) {
    return idx * 20;
  },
  animationDelayUpdate: function (idx) {
    return idx * 20;
  }
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
