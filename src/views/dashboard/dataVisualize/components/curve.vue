<template>
  <div class="echarts">
    <ECharts :option="option" />
  </div>
</template>

<script setup lang="ts" name="cure">
import { ECOption } from "@/components/ECharts/config";
import ECharts from "@/components/ECharts/index.vue";
var xData = (function () {
  var data = [] as string[];
  for (var i = 1; i < 9; i++) {
    data.push(i + "日");
  }
  return data;
})();
const curveData = [
  { month: "2022-01", value: 160 },
  { month: "2022-02", value: 165 },
  { month: "2022-03", value: 170 },
  { month: "2022-04", value: 155 },
  { month: "2022-05", value: 168 },
  { month: "2022-06", value: 175 },
  { month: "2022-07", value: 180 },
  { month: "2022-08", value: 178 },
  { month: "2022-09", value: 169 },
  { month: "2022-10", value: 163 },
  { month: "2022-11", value: 165 },
  { month: "2022-12", value: 170 }
];

const option: ECOption = {
  tooltip: {
    trigger: "axis",
    backgroundColor: "transparent",
    axisPointer: {
      type: "none"
    },
    padding: 0,
    formatter: (p: any) => {
      let dom = `<div style="width:100%; height: 70px !important; display:flex;flex-direction: column;justify-content: space-between;padding:10px;box-sizing: border-box;
      color:#fff; background: #6B9DFE;border-radius: 4px;font-size:14px; ">
        <div style="display: flex; align-items: center;"> <div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>  ${p[0].name}</div>
        <div style="display: flex;align-items: center;"><div style="width:5px;height:5px;background:#ffffff;border-radius: 50%;margin-right:5px"></div>数据量 :  ${p[0].value}</div>
      </div>`;
      return dom;
    }
  },
  toolbox: {
    show: true,
    orient: "horizontal"
  },
  grid: {
    left: "50",
    right: "50"
  },
  dataZoom: [
    {
      show: false,
      height: 10,
      xAxisIndex: [0],
      bottom: 0,
      startValue: 0,
      endValue: 9,
      handleStyle: {
        color: "#6b9dfe"
      },
      textStyle: {
        color: "transparent"
      }
    },
    {
      type: "inside",
      show: true,
      height: 0,
      zoomLock: true
    }
  ],
  xAxis: [
    {
      type: "category",
      // data: xData,
      data: curveData.map((val: any) => {
        return {
          value: val.month
        };
      }),
      axisTick: {
        show: false
      },
      axisLabel: {
        margin: 20,
        interval: 0,
        color: "#a1a1a1",
        fontSize: 14,
        formatter: function (name: string) {
          undefined;
          return name.length > 8 ? name.slice(0, 8) + "..." : name;
        }
      },
      axisLine: {
        lineStyle: {
          color: "#c0c0c0"
        }
      }
    }
  ],
  yAxis: [
    {
      min: 0,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#c0c0c0"
        }
      },
      axisLabel: {
        color: "#a1a1a1",
        fontSize: 16,
        fontWeight: 400,
        formatter: function (value: number) {
          if (value === 0) {
            return value + "";
          } else if (value >= 10000) {
            return value / 10000 + "w";
          }
          return value + "";
        }
      }
    }
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
      data: curveData.map((val: any) => {
        return {
          value: val.value
        };
      }),
      barWidth: "45px",
      itemStyle: {
        color: "#e7e6fa",
        borderRadius: [12, 12, 0, 0]
      },
      emphasis: {
        itemStyle: {
          color: "#6B9DFE"
        }
      }
    }
  ]
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
