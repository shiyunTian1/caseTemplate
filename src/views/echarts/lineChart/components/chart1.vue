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
var xData = (function () {
  var data = [] as string[];
  for (var i = 1; i < 31; i++) {
    data.push(i + "日");
  }
  return data;
})();

const props = defineProps({
  titleName: {
    type: String,
    default: "折线图"
  }
});
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
const option = {
  //   backgroundColor: "#1A1835",

  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
      textStyle: {
        color: "#fff"
      }
    }
  },
  grid: {
    borderWidth: 0,
    bottom: 25,
    textStyle: {
      color: "#fff"
    }
  },
  legend: {
    x: "46%",
    top: "11%",
    textStyle: {
      color: "#000"
    },
    data: ["访问量", "订单量"]
  },

  calculable: true,
  xAxis: [
    {
      type: "category",
      axisLine: {
        lineStyle: {
          color: "rgba(204,187,225,0.5)"
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      data: xData
    }
  ],

  yAxis: [
    {
      type: "value",
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(204,187,225,0.5)"
        }
      }
    }
  ],
  // dataZoom: [
  //   {
  //     show: true,
  //     height: 30,
  //     xAxisIndex: [0],
  //     bottom: 30,

  //     start: 10,
  //     end: 80,
  //     handleIcon:
  //       "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
  //     handleSize: "110%",
  //     handleStyle: {
  //       color: "#5B3AAE",
  //     },
  //     textStyle: {
  //       color: "rgba(204,187,225,0.5)",
  //     },
  //     fillerColor: "rgba(67,55,160,0.4)",
  //     borderColor: "rgba(204,187,225,0.5)",
  //   },
  //   {
  //     type: "inside",
  //     show: true,
  //     height: 15,
  //     start: 1,
  //     end: 35,
  //   },
  // ],
  series: [
    {
      name: "访问量",
      type: "line",
      symbolSize: 10,
      symbol: "circle",
      itemStyle: {
        color: "#6f7de3"
      },
      markPoint: {
        label: {
          normal: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        data: [
          {
            type: "max",
            name: "最大值"
          },
          {
            type: "min",
            name: "最小值"
          }
        ]
      },
      data: [
        509, 917, 2455, 2610, 2719, 3033, 3044, 3085, 2708, 2809, 2117, 2000, 1455, 1210, 719, 733, 944, 2285, 2208, 3372, 3936,
        3693, 2962, 2810, 3519, 2455, 2610, 2719, 2484, 2078
      ]
    },
    {
      name: "订单量",
      type: "line",
      symbolSize: 10,
      symbol: "circle",
      itemStyle: {
        color: "#c257F6"
      },
      markPoint: {
        label: {
          normal: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        data: [
          {
            type: "max",
            name: "最大值"
          },
          {
            type: "min",
            name: "最小值"
          }
        ]
      },
      data: [
        2136, 3693, 2962, 3810, 3519, 3484, 3915, 3823, 3455, 4310, 4019, 3433, 3544, 3885, 4208, 3372, 3484, 3915, 3748, 3675,
        4009, 4433, 3544, 3285, 4208, 3372, 3484, 3915, 3823, 4265, 4298
      ]
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
