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

let data = [
  {
    name: "风速仪",
    value: 40
  },
  {
    name: "加速度",
    value: 30
  },
  {
    name: "全站仪",
    value: 20
  },
  {
    name: "温度计",
    value: 10
  }
];
let value = data.map(item => item.value);
let sum = value.reduce((a, b) => {
  return a + b;
});
let series = [];
let yAxis = [];
for (let i = 0; i < data.length; i++) {
  series.push({
    name: "",
    type: "pie",
    clockWise: true, //顺时加载
    hoverAnimation: false, //鼠标移入变大
    radius: [85 - i * 10 + "%", 81 - i * 10 + "%"],
    center: ["20%", "50%"],
    label: {
      show: false
    },
    itemStyle: {
      borderWidth: 30, //圆柱图宽度
      borderRadius: 30, //光环宽度
      borderColor: "rgba(0, 0,0, 0)",
      borderDashOffset: 20
    },
    data: [
      {
        value: data[i].value,
        name: data[i].name
      },
      {
        value: sum - data[i].value,
        name: "",
        itemStyle: {
          color: "transparent"
        },
        hoverAnimation: false
      }
    ]
  });
}

const option = {
  color: ["#0080ff", "#25a2f2", "#4dfbff", "#30ffcc"],
  legend: {
    show: true,
    icon: "circle",
    top: "center",
    right: "0%",
    data: name,
    itemWidth: 10,
    itemHeight: 10,
    width: 200,
    itemGap: 40,
    orient: "horizontal",
    formatter: name => {
      return (
        "{title|" +
        name +
        "}{value|" +
        data.find(item => {
          return item.name == name;
        }).value +
        "}{value|人}"
      );
    },
    textStyle: {
      rich: {
        title: {
          fontSize: 14,
          padding: [0, 15, 0, 5], // 整体偏移label位置
          color: "#008FF4"
        },
        value: {
          fontSize: 18,
          color: "#008FF4"
        }
      }
    }
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
        interval: 0,
        inside: true,
        textStyle: {
          color: "#fff",
          fontSize: 14
        },
        show: true
      },
      data: yAxis
    }
  ],
  xAxis: [
    {
      show: false
    }
  ],
  series: series
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
