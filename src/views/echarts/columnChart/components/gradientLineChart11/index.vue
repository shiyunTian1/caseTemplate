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

var xData = ["流量", "流量", "流量", "流量", "流量"];
var lastYearData = [2170, 86, 89, 422, 140, 83];
var thisYearData = [401, 11, 84, 180, 85, 24];
var background = "#363636"; //背景
let textColor = "#303133";
let lineColor = "#ccc";
let colors = [
  {
    borderColor: "rgba(227,161,96,1)",
    start: "rgba(227,161,96,0.8)",
    end: "rgba(227,161,96,0.3)"
  },
  {
    borderColor: "rgba(0,222,255,1)",
    start: "rgba(0,222,255,0.3)",
    end: "rgba(0,222,255,0.8)"
  }
];

const option = {
  baseOption: {
    title: {
      text: "",
      left: "center"
    },
    // backgroundColor: background,
    timeline: {
      show: false,
      top: 0,
      data: []
    },
    grid: [
      {
        show: false,
        left: "3%",
        top: "14%",
        bottom: "5%",
        containLabel: true,
        width: "43%"
      },
      {
        show: false,
        left: "50%",
        top: "17.5%",
        bottom: "4.5%",
        width: "100%",
        containLabel: false
      },
      {
        show: false,
        right: "4%",
        top: "14%",
        bottom: "5%",
        containLabel: true,
        width: "43%"
      }
    ],
    xAxis: [
      {
        type: "value",
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        position: "top",
        axisLabel: {
          show: true,
          color: textColor
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: lineColor
          }
        }
      },
      {
        gridIndex: 1,
        show: false
      },
      {
        gridIndex: 2,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        position: "top",
        axisLabel: {
          show: true,
          color: textColor
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: lineColor
          }
        }
      }
    ],
    yAxis: [
      {
        type: "category",
        inverse: false,
        position: "right",
        axisLine: {
          show: false,
          lineStyle: {
            color: lineColor
          }
        },

        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        data: xData
      },
      {
        gridIndex: 1,
        type: "category",
        inverse: true,
        position: "left",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true, // 文字颜色
          padding: [0, 0, 0, 5],
          textStyle: {
            color: "#303133",
            fontSize: 13
          },
          align: "center"
        },
        data: xData.map(function (value) {
          return {
            value: value,
            textStyle: {
              align: "center"
            }
          };
        })
      },
      {
        gridIndex: 2,
        type: "category",
        inverse: true,
        position: "left",
        axisLine: {
          show: true,
          lineStyle: {
            color: lineColor
          }
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          show: false
        },
        data: xData
      }
    ],
    series: []
  },
  options: []
};

option.options.push({
  series: [
    {
      name: "女性",
      type: "bar",
      barWidth: 12,
      stack: "1",
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: colors[0].start
            },
            {
              offset: 1,
              color: colors[0].end
            }
          ])
        }
      },
      label: {
        normal: {
          show: false
        }
      },
      data: lastYearData
      //animationEasing: "elasticOut"
    },
    {
      name: "男性",
      type: "bar",
      stack: "2",
      barWidth: 12,
      xAxisIndex: 2,
      yAxisIndex: 2,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: colors[1].start
            },
            {
              offset: 1,
              color: colors[1].end
            }
          ])
        }
      },
      label: {
        normal: {
          show: false
        }
      },
      data: thisYearData
      // animationEasing: "elasticOut"
    }
  ]
});
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
