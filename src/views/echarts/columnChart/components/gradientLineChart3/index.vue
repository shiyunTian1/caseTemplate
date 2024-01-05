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
const props = defineProps({
  titleName: {
    type: String,
    default: "柱状图"
  }
});

const spNum = 5,
  _max = 100;
const legendData = ["常住人口", "户籍人口", "农村人口", "城镇居民"];
const y_data = ["成都市", "绵阳市", "自贡市", "攀枝花市", "泸州市", "德阳市"];
const _datamax = [100, 100, 100, 100, 100, 100],
  _data1 = [10, 15, 10, 13, 15, 11],
  _data2 = [19, 5, 40, 33, 15, 51],
  _data3 = [21, 55, 10, 13, 35, 11],
  _data4 = [21, 55, 10, 13, 35, 11];
const fomatter_fn = function (v) {
  return ((v.value / _max) * 100).toFixed(0);
};
const _label = {
  normal: {
    show: true,
    position: "inside",
    formatter: fomatter_fn,
    textStyle: {
      color: "#fff",
      fontSize: 16
    }
  }
};

const option = {
  // legend: {
  //   data: legendData,
  //   textStyle: {
  //     color: "#303133",
  //   },
  // },
  grid: {
    left: "2%",
    right: "2%",
    bottom: "2%",
    top: "2%",
    containLabel: true
  },
  tooltip: {
    show: true,
    backgroundColor: "#fff",
    borderColor: "#ddd",
    borderWidth: 1,
    textStyle: {
      color: "#3c3c3c",
      fontSize: 16
    },
    formatter: function (p) {
      console.log(p);
      const _arr = p.seriesName.split("/"),
        idx = p.seriesIndex; //1，2，3
      return (
        "名称：" + p.seriesName + "<br>" + "完成：" + p.value + "<br>" + "占比：" + ((p.value / _max) * 100).toFixed(0) + "%"
      );
    },
    extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)"
  },
  xAxis: {
    splitNumber: spNum,
    interval: _max / spNum,
    max: _max,
    axisLabel: {
      show: false,
      formatter: function (v) {
        const _v = ((v / _max) * 100).toFixed(0);
        return _v == 0 ? _v : _v + "%";
      }
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    splitLine: {
      show: false
    }
  },
  yAxis: [
    {
      data: y_data,
      axisLabel: {
        fontSize: 12,
        color: "#303133"
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    {
      show: false,
      data: y_data,
      axisLine: {
        show: false
      }
    }
  ],
  series: [
    {
      type: "bar",
      name: "常住人口",
      stack: "2",
      label: _label,
      legendHoverLink: false,
      barWidth: 10,
      itemStyle: {
        normal: {
          color: "#7E47FF"
        },
        emphasis: {
          color: "#7E47FF"
        }
      },
      data: _data1
    },
    {
      type: "bar",
      name: "户籍人口",
      stack: "2",
      legendHoverLink: false,
      barWidth: 40,
      label: _label,
      itemStyle: {
        normal: {
          color: "#FD5916"
        },
        emphasis: {
          color: "#FD5916"
        }
      },
      data: _data2
    },
    {
      type: "bar",
      stack: "2",
      name: "农村人口",
      legendHoverLink: false,
      barWidth: 40,
      label: _label,
      itemStyle: {
        normal: {
          color: "#01A4F7"
        },
        emphasis: {
          color: "#01A4F7"
        }
      },
      data: _data3
    },
    {
      type: "bar",
      stack: "2",
      name: "城镇居民",
      legendHoverLink: false,
      barWidth: 40,
      label: _label,
      itemStyle: {
        normal: {
          color: "#2EDDCD"
        },
        emphasis: {
          color: "#2EDDCD"
        }
      },
      data: _data4
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
