<template>
  <div class="line-title">
    <p class="title">{{ titleName }}</p>
    <div class="echarts-container">
      <ECharts :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import echarts, { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";
const props = defineProps({
  titleName: {
    type: String,
    default: "水球图"
  }
});
const data = {
  type: 0, //0-5 0 为 优  良 轻度 中度 重度 严重
  widthString: "300px", // 宽度,
  text: "50%", //显示文本
  fontSize: "50px", //文本字号
  amplitude: 12, //水波振幅
  numArr: [0.5, 0.5]
};

let color = "#23cc72";
let fontColor = "#23cc72";
switch (data.type) {
  case 0: {
    fontColor = "#23cc72";
    color = "rgba(35,204,114,.5)";
    break;
  }
  case 1: {
    fontColor = "#f8c21c";
    color = "rgba(248,194,28,.1)";
    break;
  }
  case 2: {
    fontColor = "#fe9837";
    color = "rgba(254,152,55,.1)";
    break;
  }
  case 3: {
    fontColor = "#f86965";
    color = "rgba(248,105,101,.1)";
    break;
  }
  case 4: {
    fontColor = "#e4387f";
    color = "rgba(228,56,127,.1)";
    break;
  }
  case 5: {
    fontColor = "#b61f7e";
    color = "rgba(182,31,126,.1)";
    break;
  }
}

const Pie = () => {
  let dataArr = [];
  for (var i = 0; i < 180; i++) {
    if (i % 3 === 0) {
      dataArr.push({
        name: (i + 1).toString(),
        value: 25,
        itemStyle: {
          normal: {
            color: fontColor,
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)"
          }
        }
      });
    } else {
      dataArr.push({
        name: (i + 1).toString(),
        value: 10,
        itemStyle: {
          normal: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
            borderColor: "rgba(0,0,0,0)"
          }
        }
      });
    }
  }
  return dataArr;
};
Pie();
const option = {
  title: {
    text: "",
    textStyle: {
      fontWeight: "normal",
      fontSize: 25,
      color: "rgb(97, 142, 205)"
    }
  },
  series: [
    {
      type: "liquidFill",
      radius: "60%",
      center: ["50%", "50%"],
      amplitude: data.amplitude || 10,
      data: data.numArr, // data个数代表波浪数
      color: [color],
      backgroundStyle: {
        borderWidth: 1,
        borderColor: fontColor,
        color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
          {
            offset: 0,
            color: "rgba(0, 0, 0,0)"
          },
          {
            offset: 1,
            color: "rgba(0, 0, 0,0)"
          }
        ])
      },
      // itemStyle:{
      //     opacity:0.4
      // },
      label: {
        normal: {
          position: ["50%", "30%"],
          // align:'right',
          formatter: data.text || "",
          textStyle: {
            fontSize: data.fontSize,
            color: fontColor
          }
        }
      },
      outline: {
        show: false
      }
    },
    {
      type: "pie",
      center: ["50%", "50%"],
      radius: ["70%", "88%"],
      hoverAnimation: false,

      data: [
        {
          name: "",
          value: 500,
          labelLine: {
            show: false
          },
          itemStyle: {
            color: color,
            opacity: 0.5
          },
          emphasis: {
            labelLine: {
              show: false
            },
            itemStyle: {
              color: color
            }
          }
        }
      ]
    },
    {
      type: "pie",
      zlevel: 0,
      silent: true,
      radius: ["85%", "90%"],
      z: 10,
      itemStyle: {
        normal: {
          areaColor: "rgba(137, 137, 137, .3)",
          borderColor: "#888"
        },
        emphasis: {
          label: {
            show: false
          },
          areaColor: "rgba(255, 255, 255, .1)"
        }
      },
      label: {
        normal: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: Pie()
    }
    // {
    //     name: '',
    //     type: 'gauge',
    //     radius: '100%', // 和占比环重合
    //     center: ['50%', '50%'],
    //     startAngle: -180,
    //     endAngle: 179.9999,
    //     splitNumber: 90, // 分成20个小分隔
    //     hoverAnimation: true,
    //     z: 10,
    //     axisTick: {
    //         show: false
    //     },
    //     splitLine: {
    //         length: 10,
    //         lineStyle: {
    //             width: 4,
    //             color: fontColor
    //         }
    //     },
    //     axisLabel: {
    //         show: false
    //     },
    //     pointer: {
    //         show: false
    //     },
    //     axisLine: {
    //         lineStyle: {
    //             opacity: 0
    //         }
    //     },
    //     detail: {
    //         show: false
    //     },
    //     data: [
    //         {
    //             value: 0,
    //             name: ''
    //         }
    //     ]
    // }
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
  .echarts-container {
    height: 240px;
    padding: 10px;
  }
}
</style>
