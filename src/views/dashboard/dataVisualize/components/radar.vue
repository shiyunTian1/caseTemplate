<template>
  <div class="echarts">
    <ECharts :option="option" />
  </div>
</template>

<script setup lang="ts">
import echarts, { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";
const props = defineProps({
  titleName: {
    type: String,
    default: "雷达图"
  }
});
let data = [582, 421.2, 622.1, 625.3, 265, 224];
let indicator = [
  {
    name: "扳手",
    max: 10
  },
  {
    name: "电钻",
    max: 10
  },
  {
    name: "万能表",
    max: 10
  },
  {
    name: "螺丝刀",
    max: 10
  }
];
const option = {
  legend: {
    show: false,
    data: ["效果", "成本"]
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: "扳手", max: 6500 },
      { name: "电钻", max: 16000 },
      { name: "万能表", max: 30000 },
      { name: "螺丝刀", max: 38000 }
    ]
  },
  series: [
    {
      name: "Budget vs spending",
      type: "radar",
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: "效果"
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: "成本"
        }
      ]
    }
  ]
};
</script>

<style scoped lang="scss">
.echarts {
  width: 100%;
  height: 100%;
}
</style>
