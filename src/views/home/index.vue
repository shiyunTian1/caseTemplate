<template>
  <div class="home">
    <div v-for="item in projectarr" :key="item.id" class="card" @click="handleCard">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const projectarr = ref([
  {
    name: "螺旋锚基础有限分析与设计软件",
    image: "@/assets/images/home/lxm.png",
    url: "http://lxmtest_ylsas_com"
  },
  {
    name: "土壤与地下水污染风险管控系统",
    image: "@/assets/images/home/webtest3.png",
    url: "http://webtest3.ylsas.com"
  },
  {
    name: "中条山尾矿库智慧管理系统",
    image: "@/assets/images/home/tailingpond_test.png",
    url: "http://tailingpond_test.ylsas.com"
  },
  {
    name: "河北应急厅尾矿库",
    image: "@/assets/images/home/tailingpond.png",
    url: "http://tailingpond.ylsas.com"
  },
  {
    name: "尾矿库风险评估系统",
    image: "@/assets/images/home/gjyjb.png",
    url: "http://gjyjb.ylsas.com"
  },
  {
    name: "桥梁项目",
    image: "@/assets/images/home/bridge.png",
    url: "http://webtest.cloudansys.com/bridge/#/Login"
  },
  {
    name: "张家界内涝试点",
    image: "@/assets/images/home/zjjneilaotest.png",
    url: "http://zjjneilaotest.ylsas.com"
  },
  {
    name: "新国展二期项目",
    image: "@/assets/images/home/xgz.png",
    url: "http://xgz.ylsas.com"
  },
  {
    name: "中核1400测试服务",
    image: "@/assets/images/home/zhcs.png",
    url: "http://zhcs.ylsas.com"
  },
  {
    name: "沈阳恒隆市府广场基坑监测试点项目",
    image: "@/assets/images/home/syjk.png",
    url: "http://syjk.ylsas.com"
  },
  {
    name: "数字孪生城市内涝管控平台",
    image: "@/assets/images/home/csnl_test.png",
    url: "http://csnl_test.ylsas.com"
  },
  {
    name: "庄里水库",
    image: "@/assets/images/home/zlsk_test.png",
    url: "http://zlsk_test.ylsas.com"
  }
]);

const handleCard = () => {
  console.log(projectarr.value);
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  .card {
    width: 24%;
    height: 30%;
    margin: 0 10px 10px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
