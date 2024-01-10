<template>
  <div class="card mb10">
    <h4 class="title">图标编辑</h4>
    <span class="text"> 图标编辑 </span>
  </div>
  <div class="card editor-container">
    <div class="left">
      <EcharsEditor :option="option" />
    </div>
    <div class="right">
      <el-button type="primary" size="small" @click="refreshChart">运行/刷新</el-button>
      <div class="echars-coontainer">
        <ECharts :option="_option" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import EcharsEditor from "./components/editor.vue";
import ECharts from "@/components/ECharts/index.vue";

import { EcharsData } from "./components/data";

const option = ref(EcharsData);
const funCode = new Function(`option=null;${option.value.code};return option;`);
const _option = funCode();

// 运行、刷新
const refreshChart = () => {};
</script>

<style scoped lang="scss">
.title {
  margin-top: 0;
}
.editor-container {
  display: flex;
  .left,
  .right {
    width: 50%;
    height: 76.3vh;
  }
  .right {
    display: flex;
    flex-direction: column;
    .el-button {
      width: 80px;
      height: 40px;
      margin-bottom: 10px;
      border-radius: 4px;
    }
    .echars-coontainer {
      width: 100;
      height: 70vh;
    }
  }
}
</style>
