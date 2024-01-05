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

const myColor = ["#eb2100", "#eb3600", "#d0570e", "#d0a00e", "#34da62", "#00e9db", "#00c0e9", "#0096f3"];

const option = {
  // backgroundColor: "#0e2147",
  grid: {
    left: "2%",
    right: "2%",
    bottom: "0%",
    top: "2%",
    containLabel: true
  },
  xAxis: [
    {
      show: false
    }
  ],
  yAxis: [
    {
      axisTick: "none",
      axisLine: "none",
      // offset: "27",
      // axisLabel: {
      //   textStyle: {
      //     color: "#303133",
      //     fontSize: "12",
      //   },
      // },
      data: ["8", "7", "6", "5", "4", "3", "2", "1"]
    },
    {
      axisTick: "none",
      axisLine: "none",
      axisLabel: {
        textStyle: {
          color: "#303133",
          fontSize: "12"
        }
      },
      data: ["12567", "12566", "12566", "12566", "12566", "12566", "12566", "12566"]
    },
    {
      axisTick: "none",
      axisLine: "none",
      name: "单位：件",
      nameGap: "50",
      // nameTextStyle: {
      //   // color: "#303133",
      //   fontSize: "16",
      // },
      data: []
    }
  ],
  series: [
    {
      name: "条",
      type: "bar",
      yAxisIndex: 0,
      data: [52, 60, 22, 33, 44, 78, 59, 15],
      label: {
        normal: {
          show: true,
          position: "right",
          formatter: function (param) {
            return param.value + "%";
          },
          textStyle: {
            color: "#ffffff",
            fontSize: "16"
          }
        }
      },
      barWidth: 6,
      itemStyle: {
        normal: {
          color: function (params) {
            var num = myColor.length;
            return myColor[params.dataIndex % num];
          }
        }
      },
      z: 2
    },
    {
      name: "白框",
      type: "bar",
      yAxisIndex: 1,
      barGap: "-100%",
      data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
      barWidth: 20,
      itemStyle: {
        normal: {
          color: "#fff",
          barBorderRadius: 5
        }
      },
      z: 1
    },
    {
      name: "外框",
      type: "bar",
      yAxisIndex: 2,
      barGap: "-100%",
      data: [100, 100, 100, 100, 100, 100, 100, 100],
      barWidth: 22,
      itemStyle: {
        normal: {
          color: "transparent",
          barBorderRadius: 5
        }
      },
      z: 0
    },
    {
      name: "外圆",
      type: "scatter",
      hoverAnimation: false,
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      yAxisIndex: 2,
      symbolSize: 15,
      itemStyle: {
        normal: {
          color: function (params) {
            var num = myColor.length;
            return myColor[params.dataIndex % num];
          },
          opacity: 1
        }
      },
      z: 2
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
