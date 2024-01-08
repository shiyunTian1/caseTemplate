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
const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
const option = {
  // backgroundColor: "#0E2A43",
  title: {
    text: "",
    textStyle: {
      color: "#00FFFF",
      fontSize: 24
    }
  },

  // legend: {
  //   align: "right",
  //   right: 10,
  //   textStyle: {
  //     color: "#fff",
  //   },
  //   data: ["男", "女"],
  // },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "3%",
    containLabel: true
  },
  tooltip: {
    show: "true",
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  yAxis: {
    type: "value",
    axisTick: {
      show: false
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: "#fff"
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: "#aaa"
      }
    }
  },
  xAxis: [
    {
      type: "category",
      // axisTick: {
      //   show: false,
      // },
      // axisLine: {
      //   show: false,
      //   lineStyle: {
      //     color: "#fff",
      //   },
      // },
      data: ["", "", ""]
    },
    {
      type: "category",
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitArea: {
        show: false
      },
      splitLine: {
        show: false
      },
      data: ["", "", ""]
    }
  ],
  series: [
    {
      name: "总人数",
      type: "bar",
      xAxisIndex: 1,

      itemStyle: {
        normal: {
          show: true,
          color: "#277ace",
          barBorderRadius: 50,
          borderWidth: 0,
          borderColor: "#333"
        }
      },
      barWidth: "10%",
      data: [33, 33, 33]
    },
    {
      name: "总人数",
      type: "bar",
      xAxisIndex: 1,

      itemStyle: {
        normal: {
          show: true,
          color: "#277ace",
          barBorderRadius: 50,
          borderWidth: 0,
          borderColor: "#333"
        }
      },
      barWidth: "10%",
      barGap: "100%",
      data: [51, 51, 51]
    },
    {
      name: "男",
      type: "bar",
      itemStyle: {
        normal: {
          show: true,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "#00FFE6",
          //   },
          //   {
          //     offset: 1,
          //     color: "#007CC6",
          //   },
          // ]),
          barBorderRadius: 50,
          borderWidth: 0,
          borderColor: "#333"
        }
      },
      label: {
        normal: {
          show: true,
          position: "top",
          textStyle: {
            color: "#fff"
          }
        }
      },
      barWidth: "10%",
      data: [8, 15, 10]
    },
    {
      name: "女",
      type: "bar",
      barWidth: "10%",
      itemStyle: {
        normal: {
          show: true,
          // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "#3023AE",
          //   },
          //   {
          //     offset: 1,
          //     color: "#C96DD8",
          //   },
          // ]),
          barBorderRadius: 50,
          borderWidth: 0,
          borderColor: "#333"
        }
      },
      label: {
        normal: {
          show: true,
          position: "top",
          textStyle: {
            color: "#fff"
          }
        }
      },
      barGap: "100%",
      data: [8, 17, 26]
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
