<template>
  <div class="box-body" style="height: 500px">
    <div id="codeBox"></div>
  </div>
</template>
<script setup>
import * as monaco from "monaco-editor";
const emit = defineEmits(["contentChange"]);
import { ref, reactive, toRaw, watch, onMounted } from "vue";
const props = defineProps({
  value: {
    type: String,
    default: ""
  }
});

console.log(props.value);
const tips = () => {
  range(`
#--注释--#
      `);
};
const range = text => {
  var position = toRaw(editor.value).getPosition();
  toRaw(editor.value).executeEdits("", [
    {
      range: {
        startLineNumber: position.lineNumber,
        startColumn: position.column,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      },
      text
    }
  ]);
};

const dataList = reactive({});
const showInit = ref(true);
const editor = ref(null);
const provider = ref(null);
const mylang = ref(null);
const color = ref(null);
const hover = ref(null);
watch(
  () => props.value,
  (newVal, oldVal) => {
    console.log(newVal);
    toRaw(editor.value).setValue(newVal);
  },
  { deep: true }
);
const cloneDeep = suggestions => {
  return JSON.parse(JSON.stringify(suggestions));
};
const hoverTips = (arr, word) => {
  let tip = "";
  arr.forEach(item => {
    if (word == item.text) {
      tip = {
        contents: [{ value: item.title || "" }, { value: item.content || "" }]
      };
    }
  });
  return tip;
};
const initEditor = () => {
  // 初始化编辑器，确保dom已经渲染
  monaco.languages.register({ id: "MyLanguage" });
  // provider.value = monaco.languages.registerCompletionItemProvider("MyLanguage", {
  //   provideCompletionItems(model, position) {
  //     return {
  //       suggestions: cloneDeep(vCompletion), //自定义代码补全
  //     };
  //   },
  //   triggerCharacters: ["."],
  // });
  mylang.value = monaco.languages.setLanguageConfiguration("MyLanguage", {
    //自定义括号，冒号等符号的补全规则
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"]
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: "", notIn: ["string"] },
      { open: "'", close: "", notIn: ["string", "comment"] },
      { open: "`", close: "`", notIn: ["string", "comment"] }
    ]
  });
  color.value = monaco.languages.setMonarchTokensProvider("MyLanguage", {
    //自定义文本颜色
    ignoreCase: true,
    tokenizer: {
      root: [
        [/pageData|currentUser/, { token: "keyword" }], //蓝色
        [/[+]|[-]|[*]|[/]|[%]|[>]|[<]|[=]|[!]|[:]|[&&]|[||]/, { token: "string" }], //红色
        [/'.*?'|".*?"/, { token: "string.escape" }], //橙色
        [/#--.*?\--#/, { token: "comment" }], //绿色
        [/null/, { token: "regexp" }], //粉色
        [/[{]|[}]/, { token: "type" }], //青色
        // [/[\u4e00-\u9fa5]/, { token: 'predefined' }],//亮粉色
        // [/''/, { token: 'invalid' }],//红色
        // [/[\u4e00-\u9fa5]/, { token: 'number.binary' }],//浅绿
        [/(?!.*[a-zA-Z])[0-9]/, { token: "number.hex" }], //浅绿
        [/[(]|[)]/, { token: "number.octal" }] //浅绿
        // [/[\u4e00-\u9fa5]/, { token: 'number.float' }],//浅绿
      ]
    }
  });
  // hover.value = monaco.languages.registerHoverProvider("MyLanguage", {
  //   //自定义文字悬浮提示
  //   provideHover: (model, position) => {
  //     if (model.getWordAtPosition(position) != null) {
  //       const word = model.getWordAtPosition(position).word;
  //       let arr = [
  //         {
  //           text: "SqlUtil", //悬浮文字
  //           title: "数据库操作", //标题
  //           content: "对数据进行操作，支持sql,addConditionExist等操作", //提示内容
  //         },
  //       ];
  //       return hoverTips(arr, word);
  //     }
  //   },
  // });
  editor.value = monaco.editor.create(document.getElementById("codeBox"), {
    //初始化配置
    value: props.value,
    theme: "vs",
    autoIndex: true,
    language: "javascript", // 语言类型
    tabCompletion: "on",
    cursorSmoothCaretAnimation: true,
    formatOnPaste: true,
    mouseWheelZoom: true,
    folding: false, //代码折叠
    autoClosingBrackets: "always",
    autoClosingOvertype: "always",
    autoClosingQuotes: "always",
    automaticLayout: "always"
  });

  // 监听值的变化
  editor.value.onDidChangeModelContent(val => {
    //给父组件实时返回最新文本
    emit("contentChange", toRaw(editor.value).getValue());
  });
};
onMounted(() => {
  initEditor();
});
</script>
<style lang="scss" scoped>
// #codeBox {
//   width: 100%;
//   height: 92%;
// }
.code-container {
  width: 100%;
  height: 500px;
  overflow: hidden;
  border: 1px solid #eaeaea;
}
.monaco-editor .scroll-decoration {
  box-shadow: none;
}
.time {
  display: flex;
  align-items: center;
  width: 100%;
  height: 8%;
  border: 1px solid #cccccc;
  border-bottom: none;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.icon {
  display: inline-block;
  margin: 0 10px;
  font-size: 20px !important;
}
.icon:hover {
  font-weight: bold;
  color: #ffa500;
}
.main {
  padding: 0 !important;
}
</style>
