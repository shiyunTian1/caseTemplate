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
const props = defineProps({
  titleName: {
    type: String,
    default: "柱状图"
  }
});
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  // legend: {
  //   data: ["接入率", "在线率", "完好率"],
  //   align: "right",
  //   right: 10,
  //   textStyle: {
  //     color: "#fff"
  //   },
  //   itemWidth: 10,
  //   itemHeight: 10,
  //   itemGap: 35
  // },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      data: ["喀什市", "疏附县", "疏勒县", "英吉沙县", "泽普县"],
      axisLabel: {
        //坐标轴刻度标签
        show: false
      },
      axisLine: {
        //坐标轴轴线
        show: false
      },
      axisTick: {
        //坐标轴刻度
        show: false
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        formatter: "{value} %"
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "#303133",
          width: 1,
          type: "solid"
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#303133"
        }
      }
    }
  ],
  series: [
    {
      name: "接入率",
      type: "bar",
      data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
      barWidth: 10, //柱子宽度
      barGap: 1, //柱子之间间距
      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "#008cff",
          //   },
          //   {
          //     offset: 1,
          //     color: "#005193",
          //   },
          // ]),
          opacity: 1
        }
      }
    },
    {
      name: "在线率",
      type: "bar",
      data: [50, 70, 60, 61, 75, 87, 60, 62, 86, 46],
      barWidth: 10,
      barGap: 1,
      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "#00da9c",
          //   },
          //   {
          //     offset: 1,
          //     color: "#007a55",
          //   },
          // ]),
          opacity: 1
        }
      }
    },
    {
      name: "完好率",
      type: "bar",
      data: [70, 48, 73, 68, 53, 47, 50, 72, 96, 86],
      barWidth: 10,
      barGap: 1,
      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "#c4e300",
          //   },
          //   {
          //     offset: 1,
          //     color: "#728400",
          //   },
          // ]),
          opacity: 1
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
