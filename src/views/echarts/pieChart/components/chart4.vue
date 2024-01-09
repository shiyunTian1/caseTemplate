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
  title: {
    text: "作业管理",
    textStyle: {
      color: "#fff"
    }
  },

  tooltip: {
    show: true
  },
  series: [
    {
      type: "pie",
      radius: ["65%", "75%"],
      center: ["50%", "50%"],
      hoverAnimation: false,
      z: 10,
      data: [
        {
          value: 30,
          name: "运行中",
          itemStyle: {
            color: "#0286ff"
          }
        },
        {
          value: 30,
          name: "已停止",
          itemStyle: {
            color: "#ffd302"
          }
        },
        {
          value: 40,
          name: "制作中",
          itemStyle: {
            color: "#fb5274"
          }
        }
      ],
      labelLine: {
        show: false
      }
    },
    {
      type: "pie",
      radius: ["54%", "64%"],
      center: ["50%", "50%"],
      hoverAnimation: false,
      label: {
        show: false
      },
      data: [
        {
          value: 30,
          name: "运行中",
          itemStyle: {
            color: "#0286ff",
            opacity: 0.4
          }
        },
        {
          value: 30,
          name: "已停止",
          itemStyle: {
            color: "#ffd302",
            opacity: 0.4
          }
        },
        {
          value: 40,
          name: "未上线",
          itemStyle: {
            color: "#fb5274",
            opacity: 0.4
          }
        }
      ],
      labelLine: {
        show: false
      }
    },
    {
      type: "pie",
      radius: ["43%", "53%"],
      center: ["50%", "50%"],
      hoverAnimation: false,
      label: {
        show: false
      },
      data: [
        {
          value: 30,
          name: "运行中",
          itemStyle: {
            color: "#0286ff",
            opacity: 0.1
          }
        },
        {
          value: 30,
          name: "已停止",
          itemStyle: {
            color: "#ffd302",
            opacity: 0.1
          }
        },
        {
          value: 40,
          name: "未上线",
          itemStyle: {
            color: "#fb5274",
            opacity: 0.1
          }
        }
      ],
      labelLine: {
        show: false
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
