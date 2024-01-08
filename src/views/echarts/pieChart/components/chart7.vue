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

const option = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  // legend: {
  //   orient: "vertical",
  //   x: "left",
  //   data: [
  //     "直达",
  //     "营销广告",
  //     "搜索引擎",
  //     "邮件营销",
  //     "联盟广告",
  //     "视频广告",
  //     "百度",
  //     "谷歌",
  //     "必应",
  //     "其他",
  //   ],
  // },
  series: [
    {
      name: "访问来源",
      type: "pie",
      selectedMode: "single",
      radius: [0, "50%"],

      label: {
        normal: {
          position: "inner"
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 335, name: "直达", selected: true },
        { value: 679, name: "营销广告" },
        { value: 1548, name: "搜索引擎" }
      ]
    },
    {
      name: "访问来源",
      type: "pie",
      radius: ["60%", "75%"],

      data: [
        { value: 335, name: "直达" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1048, name: "百度" },
        { value: 251, name: "谷歌" },
        { value: 147, name: "必应" },
        { value: 102, name: "其他" }
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
