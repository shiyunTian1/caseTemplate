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

var scaleData = [
  {
    name: "工程建设",
    value: 10
  },
  {
    name: "产权交易",
    value: 10
  },
  {
    name: "土地交易",
    value: 30
  },
  {
    name: "其他交易",
    value: 10
  },
  {
    name: "土地交易",
    value: 10
  },
  {
    name: "其他交易",
    value: 10
  }
];
// 随机颜色
var rich = {
  white: {
    color: "##303133",
    align: "center",
    padding: [3, 0]
  }
};
var placeHolderStyle = {
  normal: {
    label: {
      show: false
    },
    labelLine: {
      show: false
    },
    color: "rgba(0, 0, 0, 0)",
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0
  }
};
function bg2() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

function rancolors(len) {
  var color = [];
  for (var i = 0; i <= len; i++) {
    var sjys = bg2();
    color.push(sjys);
    for (var i = 0; i < color.length; i++) {
      if ((color[i] = sjys)) {
        color[i] = bg2();
      }
    }
  }
  return color;
}
var data = [];
var color = rancolors(7);
for (var i = 0; i < scaleData.length; i++) {
  data.push(
    {
      value: scaleData[i].value,
      name: scaleData[i].name,
      itemStyle: {
        normal: {
          borderWidth: 20,
          shadowBlur: 20,
          borderColor: color[i],
          shadowColor: color[i]
        },
        color: "rgba(0, 0, 0, 0)"
      }
    },
    {
      value: 50,
      name: "",
      itemStyle: placeHolderStyle
    }
  );
}
var seriesObj = [
  {
    name: "",
    type: "pie",
    clockWise: false,
    radius: [30, 60],
    hoverAnimation: false,
    itemStyle: {
      normal: {
        label: {
          show: true,
          position: "outside",
          color: "#303133",
          formatter: function (params) {
            var percent = 0;
            var total = 0;
            for (var i = 0; i < scaleData.length; i++) {
              total += scaleData[i].value;
            }
            percent = ((params.value / total) * 100).toFixed(0);
            if (params.name !== "") {
              return params.name + "\n{white|" + "占比" + percent + "%}";
            } else {
              return "";
            }
          },
          rich: rich
        },
        labelLine: {
          length: 30,
          length2: 100,
          show: true,
          color: "#000"
        }
      },
      color: "#000"
    },
    data: data
  }
];

const option = {
  tooltip: {
    show: false
  },
  legend: {
    show: false
  },
  toolbox: {
    show: false
  },
  series: seriesObj
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
