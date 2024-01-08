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

const option = {
  color: [
    "#FAE927",
    "#E9E416",
    "#C9DA36",
    "#9ECB3C",
    "#6DBC49",
    "#37B44E",
    "#3DBA78",
    "#14ADCF",
    "#209AC9",
    "#1E91CA",
    "#2C6BA0",
    "#2B55A1",
    "#2D3D8E",
    "#44388E",
    "#6A368B",
    "#7D3990",
    "#A63F98",
    "#C31C88",
    "#D52178",
    "#D5225B",
    "#D02C2A",
    "#D44C2D",
    "#F57A34",
    "#FA8F2F",
    "#D99D21",
    "#CF7B25",
    "#CF7B25",
    "#CF7B25"
  ],

  calculable: true,
  series: [
    {
      name: "",
      type: "pie",
      startAngle: 0,
      clockwise: false,
      radius: ["30%", "120%"],
      center: ["50%", "62%"],
      roseType: "area",
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: "inside",
        formatter: "{c}",

        textStyle: {
          fontWeight: "100",
          fontFamily: "Microsoft YaHei",
          color: "#000"
          // fontSize: 8
        }
      },

      itemStyle: {
        normal: {
          // color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
          //     offset: 0,
          //     color: '#ef29b1'
          // }, {
          //     offset: 1,
          //     color: '#fd7225'
          // }]),
          borderWidth: 3,
          borderColor: "#fff",
          shadowColor: "#fff",
          shadowBlur: 30
        }
      },
      data: [
        {
          value: 600,
          name: "A"
        },
        {
          value: 1100,
          name: "B"
        },
        {
          value: 1200,
          name: "C"
        },
        {
          value: 1300,
          name: "D"
        },
        {
          value: 1250,
          name: "E"
        },
        {
          value: 400,
          name: "F"
        },
        {
          value: 680,
          name: "G"
        },
        {
          value: 850,
          name: "H"
        },
        {
          value: 470,
          name: "I"
        },
        {
          value: 780,
          name: "J"
        },
        {
          value: 680,
          name: "K"
        },
        {
          value: 880,
          name: "L"
        },
        {
          value: 1201,
          name: "M"
        },
        {
          value: 540,
          name: "N"
        },
        {
          value: 960,
          name: "O"
        },
        {
          value: 1280,
          name: "P"
        }
      ].sort(function (a, b) {
        return b.value - a.value;
      })
    },
    {
      type: "pie",
      radius: ["28.5%", "30%"],
      data: [100],
      center: ["50%", "62%"],
      itemStyle: {
        normal: {
          color: "#A",
          shadowColor: "#000",
          shadowBlur: 15,
          shadowOffsetX: "0",
          shadowOffsetY: "0"
        }
      },
      hoverAnimation: false,
      label: {
        show: false
      }
    },
    {
      type: "pie",
      radius: ["26.5%", "27%"],
      data: [100],
      center: ["50%", "62%"],
      color: "#000",
      hoverAnimation: false,
      label: {
        show: false
      }
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
