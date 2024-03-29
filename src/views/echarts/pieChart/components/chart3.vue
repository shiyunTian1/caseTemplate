<template>
  <div class="line-title">
    <p class="title">{{ titleName }}</p>
    <div class="echars-container">
      <ECharts id="myChart" :option="option" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";
import * as echarts from "echarts";

var xData = (function () {
  var data = [] as string[];
  for (var i = 1; i < 31; i++) {
    data.push(i + "日");
  }
  return data;
})();

const props = defineProps({
  titleName: {
    type: String,
    default: "饼图"
  }
});

let angle = 0; //角度，用来做简单的动画效果的
let value = 80;

//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
function getCirlPoint(x0, y0, r, angle) {
  let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
  let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
  return {
    x: x1,
    y: y1
  };
}

const option = {
  // backgroundColor: "#000E1A",
  title: {
    text: "{a|" + value + "}{c|%}",
    x: "center",
    y: "center",
    textStyle: {
      rich: {
        a: {
          fontSize: 38,
          color: "#29EEF3"
        },

        c: {
          fontSize: 20,
          color: "#999"
          // padding: [5,0]
        }
      }
    }
  },

  series: [
    // 紫色
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
            startAngle: ((0 + angle) * Math.PI) / 180,
            endAngle: ((90 + angle) * Math.PI) / 180
          },
          style: {
            stroke: "#8383FA",
            fill: "transparent",
            lineWidth: 1.5
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: "ring5", //紫点
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
        let point = getCirlPoint(x0, y0, r, 90 + angle);
        return {
          type: "circle",
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: "#8450F9", //绿
            fill: "#8450F9"
          },
          silent: true
        };
      },
      data: [0]
    },
    // 蓝色

    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
            startAngle: ((180 + angle) * Math.PI) / 180,
            endAngle: ((270 + angle) * Math.PI) / 180
          },
          style: {
            stroke: "#4386FA",
            fill: "transparent",
            lineWidth: 1.5
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: "ring5", // 蓝色
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
        let point = getCirlPoint(x0, y0, r, 180 + angle);
        return {
          type: "circle",
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: "#4386FA", //绿
            fill: "#4386FA"
          },
          silent: true
        };
      },
      data: [0]
    },

    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
            startAngle: ((270 + -angle) * Math.PI) / 180,
            endAngle: ((40 + -angle) * Math.PI) / 180
          },
          style: {
            stroke: "#0CD3DB",
            fill: "transparent",
            lineWidth: 1.5
          },
          silent: true
        };
      },
      data: [0]
    },
    // 橘色

    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        return {
          type: "arc",
          shape: {
            cx: api.getWidth() / 2,
            cy: api.getHeight() / 2,
            r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
            startAngle: ((90 + -angle) * Math.PI) / 180,
            endAngle: ((220 + -angle) * Math.PI) / 180
          },
          style: {
            stroke: "#FF8E89",
            fill: "transparent",
            lineWidth: 1.5
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: "ring5",
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
        let point = getCirlPoint(x0, y0, r, 90 + -angle);
        return {
          type: "circle",
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: "#FF8E89", //粉
            fill: "#FF8E89"
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: "ring5", //绿点
      type: "custom",
      coordinateSystem: "none",
      renderItem: function (params, api) {
        let x0 = api.getWidth() / 2;
        let y0 = api.getHeight() / 2;
        let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
        let point = getCirlPoint(x0, y0, r, 270 + -angle);
        return {
          type: "circle",
          shape: {
            cx: point.x,
            cy: point.y,
            r: 4
          },
          style: {
            stroke: "#0CD3DB", //绿
            fill: "#0CD3DB"
          },
          silent: true
        };
      },
      data: [0]
    },
    {
      name: "",
      type: "pie",
      radius: ["52%", "40%"],
      silent: true,
      clockwise: true,
      startAngle: 90,
      z: 0,
      zlevel: 0,
      label: {
        normal: {
          position: "center"
        }
      },
      data: [
        {
          value: value,
          name: "",
          itemStyle: {
            normal: {
              color: {
                // 完成的圆环的颜色
                colorStops: [
                  {
                    offset: 0,
                    color: "#A098FC" // 0% 处的颜色
                  },
                  {
                    offset: 0.3,
                    color: "#4386FA" // 0% 处的颜色
                  },
                  {
                    offset: 0.6,
                    color: "#4FADFD" // 0% 处的颜色
                  },
                  {
                    offset: 0.8,
                    color: "#0CD3DB" // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#646CF9" // 100% 处的颜色
                  }
                ]
              }
            }
          }
        },
        {
          value: 100 - value,
          name: "",
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: "#E3F0FF"
            }
          }
        }
      ]
    },
    {
      name: "",
      type: "pie",
      radius: ["32%", "35%"],
      silent: true,
      clockwise: true,
      startAngle: 270,
      z: 0,
      zlevel: 0,
      label: {
        normal: {
          position: "center"
        }
      },
      data: [
        {
          value: value,
          name: "",
          itemStyle: {
            normal: {
              color: {
                // 完成的圆环的颜色
                colorStops: [
                  {
                    offset: 0,
                    color: "#00EDF3" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#646CF9" // 100% 处的颜色
                  }
                ]
              }
            }
          }
        },
        {
          value: 100 - value,
          name: "",
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              color: "#E3F0FF"
            }
          }
        }
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
