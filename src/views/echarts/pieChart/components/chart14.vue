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
  title: {
    text: "86" + "%",
    textStyle: {
      color: "#000",
      fontSize: 24
    },
    itemGap: 20,
    left: "center",
    top: "center"
  },
  angleAxis: {
    max: 100,
    clockwise: true, // 逆时针
    // 隐藏刻度线
    show: false
  },
  radiusAxis: {
    type: "category",
    show: true,
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  polar: [
    {
      center: ["50%", "50%"], //中心点位置
      radius: "150%" //图形大小
    }
  ],
  series: [
    {
      type: "bar",
      data: [86],
      showBackground: true,
      polarIndex: 0,
      backgroundStyle: {
        color: "#f0f2f6",
        borderWidth: 25
      },
      radius: "100%",
      coordinateSystem: "polar",
      roundCap: true,
      barWidth: 25,
      itemStyle: {
        opacity: 1,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#494CF3"
          },
          {
            offset: 1,
            color: "#2AB0FF"
          }
        ]),
        shadowBlur: 5,
        shadowColor: "#2A95F9"
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
