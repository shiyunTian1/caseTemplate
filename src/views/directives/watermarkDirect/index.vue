<!--
 * @Author: qingzi tsy15632385483@163.com
 * @Date: 2024-01-05 09:57:57
 * @LastEditors: qingzi tsy15632385483@163.com
 * @LastEditTime: 2024-01-05 11:33:28
 * @FilePath: \yl_admin_base_project\src\views\directives\watermarkDirect\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div v-waterMarker="{ text: '前端专用水印', textColor: 'rgba(180, 180, 180, 0.6)' }" class="card content-box">
    <span class="text">水印指令 🍇🍇🍇🍓🍓🍓</span>
  </div>
</template>

<script setup lang="ts" name="watermarkDirect"></script>

<style scoped lang="scss">
@import "./index.scss";
</style>
