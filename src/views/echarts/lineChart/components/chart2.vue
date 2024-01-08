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
let bgColor = "#fff";
let color = ["#0090FF", "#36CE9E", "#FFC005", "#FF515A", "#8B5CFF", "#00CA69"];
let echartData = [
  {
    name: "1",
    value1: 100,
    value2: 233
  },
  {
    name: "2",
    value1: 138,
    value2: 233
  },
  {
    name: "3",
    value1: 350,
    value2: 200
  },
  {
    name: "4",
    value1: 173,
    value2: 180
  },
  {
    name: "5",
    value1: 180,
    value2: 199
  },
  {
    name: "6",
    value1: 150,
    value2: 233
  },
  {
    name: "7",
    value1: 180,
    value2: 210
  },
  {
    name: "8",
    value1: 230,
    value2: 180
  }
];

let xAxisData = echartData.map(v => v.name);
let yAxisData1 = echartData.map(v => v.value1);
let yAxisData2 = echartData.map(v => v.value2);
const hexToRgba = (hex, opacity) => {
  let rgbaColor = "";
  let reg = /^#[\da-f]{6}$/i;
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt("0x" + hex.slice(3, 5))},${parseInt(
      "0x" + hex.slice(5, 7)
    )},${opacity})`;
  }
  return rgbaColor;
};

const option = {
  // backgroundColor: bgColor,
  color: color,
  legend: {
    right: 10,
    top: 10
  },
  tooltip: {
    trigger: "axis",
    formatter: function (params) {
      let html = "";
      params.forEach(v => {
        console.log(v);
        html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                  color[v.componentIndex]
                };"></span>
                ${v.seriesName}.${v.name}
                <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                万元`;
      });

      return html;
    },
    extraCssText: "background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
    axisPointer: {
      type: "shadow",
      shadowStyle: {
        color: "#ffffff",
        shadowColor: "rgba(225,225,225,1)",
        shadowBlur: 5
      }
    }
  },
  grid: {
    left: "2%",
    right: "2%",
    bottom: "0%",
    top: "2%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      axisLabel: {
        formatter: "{value}月",
        textStyle: {
          color: "#333"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#D9D9D9"
        }
      },
      data: xAxisData
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "单位：万千瓦时",
      axisLabel: {
        textStyle: {
          color: "#666"
        }
      },
      nameTextStyle: {
        color: "#666",
        fontSize: 12,
        lineHeight: 40
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#E9E9E9"
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    }
  ],
  series: [
    {
      name: "2018",
      type: "line",
      smooth: true,
      // showSymbol: false,/
      symbolSize: 8,
      zlevel: 3,
      lineStyle: {
        normal: {
          color: color[0],
          shadowBlur: 3,
          shadowColor: hexToRgba(color[0], 0.5),
          shadowOffsetY: 8
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: hexToRgba(color[0], 0.3)
              },
              {
                offset: 1,
                color: hexToRgba(color[0], 0.1)
              }
            ],
            false
          ),
          shadowColor: hexToRgba(color[0], 0.1),
          shadowBlur: 10
        }
      },
      data: yAxisData1
    },
    {
      name: "2019",
      type: "line",
      smooth: true,
      // showSymbol: false,
      symbolSize: 8,
      zlevel: 3,
      lineStyle: {
        normal: {
          color: color[1],
          shadowBlur: 3,
          shadowColor: hexToRgba(color[1], 0.5),
          shadowOffsetY: 8
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: hexToRgba(color[1], 0.3)
              },
              {
                offset: 1,
                color: hexToRgba(color[1], 0.1)
              }
            ],
            false
          ),
          shadowColor: hexToRgba(color[1], 0.1),
          shadowBlur: 10
        }
      },
      data: yAxisData2
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
