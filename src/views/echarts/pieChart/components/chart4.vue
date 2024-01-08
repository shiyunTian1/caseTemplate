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

let dashedPic =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM8AAAAOBAMAAAB6G1V9AAAAD1BMVEX////Kysrk5OTj4+TJycoJ0iFPAAAAG0lEQVQ4y2MYBaNgGAMTQQVFOiABhlEwCugOAMqzCykGOeENAAAAAElFTkSuQmCC";
let color = ["#FF8700", "#ffc300", "#00e473", "#009DFF"];
let chartData = [
  {
    name: "交通",
    value: 13211,
    unit: "元"
  },
  {
    name: "医疗",
    value: 42111,
    unit: "元"
  },
  {
    name: "住房",
    value: 81711,
    unit: "元"
  },
  {
    name: "其他",
    value: 121711,
    unit: "元"
  }
];
let arrName = [];
let arrValue = [];
let sum = 0;
let pieSeries = [],
  lineYAxis = [];

// 数据处理
chartData.forEach((v, i) => {
  arrName.push(v.name);
  arrValue.push(v.value);
  sum = sum + v.value;
});

// 图表option整理
chartData.forEach((v, i) => {
  pieSeries.push({
    name: "学历",
    type: "pie",
    clockWise: false,
    hoverAnimation: false,
    radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
    center: ["30%", "50%"],
    label: {
      show: false
    },
    data: [
      {
        value: v.value,
        name: v.name
      },
      {
        value: sum - v.value,
        name: "",
        itemStyle: {
          color: "rgba(0,0,0,0)"
        }
      }
    ]
  });
  pieSeries.push({
    name: "",
    type: "pie",
    silent: true,
    z: 1,
    clockWise: false, //顺时加载
    hoverAnimation: false, //鼠标移入变大
    radius: [65 - i * 15 + "%", 57 - i * 15 + "%"],
    center: ["30%", "50%"],
    label: {
      show: false
    },
    data: [
      {
        value: 7.5,
        itemStyle: {
          color: "#E3F0FF"
        }
      },
      {
        value: 2.5,
        name: "",
        itemStyle: {
          color: "rgba(0,0,0,0)"
        }
      }
    ]
  });
  v.percent = ((v.value / sum) * 100).toFixed(1) + "%";
  lineYAxis.push({
    value: i,
    textStyle: {
      rich: {
        circle: {
          color: color[i],
          padding: [0, 5]
        }
      }
    }
  });
});

const option = {
  color: color,
  grid: {
    top: "15%",
    bottom: "54%",
    left: "30%",
    containLabel: false
  },
  yAxis: [
    {
      type: "category",
      inverse: true,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: function (params) {
          let item = chartData[params];
          return "{line|}{circle|●}{name|" + item.name + "}{bd||}{percent|" + item.percent + "}";
        },
        interval: 0,
        inside: true,
        textStyle: {
          color: "#333",
          fontSize: 14,
          rich: {
            line: {
              width: 170,
              height: 10,
              backgroundColor: { image: dashedPic }
            },
            name: {
              color: "#666",
              fontSize: 14
            },
            bd: {
              color: "#ccc",
              padding: [0, 5],
              fontSize: 14
            },
            percent: {
              color: "#333",
              fontSize: 14
            },
            value: {
              color: "#333",
              fontSize: 16,
              fontWeight: 500,
              padding: [0, 0, 0, 20]
            },
            unit: {
              fontSize: 14
            }
          }
        },
        show: true
      },
      data: lineYAxis
    }
  ],
  xAxis: [
    {
      show: false
    }
  ],
  series: pieSeries
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
