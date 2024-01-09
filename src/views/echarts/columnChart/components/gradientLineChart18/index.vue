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
    default: ["系列一", "系列二", "系列三", "系列四", "系列五", "系列六"]
  },
  dataList: {
    type: Array,
    default: [
      {
        value: 2.2
      },
      {
        value: 2.1
      },
      {
        value: 2.5
      },
      {
        value: 3.2
      },
      {
        value: 3.1
      },
      {
        value: 4.8
      }
    ]
  },
  dataList2: {
    default: [
      {
        value: 3.3
      },
      {
        value: 3.7
      },
      {
        value: 3.9
      },
      {
        value: 3.2
      },
      {
        value: 4.1
      },
      {
        value: 5.8
      }
    ]
  }
});
let { titileArr, dataList, dataList2 } = props;

const option = {
  grid: {
    top: "5%",
    left: "10%",
    right: "9%",
    bottom: "10%"
  },
  xAxis: {
    data: titileArr,
    axisTick: {
      show: false
    },
    axisLabel: {
      fontSize: 12,
      color: "#303133"
    }
  },
  yAxis: {
    show: false,
    splitLine: {
      show: true
    }
  },
  // legend: {
  //     data: ['基金支出', '基金收入']
  // },
  animationDurationUpdate: 500,
  series: [
    {
      type: "pictorialBar",
      name: "基金支出",
      symbol: "triangle",
      symbolSize: ["50%", "100%"],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#159AFF"
            },
            {
              offset: 1,
              color: "#003AFF"
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
      data: dataList
    },
    {
      type: "pictorialBar",
      name: "基金收入",
      symbol: "triangle",
      label: {
        normal: {
          show: true,
          position: "top"
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
      symbolSize: ["50%", "100%"],
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#66E1DF"
            },
            {
              offset: 1,
              color: "#005954"
            }
          ])
        }
      },
      barGap: "-60%", // Make series be overlap
      data: dataList2
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
