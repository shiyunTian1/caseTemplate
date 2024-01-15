<template>
  <div class="card mb10">
    <h4 class="title">组件选择</h4>
    <div class="theme-container">
      <div
        class="item-theme"
        v-for="(v, i) in themeList"
        :key="i"
        @click="clickItemTheme(i)"
        :class="activeIndex == i ? 'active-theme' : ''"
      >
        <el-tooltip class="box-item" effect="dark" :content="v.name" placement="top">
          <img class="" :src="handleImgUrl(v.img)" alt="" />
        </el-tooltip>
        <el-icon v-show="activeIndex == i" class="icon-circle">
          <CircleCheckFilled />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const activeIndex = ref(0);
const themeList = ref([
  {
    name: "柱状图1",
    id: 1,
    img: "bar1"
  },
  {
    name: "柱状图2",
    id: 2,
    img: "bar2"
  },
  {
    name: "柱状图3",
    id: 3,
    img: "bar3"
  },
  {
    name: "折线图1",
    id: 4,
    img: "line1"
  },
  {
    name: "折线图2",
    id: 5,
    img: "line2"
  },
  {
    name: "饼图1",
    id: 6,
    img: "pie1"
  },
  {
    name: "饼图2",
    id: 7,
    img: "pie2"
  }
]);

const handleImgUrl = img => {
  return new URL(`../../../assets/images/dataBigScreen/${img}.jpg`, import.meta.url).href;
};

const clickItemTheme = (i: number): void => {
  activeIndex.value = i;
};
</script>

<style scoped lang="scss">
.theme-container {
  display: flex;
  justify-content: flex-start;

  // margin-top: 40px;
  .item-theme {
    position: relative;
    margin-right: 20px;
    cursor: pointer;
    border-radius: 2px;
    box-shadow: 0 0 5px 1px var(--el-border-color-dark);
    .theme-text {
      display: block;
      font-size: 15px;
      line-height: 25px;
      color: var(--el-text-color-regular);
    }
    img {
      width: 200px;
      height: 100%;
    }
    .icon-circle {
      position: absolute;
      right: 6px;
      bottom: 6px;
      color: var(--el-aside-logo-text-color);
    }
  }
  .item-theme :hover {
    box-shadow: 0 0 5px 1px var(--el-text-color-secondary);
  }
  .active-theme {
    box-shadow: 0 0 0 2px var(--el-color-primary) !important;
  }
}
</style>
