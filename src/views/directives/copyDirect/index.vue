<template>
  <div class="card content-box">
    <span class="text">复制指令 🍇🍇🍇🍓🍓🍓</span>
    <div class="box-content">
      <el-input v-model="data" placeholder="请输入内容" style="width: 500px">
        <template #append>
          <el-button v-copy="data"> 复制 </el-button>
        </template>
      </el-input>
    </div>
  </div>
  <div v-waterMarker="{ text: '前端专用水印', textColor: 'rgba(180, 180, 180, 0.6)' }" class="card content-box">
    <span class="text">水印指令 🍇🍇🍇🍓🍓🍓</span>
  </div>
  <div class="card content-box">
    <span class="text">防抖指令 🍇🍇🍇🍓🍓🍓</span>
    <el-button v-debounce="debounceClick" type="primary"> 防抖按钮 (0.5秒后执行) </el-button>
  </div>
  <div class="card content-box">
    <span class="text">长按指令 🍇🍇🍇🍓🍓🍓</span>
    <el-button v-longpress="longpress" type="primary"> 长按2秒触发事件 </el-button>
  </div>
  <div class="card content-box">
    <span class="text">节流指令 🍇🍇🍇🍓🍓🍓</span>
    <el-button v-throttle="throttleClick" type="primary"> 节流按钮 (每隔1S秒后执行) </el-button>
  </div>
</template>

<script setup lang="ts" name="copyDirect">
import { ref } from "vue";
import { ElMessage } from "element-plus";

const data = ref<string>("我是被复制的内容 🍒 🍉 🍊");

const debounceClick = () => {
  ElMessage.success("我是防抖按钮触发的事件 🍍🍓🍌");
};
const longpress = () => {
  ElMessage.success("长按事件触发成功 🎉🎉🎉");
};
const throttleClick = () => {
  ElMessage.success("我是节流按钮触发的事件 🍍🍓🍌");
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
