<!--
  @description: 交互说明
 -->
<template>
  <div class="page card">
    <div class="title">挂载到window 类型</div>
    <div class="content">
      <highlightJs autodetect language="javascript" :code="mountWindowType" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import hljsVuePlugin from "@highlightjs/vue-plugin";
/*黑色主题*/
import "highlight.js/styles/atom-one-dark.css";
hljs.registerLanguage("javascript", javascript);
const highlightJs = hljsVuePlugin.component;
import http from "@/api";

/**
 * @description: 交互类型 挂载到window 类型
 */
const mountWindowType = ref("") as any;
http.get(new URL("../data/mountWindowType.txt", import.meta.url).href).then(res => {
  mountWindowType.value = res;
});
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  :deep(.hljs) {
    // max-height: 350px;
    border-radius: 8px;
  }
}
</style>
