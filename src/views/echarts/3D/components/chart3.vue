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
    default: "柱状图"
  },
  titileArr: {
    type: Array,
    default: ["12:00", "12:30", "1:00", "1:30", "2:00"]
  },
  dataList: {
    type: Array,
    default: [
      {
        name: "数据1",
        value: 175.17
      },
      {
        name: "数据2",
        value: 148.35
      },
      {
        name: "数据3",
        value: 95.36
      },
      {
        name: "数据4",
        value: 56
      }
    ]
  }
});
let { titileArr, dataList } = props;
let data1 = dataList;
let xAxisData = [];
let seriesData = [];
let seriesData1 = [];
let ciolData = [];
let sum = 0;
let bottomData = [];
let topData = [];
let ciolColor1 = [
  "rgba(8, 177, 255, 1)",
  "rgba(0, 255, 136,   1)",
  "rgba(8, 177, 255, 1)",
  "rgba(251, 171, 88,   1)",
  "rgba(8, 177, 255, 1)",
  "rgba(251, 171, 88,   1)",
  "rgba(8, 177, 255, 1)",
  "rgba(251, 171, 88,   1)"
];
let ciolColor0 = [
  "rgba(107, 255, 243,  1)",
  "rgba(97,253,196,  1)",

  "rgba(107, 255, 243,  1)",
  "rgba(253, 221, 97,  1)",

  "rgba(107, 255, 243,  1)",
  "rgba(253, 221, 97,  1)",
  "rgba(107, 255, 243,  1)",
  "rgba(253, 221, 97,  1)"
];
let bottomColor0 = [
  "rgba(8, 177, 255, 0.8)",
  "rgba(0, 255, 136, 0.8)",

  "rgba(8, 177, 255, 0.8)",
  "rgba(251, 171, 88, 0.8)",

  "rgba(8, 177, 255, 0.8)",
  "rgba(251, 171, 88, 0.8)",
  "rgba(8, 177, 255, 0.8)",
  "rgba(251, 171, 88, 0.8)"
];
let bottomColor1 = [
  "rgba(107, 255, 243, 0.8)",
  "rgba(100,253,212,0.8)",

  "rgba(107, 255, 243, 0.8)",
  "rgba(253, 227, 100,0.8)",

  "rgba(107, 255, 243, 0.8)",
  "rgba(253, 227, 100,0.8)",
  "rgba(107, 255, 243, 0.8)",
  "rgba(253, 227, 100,0.8)"
];
let header0 = [
  "rgba(8, 177, 255, 1)",
  "rgba(0, 255, 136, 1)",

  "rgba(8, 177, 255, 1)",
  "rgba(251, 171, 88, 1)",

  "rgba(8, 177, 255, 1)",
  "rgba(251, 171, 88, 1)",
  "rgba(8, 177, 255, 1)",
  "rgba(251, 171, 88, 1)"
];
let header1 = [
  "rgba(107, 255, 243, 1)",
  "rgba(100,253,212,1)",

  "rgba(107, 255, 243, 1)",
  "rgba(253, 227, 100,1)",

  "rgba(107, 255, 243, 1)",
  "rgba(253, 227, 100,1)",
  "rgba(107, 255, 243, 1)",
  "rgba(253, 227, 100,1)"
];
let bottom = [
  "rgba(31, 194, 252, 0.4)",
  "rgba(0, 255, 136, 0.4)",
  "rgba(31, 194, 252, 0.4)",
  "rgba(253, 179, 88, 0.4)",
  "rgba(31, 194, 252, 0.4)",
  "rgba(253, 179, 88, 0.4)",
  "rgba(31, 194, 252, 0.4)",
  "rgba(253, 179, 88, 0.4)",
  "rgba(31, 194, 252, 0.4)",
  "rgba(253, 179, 88, 0.4)"
];

