<!--
 * @Author: qingzi tsy15632385483@163.com
 * @Date: 2024-01-25 18:00:00
 * @LastEditors: qingzi tsy15632385483@163.com
 * @LastEditTime: 2024-02-01 14:40:43
 * @FilePath: \yl_admin_base_project\src\views\dashboard\dataVisualize\components\radar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
let data = [40, 30, 20, 10];
let indicator = [
  {
    name: "20-30",
    max: 40
  },
  {
    name: "30-40",
    max: 50
  },
  {
    name: "40-50",
    max: 50
  },
  {
    name: "50-60",
    max: 50
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
      {
        name: "20-30",
        max: 40
      },
      {
        name: "30-40",
        max: 50
      },
      {
        name: "40-50",
        max: 50
      },
      {
        name: "50-60",
        max: 50
      }
    ]
  },
  series: [
    {
      name: "Budget vs spending",
      type: "radar",
      data: [
        {
          value: [10, 20, 30, 40],
          name: "20-30"
        },
        {
          value: [20, 10, 40, 40],
          name: "30-40"
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
