<template>
  <div class="home">
    <div class="card-box">
      <div v-for="item in projectsArr" class="card-item" @click="openUrl(item.url)">
        <div class="card">
          <div class="image" :style="{ backgroundImage: `url(${item.image})` }"></div>
          <div class="des">
            <div class="logo"></div>
            <div class="title">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import projects from "./projects.json";

// 图片路径处理
if (projects.projects.length !== 0) {
  projects.projects.forEach(item => {
    item.image = new URL(item.image, import.meta.url).href;
  });
}
const projectsArr = ref(projects.projects);

/**
 * @description 跳转到项目地址
 */
function openUrl(url: string) {
  window.open(url, "_blank");
}
</script>

<style scoped lang="scss">
.card {
  position: relative;
  aspect-ratio: 1920/1080;
  overflow: hidden;
  cursor: pointer;
  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    filter: blur(50px);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: all 0.3s;
    transform: scale(3);
  }
  .des {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: #ffffff;
    text-align: center;
    background: rgb(0 0 0 / 50%);
    .logo {
      width: 80px;
      height: 80px;
      margin-bottom: 20px;
      background: url("../../assets/images/home/yunlu_logo.png") no-repeat center;
      background-color: rgb(0 0 0 / 50%);
      background-size: 65%;
      border-radius: 100%;
    }
    .title {
      font-size: 16px;
      font-weight: 500;

      // mix-blend-mode: difference;
    }
  }
  &:hover {
    .image {
      zoom: 1.5;
      filter: blur(0);
      transform: scale(1);
    }
  }
  /* stylelint-disable-next-line no-duplicate-selectors */
  .des {
    background: rgb(0 0 0 / 50%);
  }
}
.card-box {
  display: flex;
  flex-wrap: wrap;
  .card-item {
    box-sizing: border-box;
    flex: 0 0 25%;
    width: 0;
    padding: 10px;
  }
}
</style>
