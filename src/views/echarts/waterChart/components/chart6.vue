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

const indicator = [
  {
    text: "1",
    max: 6000
  },
  {
    text: "2",
    max: 5000
  },
  {
    text: "3",
    max: 5000
  },
  {
    text: "4",
    max: 5000
    //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
  },
  {
    text: "5",
    max: 5000
  },
  {
    text: "6",
    max: 5000
  },
  {
    text: "7",
    max: 5000
    //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
  },
  {
    text: "8",
    max: 5000
  },
  {
    text: "9",
    max: 5000
  }
];

const colorArr = ["#FF123E", "#00D8FF"];
const radarValue = [
  [4300, 4700, 3600, 3900, 3800, 4200, 4300, 4700, 3600],
  [3200, 3000, 3400, 2000, 3900, 2000, 3200, 3000, 3400]
];
const legendData = ["多遇地震-功能损失", "多遇地震—恢复时间"];
const dataArr = [];
radarValue.map((item, index) => {
  dataArr.push({
    value: item,
    name: legendData[index],
    // itemStyle: {
    //     normal: {
    //         lineStyle: {
    //             color: '#FF123E',
    //             // shadowColor: '#4A99FF',
    //             // shadowBlur: 10,
    //         },
    //         shadowColor: '#FF123E',
    //         shadowBlur: 10,
    //     },
    // },
    areaStyle: {
      normal: {
        // 单项区域填充样式
        color: {
          type: "linear",
          x: 0, //右
          y: 0, //下
          x2: 1, //左
          y2: 1, //上
          colorStops: [
            {
              offset: 0,
              color: colorArr[index]
            },
            {
              offset: 0.5,
              color: "rgba(0,0,0,0)"
            },
            {
              offset: 1,
              color: colorArr[index]
            }
          ],
          globalCoord: false
        },
        opacity: 1 // 区域透明度
      }
    }
  });
});
const option = {
  color: colorArr,
  legend: {
    orient: "horizontal",
    icon: "diamond", //图例形状
    data: legendData,
    bottom: 0,
    // right: 20,
    itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
    itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
    itemGap: 50, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
    textStyle: {
      fontSize: 14,
      color: "#999"
    }
  },
  radar: {
    // shape: 'circle',
    name: {
      textStyle: {
        color: "#fff",
        fontSize: 14
      }
    },
    indicator: indicator,
    splitArea: {
      // 坐标轴在 grid 区域中的分隔区域，默认不显示。
      show: true,
      areaStyle: {
        // 分隔区域的样式设置。
        color: ["rgba(255,255,255,0)", "rgba(255,255,255,0)"] // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
      }
    },
    axisLine: {
      //指向外圈文本的分隔线样式
      lineStyle: {
        color: "#1D6B86"
      }
    },
    splitLine: {
      lineStyle: {
        color: "#1D6B86", // 分隔线颜色
        width: 1 // 分隔线线宽
      }
    }
  },
  series: [
    {
      type: "radar",
      symbolSize: 8,
      // symbol: 'angle',
      data: dataArr
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
  .echarts-container {
    height: 240px;
    padding: 10px;
  }
}
</style>
