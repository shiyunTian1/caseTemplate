<!--
 * @Author: qingzi tsy15632385483@163.com
 * @Date: 2024-01-10 09:41:44
 * @LastEditors: qingzi tsy15632385483@163.com
 * @LastEditTime: 2024-01-22 15:30:23
 * @FilePath: \yl_admin_base_project\src\views\dataBigScreen\components\theme.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="card mb10">
    <h4 class="title">主题颜色</h4>
    <div class="theme-container">
      <div
        class="item-theme"
        v-for="(v, i) in themeList"
        :key="i"
        @click="clickItemTheme(i)"
        :class="activeIndex == i ? 'active-theme' : ''"
      >
        <!-- <span class="theme-text">橙色主题</span> -->
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
    name: "橙色主题",
    id: 1,
    img: "orange"
  },
  {
    name: "蓝色主题",
    id: 2,
    img: "blue"
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
      color: var(--el-color-white);
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
