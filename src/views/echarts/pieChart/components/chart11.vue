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
const color = ["#0CD2E6", "#3751E6", "#FFC722", "#886EFF", "#008DEC", "#114C90", "#00BFA5"];
const data = [
  {
    name: "类型1",
    value: 30
  },
  {
    name: "类型2",
    value: 10
  },
  {
    name: "类型3",
    value: 15
  },
  {
    name: "类型4",
    value: 23
  },
  {
    name: "类型5",
    value: 10
  },
  {
    name: "其他",
    value: 12
  }
];
// 设置数据
function setChartOption(data) {
  const formatData = [];
  data.forEach(function (item, index) {
    formatData.push(
      {
        value: item.value,
        name: item.name,
        itemStyle: {
          normal: {
            borderWidth: 10,
            shadowBlur: 20,
            borderColor: color[index],
            shadowColor: color[index]
          }
        }
      },
      {
        value: 5,
        name: "",
        itemStyle: {
          normal: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            color: "rgba(0, 0, 0, 0)",
            borderColor: "rgba(0, 0, 0, 0)",
            borderWidth: 0
          }
        }
      }
    );
  });

  return formatData;
}
const option = {
  color: color,
  series: [
    {
      name: "",
      type: "pie",
      radius: ["70%", "72%"],
      hoverAnimation: false,
      data: setChartOption(data)
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
