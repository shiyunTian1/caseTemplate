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
  },
  titileArr: {
    type: Array,
    default: ["非洲", "欧洲", "日韩", "中东", "北美", "南美", "南亚", "东南亚", "西南太平洋"]
  },
  dataList: {
    type: Array,
    default: [2200, 1820, 1910, 2340, 2900, 3300, 5000, 4800, 3400]
  }
});
let { titileArr, dataList } = props;
const option = {
  gird: {
    top: "2%",
    left: "1%",
    right: "1%",
    bottom: "2%", //网格图（柱状图、折线图、气泡图等）离底部的距离，也可以用像素比如10px
    containLabel: true //grid 区域是否包含坐标轴的刻度标签。false可能溢出，默认为false
  },
  xAxis: {
    type: "category",
    axisLine: {
      lineStyle: {
        color: "#B1B1B1",
        width: "1"
      }
    },
    axisTick: {
      show: false
    },
    // splitNumber: 9,
    axisLabel: {
      // interval: 0,
      show: true,
      color: "#303133",
      fontSize: "12",
      width: 50000,
      overflow: "truncate",
      ellipsis: "...",
      align: "center"
    },
    data: titileArr
  },
  yAxis: {
    show: true,
    nameTextStyle: {
      color: "#303133",
      fontSize: 12
    },
    interval: 100000,
    splitLine: {
      show: false
    },
    axisLabel: {
      show: true,
      color: "#303133",
      fontSize: "12"
    },
    axisLine: {
      lineStyle: {
        color: "#B1B1B1",
        width: "1"
      }
    },
    axisTick: {
      show: false
    }
  },
  series: [
    {
      name: "leftA",
      type: "bar",
      barWidth: 10,
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          x2: 0,
          y: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "#29CEFF" },
            { offset: 1, color: "#25D2F1" }
          ]
        }
      },
      data: dataList
    },
    {
      name: "rightA",
      tooltip: {
        show: false
      },
      type: "bar",
      barWidth: 10,
      itemStyle: {
        normal: {
          color: {
            type: "linear",
            x: 0,
            x2: 0,
            y: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "#2675B9" },
              { offset: 0.5, color: "#2587B2" },
              { offset: 1, color: "#062943" }
            ]
          }
        }
      },
      data: dataList,
      barGap: 0
    },
    {
      name: "topA",
      type: "pictorialBar",
      itemStyle: {
        normal: {
          color: "#2485D6"
        }
      },
      symbol: "diamond",
      symbolRotate: 0,
      symbolSize: ["20", "7"],
      symbolOffset: ["0", "-4"],
      symbolPosition: "end",
      data: dataList,
      z: 3
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
