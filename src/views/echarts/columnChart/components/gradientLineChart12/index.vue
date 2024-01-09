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
  id: {
    type: String,
    required: "bar1"
  },
  yLabel: {
    type: Array,
    default: ["使用率", "使用率", "使用率", "使用率", "使用率"]
  },
  yData: {
    type: Array,
    default: [4000, 1280, 2515, 4500, 500]
  },
  bgData: {
    type: Array,
    default: [5000, 5000, 5000, 5000, 5000]
  }
});
let { yLabel, yData, bgData, id } = props;
const option = {
  // backgroundColor: '#071347',
  grid: {
    left: "-10%",
    right: "2%",
    bottom: "0%",
    top: "2%",
    containLabel: true
  },
  xAxis: {
    show: false,
    type: "value"
  },
  tooltip: {
    // 格式化提示内容
    formatter: function (params) {
      return (
        params.name +
        "<br/>" +
        "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgb(47,215,255)'></span>" +
        "销量 : " +
        params.value +
        "万m³"
      );
    }
  },
  yAxis: [
    {
      type: "category",
      inverse: true,
      axisLabel: {
        show: true,
        margin: 15,
        textStyle: {
          color: "rgb(188,217,230)",
          fontSize: 19
        },
        // 调整左侧文字的3个属性，缺一不可
        verticalAlign: "bottom",
        align: "top",
        //调整文字上右下左
        padding: [0, 0, 45, 12]
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      data: yLabel
    },
    {
      zlevel: 3,
      type: "category",
      inverse: true,
      axisTick: "none",
      axisLine: "none",
      show: true,
      axisLabel: {
        textStyle: {
          color: "rgb(188,217,230)",
          fontSize: "20",
          padding: [0, 0, 0, 10]
        },
        formatter: function (value) {
          return value + " 万m³";
        }
      },
      data: yData
    }
  ],
  series: [
    {
      // 内
      type: "bar",
      barWidth: 20,
      legendHoverLink: false,
      silent: true,
      itemStyle: {
        normal: {
          color: function (params) {
            let color = {
              type: "linear",
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#25e7df" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#25e7df00" // 100% 处的颜色
                }
              ]
            };

            return color;
          }
        }
      },
      label: {
        show: false,
        position: "right",
        // distance: 20,
        fontSize: 14,
        color: "#4FA5CB",
        formatter: "{c}%"
      },
      data: yData,
      z: 1,
      animationEasing: "elasticOut"
    },
    {
      name: "外框",
      type: "bar",
      barGap: "-150%", // 设置外框粗细
      data: bgData,
      barWidth: 40,
      itemStyle: {
        normal: {
          color: "transparent", // 填充色
          barBorderColor: "rgba(87,205,254,.47)", // 边框色
          barBorderWidth: 1, // 边框宽度
          // barBorderRadius: 0, //圆角半径
          label: {
            // 标签显示位置
            show: false,
            position: "top" // insideTop 或者横向的 insideLeft
          }
        }
      },
      z: 0
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
