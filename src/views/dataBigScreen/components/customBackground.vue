<template>
  <div class="card mb10">
    <h4 class="title">背景图片</h4>
    <div class="custom-background-container">
      <UploadImg v-model:image-url="avatar3" width="250px" @getUrl="update">
        <template #empty>
          <el-icon><Picture /></el-icon>
          <span>请上传 Banner 图</span>
        </template>
        <template #tip> 长方形组件（可拖拽上传） </template>
      </UploadImg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import UploadImg from "./Img.vue";
const avatar3 = ref("");

const update = value => {
  console.log(value);
};
</script>

<style scoped lang="scss"></style>
