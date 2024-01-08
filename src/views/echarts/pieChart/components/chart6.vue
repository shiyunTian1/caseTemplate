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

var dataStyle = {
  normal: {
    label: { show: false },
    labelLine: { show: false },
    shadowBlur: 40,
    shadowColor: "rgba(40, 40, 40, 0.5)"
  }
};
var placeHolderStyle = {
  normal: {
    color: "rgba(0,0,0,0)",
    label: { show: false },
    labelLine: { show: false }
  },
  emphasis: {
    color: "rgba(0,0,0,0)"
  }
};

const option = {
  // backgroundColor: "#f4f2e3",
  color: ["#86D560", "#AF89D6", "#59ADF3", "#FF999A", "#FFCC67"],
  tooltip: {
    show: true,
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  // legend: {
  //   itemGap: 12,

  //   top: "87%",
  //   data: ["01", "02", "03", "04", "05", "06"],
  // },
  toolbox: {
    show: false,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  series: [
    {
      name: "Line 1",
      type: "pie",
      clockWise: false,
      radius: [70, 85],
      itemStyle: dataStyle,
      hoverAnimation: false,

      data: [
        {
          value: 300,
          name: "01"
        },
        {
          value: 50,
          name: "invisible",
          itemStyle: placeHolderStyle
        }
      ]
    },
    {
      name: "Line 2",
      type: "pie",
      clockWise: false,
      radius: [55, 70],
      itemStyle: dataStyle,
      hoverAnimation: false,

      data: [
        {
          value: 150,
          name: "02"
        },
        {
          value: 60,
          name: "invisible",
          itemStyle: placeHolderStyle
        }
      ]
    },
    {
      name: "Line 3",
      type: "pie",
      clockWise: false,
      hoverAnimation: false,
      radius: [40, 55],
      itemStyle: dataStyle,

      data: [
        {
          value: 80,
          name: "03"
        },
        {
          value: 50,
          name: "invisible",
          itemStyle: placeHolderStyle
        }
      ]
    },
    {
      name: "Line 4",
      type: "pie",
      clockWise: false,
      hoverAnimation: false,
      radius: [25, 40],
      itemStyle: dataStyle,

      data: [
        {
          value: 45,
          name: "04"
        },
        {
          value: 30,
          name: "invisible",
          itemStyle: placeHolderStyle
        }
      ]
    },
    {
      name: "Line 5",
      type: "pie",
      clockWise: false,
      hoverAnimation: false,
      radius: [10, 25],
      itemStyle: dataStyle,

      data: [
        {
          value: 30,
          name: "05"
        },
        {
          value: 30,
          name: "invisible",
          itemStyle: placeHolderStyle
        }
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
