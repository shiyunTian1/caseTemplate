<template>
  <div class="line-title">
    <p class="title">
      <span>{{ titleName }}</span>
      <el-button plain text bg @click="editEchars">编辑</el-button>
    </p>
    <div class="echars-container">
      <ECharts :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";
import * as echarts from "echarts";
import { useEcharsOptionStore } from "@/stores/modules/echarsOption";
import { useRouter } from "vue-router";
const userOption = useEcharsOptionStore();
const router = useRouter();
const emit = defineEmits(["echartsOption"]);
const props = defineProps({
  titleName: {
    type: String,
    default: "柱状图"
  }
});

const backgroundColor = "#32374d";
const option = {
  // backgroundColor: backgroundColor,
  // legend: {
  //   top: "16%",
  //   textStyle: {
  //     color: "#a4a8b4",
  //   },
  // },
  grid: {
    left: "2%",
    right: "2%",
    bottom: "0%",
    top: "2%",
    containLabel: true
  },
  xAxis: {
    type: "value",
    splitLine: {
      lineStyle: {
        color: "rgba(255,255,255,0.3)"
      }
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      color: "#a4a8b4"
    }
  },
  yAxis: {
    type: "category",
    data: ["E", "D", "C", "B", "A"],
    axisLine: {
      lineStyle: {
        color: "rgba(255,255,255,0.3)"
      }
    },
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      // margin: 10,
      color: "#a4a8b4"
    }
  },
  color: [
    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
      {
        offset: 0,
        color: "rgba(235,112,236,.8)"
      },
      {
        offset: 0.8,
        color: "rgba(77,75,221,.8)"
      },
      {
        offset: 1,
        color: "rgba(77,75,221,0)"
      }
    ]),
    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
      {
        offset: 0,
        color: "rgba(255,157,96,.8)"
      },
      {
        offset: 0.8,
        color: "rgba(246,84,157,.8)"
      },
      {
        offset: 1,
        color: "rgba(246,84,157,0)"
      }
    ]),
    new echarts.graphic.LinearGradient(1, 0, 0, 0, [
      {
        offset: 0,
        color: "rgba(132,225,145,.8)"
      },
      {
        offset: 0.8,
        color: "rgba(106,185,242,.8)"
      },
      {
        offset: 1,
        color: "rgba(106,185,242,0)"
      }
    ])
  ],
  series: [
    {
      name: "",
      type: "bar",
      xAxisIndex: 0, //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
      yAxisIndex: 0, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
      data: [100, 100, 100, 100, 100],
      barWidth: 5,
      itemStyle: {
        normal: {
          color: "rgba(255, 255, 255, .1)"
        }
      },
      z: 1
    },
    {
      name: "A",
      type: "bar",
      stack: "Tik Tok",
      barWidth: 15,
      itemStyle: {
        shadowColor: "#000",
        shadowBlur: 10,
        shadowOffsetY: 0,
        shadowOffsetX: 0,
        borderColor: new echarts.graphic.LinearGradient(
          1,
          0,
          0,
          0,
          [
            {
              offset: 0,
              color: "rgba(240,82,255,1)"
            },
            {
              offset: 0.8,
              color: "rgba(77,75,221,1)"
            },
            {
              offset: 1,
              color: "rgba(77,75,221,0)"
            }
          ],
          false
        ),
        borderWidth: 1
      },
      label: {
        normal: {
          show: true,
          position: "insideRight",
          offset: [-20, 0],
          formatter: "{c}%",
          textStyle: {
            align: "center",
            baseline: "middle",
            fontSize: 14,
            fontWeight: "400",
            color: "#fff",
            textShadowColor: "#000",
            textShadowBlur: "0",
            textShadowOffsetX: 1,
            textShadowOffsetY: 1
          }
        }
      },
      data: [29, 19, 26, 44, 20]
    },
    {
      name: "B",
      type: "bar",
      stack: "Tik Tok",
      barWidth: 15,
      itemStyle: {
        shadowColor: "#000",
        shadowBlur: 10,
        shadowOffsetY: 0,
        shadowOffsetX: 0,
        borderColor: new echarts.graphic.LinearGradient(
          1,
          0,
          0,
          0,
          [
            {
              offset: 0,
              color: "rgba(255,151,60,.8)"
            },
            {
              offset: 0.8,
              color: "rgba(246,84,157,.8)"
            },
            {
              offset: 1,
              color: "rgba(246,84,157,0)"
            }
          ],
          false
        ),
        borderWidth: 1
      },
      label: {
        normal: {
          show: true,
          position: "insideRight",
          offset: [-20, 0],
          formatter: "{c}%",
          textStyle: {
            align: "center",
            baseline: "middle",
            fontSize: 14,
            fontWeight: "400",
            color: "#fff",
            textShadowColor: "#000",
            textShadowBlur: "0",
            textShadowOffsetX: 1,
            textShadowOffsetY: 1
          }
        }
      },
      data: [38, 36, 44, 33, 20]
    },
    {
      name: "C",
      type: "bar",
      stack: "Tik Tok",
      barWidth: 15,
      itemStyle: {
        shadowColor: "#000",
        shadowBlur: 10,
        shadowOffsetY: 0,
        shadowOffsetX: 0,
        borderColor: new echarts.graphic.LinearGradient(
          1,
          0,
          0,
          0,
          [
            {
              offset: 0,
              color: "rgba(102,255,124,.8)"
            },
            {
              offset: 0.8,
              color: "rgba(106,185,242,.8)"
            },
            {
              offset: 1,
              color: "rgba(106,185,242,0)"
            }
          ],
          false
        ),
        borderWidth: 1
      },
      label: {
        normal: {
          show: true,
          position: "insideRight",
          offset: [-20, 0],
          formatter: "{c}%",
          textStyle: {
            align: "center",
            baseline: "middle",
            fontSize: 14,
            fontWeight: "400",
            color: "#fff",
            textShadowColor: "#000",
            textShadowBlur: "0",
            textShadowOffsetX: 1,
            textShadowOffsetY: 1
          }
        }
      },
      data: [33, 45, 30, 23, 60]
    },
    {
      name: "",
      type: "bar",
      data: [100, 100, 100, 100, 100],
      barWidth: 10,
      itemStyle: {
        normal: {
          color: "rgba(255, 255, 255, .1)"
        }
      },
      z: 1
    }
  ]
};

const editEchars = () => {
  console.log(option);
  emit("echartsOption", option);
  userOption.setOption(option);
  router.push("/editorChart/index");
};
</script>

<style scoped lang="scss">
.line-title {
  .title {
    display: flex;
    justify-content: space-between;
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
