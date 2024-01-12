<template>
  <div class="card mb10">
    <h4 class="title">图标编辑</h4>
    <span class="text"> 图标编辑 </span>
  </div>
  <div class="card editor-container">
    <div class="left">
      <!-- <EcharsEditor v-model="data" :option="option" /> -->
      <EcharsEditor ref="monacoEdit" :value="ruleForm.content" @contentChange="contentChange"></EcharsEditor>
    </div>
    <div class="right">
      <el-button type="primary" size="small" @click="refreshChart">运行/刷新</el-button>
      <div class="echars-coontainer">
        <ECharts :option="echarsOption" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import EcharsEditor from "./components/editorCopy.vue";
import ECharts from "@/components/ECharts/index.vue";
import { useEcharsOptionStore } from "@/stores/modules/echarsOption";
import { storeToRefs } from "pinia";
import EcharsData from "./components/data";
import { handleEditorData } from "@/utils/handleEditorData";
const getOption = useEcharsOptionStore();
const { echarsOption } = storeToRefs(getOption);
const options = EcharsData;

// console.log(echarsOption.value);

// console.log(EcharsData);
// console.log(options);

const funCode = new Function(`option=null;${EcharsData.code};return option;`);
let _option = funCode();
// console.log(_option);
// const obj = handleEditorData(getOption.$state.echarsOption);
// console.log(obj);

const countent = ref("");
const { ruleForm } = toRefs(
  reactive({
    ruleForm: {
      content: handleEditorData(getOption.$state.echarsOption)
      // content: handleEditorData(getOption.$state.echarsOption),
    }
  })
);

const contentChange = val => {
  //先拿一个值存放monaco组件传递过来的值
  countent.value = val;
  // console.log(countent.value);
  handleData();
};

const handleData = () => {
  console.log(countent.value);
  //   _option = `${countent.value.code}`;

  // const subStr = countent.value.substring(7, countent.value.length - 1);
  // console.log(subStr);

  // const obj = JSON.parse(countent.value);
  // console.log(obj.option);
};
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
