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
    default: ["业务受理", "方案答复", "设计审查", "中间检查", "验收接电"]
  },
  dataList: {
    type: Array,
    default: [200, 85, 12, 275, 305]
  }
});
let { titileArr, dataList } = props;
const option = {
  color: ["#63caff", "#49beff", "rgb(2,47,87)", "rgb(2,47,87)"],
  grid: {
    top: "20%",
    left: "3%",
    right: "3%",
    bottom: "5%",
    containLabel: true
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    },
    textStyle: {
      fontSize: 12
    },
    backgroundColor: "rgba(255,255,255,1)",
    extraCssText: "box-shadow: 2px 2px 4px 0px rgba(0,0,0,0.3);",
    formatter: params => {
      return `${params[0].name} : <br> ${params[0].value} 天 <br> ${params[3].value} % `;
    }
  },
  xAxis: {
    type: "category",
    data: titileArr,
    splitLine: {
      show: false
    },
    axisLabel: {
      color: "#A1BADF",
      fontSize: 12,
      interval: "auto" // x轴间距
      // rotate:40
    },
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: "rgba(152, 212, 255, .1)"
      }
    }
  },
  yAxis: [
    {
      type: "value",
      name: "天",
      nameGap: "30",
      min: 0,
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        fontSize: 12,
        color: "#A1BADF"
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(152, 212, 255, .1)"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(152, 212, 255, .1)"
        }
      },
      nameTextStyle: {
        color: "#A1BADF",
        fontWeight: 400,
        fontSize: 12
      }
    },
    {
      type: "value",
      name: "%",
      nameGap: "30",
      nameTextStyle: {
        color: "#A1BADF",
        fontWeight: 400,
        fontSize: 12
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        fontSize: 12,
        color: "#A1BADF"
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(152, 212, 255, .1)"
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(152, 212, 255, .1)"
        }
      }
    }
  ],
  series: [
    {
      data: dataList,
      type: "bar", // 柱图
      barMaxWidth: "auto",
      barWidth: 40,
      itemStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          type: "linear",
          global: false,
          colorStops: [
            {
              offset: 0,
              color: "#2A76FF"
            },
            {
              offset: 0.5,
              color: "#00A8FF"
            },
            {
              offset: 1,
              color: "#00D8FF"
            }
          ]
        }
      }
    },
    {
      data: [1, 1, 1, 1, 1],
      type: "pictorialBar", // 底部
      barMaxWidth: "20",
      symbolOffset: [0, "50%"],
      symbolSize: [40, 15]
    },
    {
      data: dataList,
      type: "pictorialBar", // 顶部
      barMaxWidth: "20",
      symbolPosition: "end",
      symbolOffset: [0, "-50%"],
      symbolSize: [40, 12],
      zlevel: 2
    },
    {
      name: "",
      type: "line",
      showAllSymbol: true,
      lineStyle: {
        color: "#00D8FF"
      },
      showSymbol: true,
      symbol: "circle",
      symbolSize: 20,
      itemStyle: {
        normal: {
          color: "#121E43",
          borderColor: "#00D8FF",
          borderWidth: 3
        }
      },
      data: ["30", "50", "40", "70", "40"],
      yAxisIndex: 1
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
