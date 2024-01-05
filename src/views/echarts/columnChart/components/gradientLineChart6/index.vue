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
const xdata = ["苏州市", "无锡市", "南京市"];
const data = [70, 60, 80];
const maxArr = [100, 100, 100];
const option = {
  // backgroundColor: "rgba(5,39,58,1)", //背景色
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    },

    formatter: function (params) {
      let dot =
        '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background-color:#02C4DD"></span>';
      return params[0].name + "<br>" + "杆塔数量 ：" + params[0].value;
    }
  },
  grid: {
    left: "2%",
    right: "2%",
    bottom: "0%",
    top: "20%",
    containLabel: true
  },
  xAxis: {
    data: xdata,
    triggerEvent: true,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: true,
      rotate: 0,
      interval: 0,
      textStyle: {
        padding: [14, 0, 0, 0],
        fontSize: 14,
        color: "rgba(255,255,255,1)"
      }
    }
  },
  yAxis: {
    name: "",
    triggerEvent: true,
    nameTextStyle: {
      color: "rgba(255,255,255,1)",
      fontSize: 12,
      padding: [0, 0, 10, -20]
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(255,255,255,.1)"
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: "rgba(255,255,255,.1)"
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: "rgb(148,159,167)",
        fontSize: 12
      }
    }
  },
  // color: ["#e54035"],
  series: [
    {
      name: "数量",
      barMinHeight: 10,
      type: "pictorialBar",
      barCategoryGap: "60%",
      // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
      symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
      itemStyle: {
        normal: {
          //barBorderRadius: 5,
          //渐变色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#01EAED"
            },
            {
              offset: 0.5,
              color: "#02C4DD"
            },
            {
              offset: 1,
              color: "#029ED9"
            }
          ])
        }
      },
      label: {
        normal: {
          show: true,
          position: "top",
          textStyle: {
            color: "#303133",
            fontSize: 12
          }
        }
      },
      data: data,
      z: 10
    },
    {
      name: "hill",
      type: "bar",
      barWidth: "20%",
      symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
      itemStyle: {
        normal: {
          color: "rgba(11,47,68,.1)"
        }
      },
      data: maxArr,
      z: 9
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
