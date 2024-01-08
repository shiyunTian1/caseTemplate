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

var val1data2 = [
  {
    value: 0.2,
    name: "装配完成率"
  },
  {
    value: 0.3,
    name: "班检完成率"
  },
  {
    value: 0.4,
    name: "初检完成率"
  },
  {
    value: 0.3,
    name: "复检完成率"
  },
  {
    value: 0.1,
    name: "出厂检完成率"
  }
];

var arr = ["middleLost", 0.6, val1data2, "今日完成进度"];
const option = {
  title: {
    top: "45%",
    left: "center",
    text: arr[3],
    textStyle: {
      color: "#303133",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 14
    },
    subtext: "(占全部的" + ((arr[1] * 10000) / 100).toFixed(2) + "%)",
    subtextStyle: {
      color: "#303133",
      fontSize: 12
    }
  },
  tooltip: {
    trigger: "item",
    formatter: function (res) {
      console.log(res);

      if (res.componentSubType == "liquidFill") {
        return res.seriesName + ": " + ((res.value * 10000) / 100).toFixed(2) + "%";
      } else {
        return '<span class="ii" style="background:' + res.color + ' "></span>' + res.name + ":<br/> " + res.data.value;
      }
    }
  },
  series: [
    {
      type: "liquidFill",
      itemStyle: {
        normal: {
          opacity: 0.4,
          shadowBlur: 0,
          shadowColor: "blue"
        }
      },
      name: arr[3],
      data: [
        {
          value: 0.6,
          itemStyle: {
            normal: {
              color: "#53d5ff",
              opacity: 0.6
            }
          }
        }
      ],
      //  background: '#fff',
      color: ["#53d5ff"],
      center: ["50%", "50%"],
      /*  backgroundStyle: {
                color: '#fff'
            },*/
      label: {
        normal: {
          formatter: "",
          textStyle: {
            fontSize: 12
          }
        }
      },
      outline: {
        itemStyle: {
          borderColor: "#86c5ff",
          borderWidth: 0
        },
        borderDistance: 0
      }
    },
    {
      type: "pie",
      radius: ["50%", "58%"],
      color: ["#c487ee", "#deb140", "#49dff0", "#034079", "#6f81da", "#00ffb4"],
      hoverAnimation: false, ////设置饼图默认的展开样式
      label: {
        show: true,

        normal: {
          formatter: "{b}\n{d}%",
          show: true,
          position: ""
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },

      itemStyle: {
        // 此配置
        normal: {
          borderWidth: 2,
          borderColor: "#fff"
        },
        emphasis: {
          borderWidth: 0,
          shadowBlur: 2,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      },
      data: arr[2]
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
