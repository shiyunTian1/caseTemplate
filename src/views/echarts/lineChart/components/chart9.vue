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

const option = {
  tooltip: {},
  grid: {
    left: "6%",
    right: "6%",
    bottom: "9%",
    top: "6%"
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  },
  yAxis: {},
  visualMap: {
    show: false,
    dimension: 1,
    pieces: [
      {
        gte: -20, // 获取最小值
        lte: 0,
        color: "#12ba8a",
        colorAlpha: 0.2
      }
    ], //pieces的值由动态数据决定
    seriesIndex: 1,
    outOfRange: {
      color: "#f43c09",
      colorAlpha: 0.7
    }
  },
  series: [
    {
      name: "销量",
      type: "bar",
      barWidth: 20,

      itemStyle: {
        barBorderRadius: 10,
        visualMap: false,
        color: function (params) {
          var index_color = params.value;
          if (index_color >= 0) {
            return {
              type: "linear",
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(255,255,255,0.1)" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#f43c09" // 100% 处的颜色
                }
              ]
            };
          } else {
            return {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(255,255,255,0.1)" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#12ba8a" // 100% 处的颜色
                }
              ]
            };
          }
        }
      },

      data: [0, -5, -20, 10, 10, 20]
    },
    {
      name: "邮件营销",
      type: "line",
      stack: "总量",
      smooth: true,

      itemStyle: {
        borderColor: "#fff"
      },
      areaStyle: {
        color: "rgba(160,180,200,0)"
      },
      lineStyle: {},
      data: [0, -5, -20, 10, 10, 20]
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
