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
const salvProName = ["安徽省", "河南省", "浙江省", "湖北省", "贵州省", "江西省", "江苏省", "四川省", "云南省", "湖南省"];
const salvProValue = [239, 181, 154, 144, 135, 117, 74, 72, 67, 55];
const salvProMax = []; //背景按最大值

const option = {
  grid: {
    left: "2%",
    right: "2%",
    bottom: "2%",
    top: "2%",
    containLabel: true
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "none"
    },
    formatter: function (params) {
      return params[0].name + " : " + params[0].value;
    }
  },
  xAxis: {
    show: false,
    type: "value"
  },
  yAxis: [
    {
      type: "category",
      inverse: true,
      axisLabel: {
        show: true,
        textStyle: {
          color: "#303133"
        }
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
      data: salvProName
    },
    {
      type: "category",
      inverse: true,
      axisTick: "none",
      axisLine: "none",
      show: true,
      axisLabel: {
        textStyle: {
          color: "#ffffff",
          fontSize: "12"
        }
      },
      data: salvProValue
    }
  ],
  series: [
    {
      name: "值",
      type: "bar",
      zlevel: 1,
      itemStyle: {
        normal: {
          barBorderRadius: 30,
          color: "rgb(57,89,255,.8)"
          // color: new ECharts.graphic.LinearGradient(0, 0, 1, 0, [
          //   {
          //     offset: 0,
          //     color: "rgb(57,89,255,1)",
          //   },
          //   {
          //     offset: 1,
          //     color: "rgb(46,200,207,1)",
          //   },
          // ]),
        }
      },
      barWidth: 10,
      data: salvProValue
    },
    {
      name: "背景",
      type: "bar",
      barWidth: 10,
      barGap: "-100%",
      data: salvProMax,
      itemStyle: {
        normal: {
          color: "rgba(24,31,68,.1)",
          barBorderRadius: 30
        }
      }
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
