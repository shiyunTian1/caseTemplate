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
    default: "雷达图"
  }
});
var data = [80, 70, 60, 85, 72, 80, 72, 75];
var indicatorname = ["产品1", "产品2", "产品3", "产品4", "产品5", "产品6", "产品7", "产品8"];
var maxdata = [100, 100, 100, 100, 100, 100, 100, 100];

function contains(arrays, obj) {
  var i = arrays.length;
  while (i--) {
    if (arrays[i] === obj) {
      return i;
    }
  }
  return false;
}

var indicator = [];
for (var i = 0; i < indicatorname.length; i++) {
  indicator.push({
    name: indicatorname[i],
    max: maxdata[i]
  });
}

function innerdata(i) {
  var innerdata = [];
  for (let j = 0; j < data.length; j++) {
    innerdata.push(100 - 20 * i);
  }
  return innerdata;
}

const optionData = getData(data);

function getData(data) {
  var res = {
    series: [
      {
        type: "radar",
        symbolSize: 10,
        symbol: "circle",
        areaStyle: {
          color: "#39B2FF",
          opacity: 0.3
        },
        lineStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#00A2FF"
              },
              {
                offset: 1,
                color: "#0060FF"
              }
            ],
            false
          ),
          width: 3
        },
        itemStyle: {
          color: "#fff ",
          borderColor: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#00DEFF"
              },
              {
                offset: 1,
                color: "#1598FF"
              }
            ],
            false
          ),
          borderWidth: 4,
          opacity: 1
        },
        label: {
          show: false
        },
        data: [
          {
            value: data
          }
        ],
        z: 100
      }
    ]
  };
  for (let i = 0; i < data.length; i++) {
    res.series.push({
      type: "radar",
      data: [
        {
          value: innerdata(i)
        }
      ],
      symbol: "none",
      lineStyle: {
        width: 0
      },
      itemStyle: {
        color: "#fff"
      },
      areaStyle: {
        color: "#fff",
        shadowColor: "rgba(14,122,191,0.15)",
        shadowBlur: 30,
        shadowOffsetY: 20
      }
    });
  }
  return res;
}
const option = {
  radar: {
    indicator: indicator,
    splitArea: {
      show: true,
      areaStyle: {
        color: "#fff",
        shadowColor: "rgba(14,122,191,0.19)",
        shadowBlur: 30,
        shadowOffsetY: 20
      }
    },
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    name: {
      textStyle: {
        rich: {
          a: {
            fontSize: "12",
            color: "#333",
            align: "left",
            lineHeight: "30",
            fontWeight: "bold"
          },
          b: {
            fontSize: "12",
            color: "#666",
            align: "left"
          }
        }
      },

      formatter: function (params, index) {
        var i = contains(indicatorname, params);
        var percent = (data[i] / 100) * 100;
        return "{b|" + params + "}";
      }
    }
  },
  series: optionData.series
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