data1.forEach(item => {
  xAxisData.push(item.name);
  seriesData.push(item.value);
  seriesData1.push({ name: "", value: item.value });
  ciolData.push({ name: "", value: "0" });
  sum += item.value;
});
data1.forEach(item => {
  bottomData.push({ name: "", value: sum - item.value });
  topData.push({ name: "", value: sum });
});
const option = {
  grid: {
    top: "5%",
    left: "10%",
    right: "9%",
    bottom: "20%"
  },
  tooltip: {
    show: true,
    formatter: function (params) {
      let text =
        '<p  style="font-size:16px;font-weight: 400;color:rgba(255, 255, 255, 1);margin-bottom: 20px;"><span style="display:inline-block;width:10px;height: 10px;background: ' +
        // v2L2Chart.color[params.dataIndex] +
        ';border-radius: 50%;margin-right: 10px;"></span>' +
        data1[params.dataIndex].value +
        // v2L2Chart.xData[params.dataIndex] +
        "：" +
        // v2L2Chart.data[params.dataIndex] +
        "万</p>";
      return text;
    },
    // formatter: (params) => {
    //     return v2L2Chart.xData[params.dataIndex] + ':' + v2L2Chart.data[params.dataIndex] + '万';

    // },
    backgroundColor: "rgba(38, 68, 110, 0.8)",
    padding: 10,
    borderColor: "rgba(38, 68, 110, 1)",
    textStyle: {
      color: "#303133"
    }
  },

  xAxis: {
    offset: 20,
    data: xAxisData,
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: "#303133",
        fontSize: 12
      }
    }
  },
  yAxis: {
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  series: [
    //'最低下的圆片',
    {
      name: "最低下的圆片",
      stack: "a",
      // type: 'pictorialBar',
      // symbolSize: [33, 12],
      // symbolOffset: [0, 6],
      type: "effectScatter",
      symbolSize: [62, 12],
      symbolOffset: [0, 0],
      z: 22,
      itemStyle: {
        normal: {
          color: function (params) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: ciolColor0[params.dataIndex]
              },
              {
                offset: 0,
                color: ciolColor1[params.dataIndex]
              }
            ]);
          }
        }
      },
      data: ciolData
    },
    //下半截柱状图
    {
      name: "下半截柱状图",
      stack: "a",
      type: "bar",
      barWidth: 33,
      z: 2,
      barGap: "-100%",
      itemStyle: {
        normal: {
          color: function (params) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: bottomColor1[params.dataIndex]
              },
              {
                offset: 0,
                color: bottomColor0[params.dataIndex]
              }
            ]);
          }
        }
      },
      data: seriesData1
    },
    //替代柱状图 默认不显示颜色，是最下方柱图的value值 - 20'
    {
      name: "替代柱状图 默认不显示颜色，是最下方柱图的value值 - 20",
      // stack: '',
      type: "bar",
      barWidth: 33,
      barGap: "-100%",
      // stack: '广告',
      itemStyle: {
        color: "transparent"
      },
      data: seriesData
    },
    //头部1
    {
      name: "头部1",
      stack: "a",
      type: "pictorialBar",
      symbolSize: [33, 12],
      symbolOffset: [0, -6],
      z: 22,
      itemStyle: {
        normal: {
          color: function (params) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: header1[params.dataIndex]
              },
              {
                offset: 0,
                color: header0[params.dataIndex]
              }
            ]);
          }
        }
      },
      symbolPosition: "end",
      label: {
        formatter: "{c} 万",
        color: "#303133",
        offset: [0, -5],
        show: true,
        position: "top",
        fontSize: 12,
        fontWeight: 400,
        fontFamily: "zcool-gdh"
      },
      data: seriesData1
    },
    //头部2
    {
      name: "头部2",
      stack: "a",
      type: "pictorialBar",
      symbolSize: [33, 12],
      symbolOffset: [0, -6],
      symbolPosition: "end",
      z: 22,
      itemStyle: {
        normal: {
          color: function (params) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: header1[params.dataIndex]
              },
              {
                offset: 0,
                color: header0[params.dataIndex]
              }
            ]);
          }
        }
      },
      data: topData
    },
    //底色
    {
      name: "底色",
      stack: "a",
      type: "bar",
      barWidth: 33,
      z: 2,
      barGap: "-100%",
      // stack: '',
      symbolPosition: "end",
      itemStyle: {
        normal: {
          color: function (params) {
            return bottom[params.dataIndex];
          }
        }
      },
      data: bottomData
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
