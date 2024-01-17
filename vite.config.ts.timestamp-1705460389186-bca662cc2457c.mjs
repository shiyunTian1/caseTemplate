// vite.config.ts
import { defineConfig, loadEnv } from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// build/getEnv.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT")
      realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// build/proxy.ts
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// build/plugins.ts
import { resolve } from "path";
import { VitePWA } from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/vite-plugin-pwa/dist/index.js";
import { createHtmlPlugin } from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/vite-plugin-html/dist/index.mjs";
import { visualizer } from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createSvgIconsPlugin } from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import vue from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import viteCompression from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/vite-plugin-compression/dist/index.mjs";
import vueSetupExtend from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
var createVitePlugins = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // esLint 报错信息显示在浏览器界面上
    // eslintPlugin(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 创建打包压缩配置
    createCompression(viteEnv),
    // 注入变量到 html 文件
    createHtmlPlugin({
      minify: true,
      viteNext: true,
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true })
  ];
};
var createCompression = (viteEnv) => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  return plugins;
};
var createVitePwa = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;
  return VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: "#ffffff",
      icons: [
        {
          src: "/logo.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "/logo.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ]
    }
  });
};

// package.json
var package_default = {
  name: "geeker-admin",
  private: true,
  version: "1.2.0",
  type: "module",
  description: "geeker-admin open source management system",
  author: {
    name: "ADMIN",
    email: "848130454@qq.com",
    url: "https://github.com/HalseySpicy"
  },
  license: "MIT",
  homepage: "https://github.com/HalseySpicy/Geeker-Admin",
  repository: {
    type: "git",
    url: "git@github.com:HalseySpicy/Geeker-Admin.git"
  },
  bugs: {
    url: "https://github.com/HalseySpicy/Geeker-Admin/issues"
  },
  scripts: {
    dev: "vite",
    serve: "vite",
    "build:dev": "vue-tsc && vite build --mode development",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    preview: "npm run build:dev && vite preview",
    "lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
    "lint:prettier": 'prettier --write "src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}"',
    "lint:stylelint": 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',
    "lint:lint-staged": "lint-staged",
    prepare: "husky install",
    release: "standard-version",
    commit: "git add -A && czg && git push"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.3.1",
    "@highlightjs/vue-plugin": "^2.1.0",
    "@vueuse/core": "^10.7.1",
    "@wangeditor/editor": "^5.1.23",
    "@wangeditor/editor-for-vue": "^5.1.12",
    axios: "^1.6.3",
    dayjs: "^1.11.10",
    "driver.js": "^1.3.1",
    echarts: "^5.4.3",
    "echarts-liquidfill": "^3.1.0",
    "element-plus": "^2.4.4",
    md5: "^2.3.0",
    mitt: "^3.0.1",
    "monaco-editor": "^0.28.1",
    nprogress: "^0.2.0",
    pinia: "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    qs: "^6.11.2",
    screenfull: "^6.0.2",
    sortablejs: "^1.15.1",
    vue: "^3.4.3",
    "vue-i18n": "^9.8.0",
    "vue-router": "^4.2.5",
    vuedraggable: "^4.1.0"
  },
  devDependencies: {
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "@types/md5": "^2.3.5",
    "@types/nprogress": "^0.2.3",
    "@types/qs": "^6.9.11",
    "@types/sortablejs": "^1.15.7",
    "@typescript-eslint/eslint-plugin": "^6.17.0",
    "@typescript-eslint/parser": "^6.17.0",
    "@vitejs/plugin-vue": "^5.0.2",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    autoprefixer: "^10.4.16",
    "cz-git": "^1.8.0",
    czg: "^1.8.0",
    eslint: "^8.56.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.2",
    "eslint-plugin-vue": "^9.19.2",
    husky: "^8.0.3",
    "lint-staged": "^15.2.0",
    postcss: "^8.4.32",
    "postcss-html": "^1.5.0",
    prettier: "^3.1.1",
    "rollup-plugin-visualizer": "^5.12.0",
    sass: "^1.69.7",
    "standard-version": "^9.5.0",
    stylelint: "^16.1.0",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-recess-order": "^4.4.0",
    "stylelint-config-recommended-scss": "^14.0.0",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard": "^36.0.0",
    "stylelint-config-standard-scss": "^12.0.0",
    typescript: "^5.3.3",
    "unplugin-vue-setup-extend-plus": "^1.0.0",
    vite: "^5.0.10",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-html": "^3.2.1",
    "vite-plugin-monaco-editor": "^1.1.0",
    "vite-plugin-pwa": "^0.17.4",
    "vite-plugin-svg-icons": "^2.0.1",
    "vue-tsc": "^1.8.27"
  },
  engines: {
    node: ">=16.0.0"
  },
  browserslist: {
    production: [
      "> 1%",
      "not dead",
      "not op_mini all"
    ],
    development: [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite.config.ts
import dayjs from "file:///F:/project/%E5%89%8D%E7%AB%AF%E7%BB%84%E5%BB%BA%E8%AE%BE/yl_admin_base_project/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "F:\\project\\\u524D\u7AEF\u7EC4\u5EFA\u8BBE\\yl_admin_base_project";
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY),
      hmr: true
    },
    plugins: createVitePlugins(viteEnv),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild",
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2e3,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    optimizeDeps: {
      include: [
        `monaco-editor/esm/vs/language/json/json.worker`,
        `monaco-editor/esm/vs/language/css/css.worker`,
        `monaco-editor/esm/vs/language/html/html.worker`,
        `monaco-editor/esm/vs/language/typescript/ts.worker`,
        `monaco-editor/esm/vs/editor/editor.worker`
      ]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZ2V0RW52LnRzIiwgImJ1aWxkL3Byb3h5LnRzIiwgImJ1aWxkL3BsdWdpbnMudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxccHJvamVjdFxcXFxcdTUyNERcdTdBRUZcdTdFQzRcdTVFRkFcdThCQkVcXFxceWxfYWRtaW5fYmFzZV9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxwcm9qZWN0XFxcXFx1NTI0RFx1N0FFRlx1N0VDNFx1NUVGQVx1OEJCRVxcXFx5bF9hZG1pbl9iYXNlX3Byb2plY3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3Byb2plY3QvJUU1JTg5JThEJUU3JUFCJUFGJUU3JUJCJTg0JUU1JUJCJUJBJUU4JUFFJUJFL3lsX2FkbWluX2Jhc2VfcHJvamVjdC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiwgQ29uZmlnRW52LCBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHdyYXBwZXJFbnYgfSBmcm9tIFwiLi9idWlsZC9nZXRFbnZcIjtcclxuaW1wb3J0IHsgY3JlYXRlUHJveHkgfSBmcm9tIFwiLi9idWlsZC9wcm94eVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2lucyB9IGZyb20gXCIuL2J1aWxkL3BsdWdpbnNcIjtcclxuaW1wb3J0IHBrZyBmcm9tIFwiLi9wYWNrYWdlLmpzb25cIjtcclxuaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiO1xyXG5cclxuY29uc3QgeyBkZXBlbmRlbmNpZXMsIGRldkRlcGVuZGVuY2llcywgbmFtZSwgdmVyc2lvbiB9ID0gcGtnO1xyXG5jb25zdCBfX0FQUF9JTkZPX18gPSB7XHJcbiAgcGtnOiB7IGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzLCBuYW1lLCB2ZXJzaW9uIH0sXHJcbiAgbGFzdEJ1aWxkVGltZTogZGF5anMoKS5mb3JtYXQoXCJZWVlZLU1NLUREIEhIOm1tOnNzXCIpXHJcbn07XHJcblxyXG4vLyBAc2VlOiBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnID0+IHtcclxuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpO1xyXG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiB2aXRlRW52LlZJVEVfUFVCTElDX1BBVEgsXHJcbiAgICByb290LFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIFwiQFwiOiByZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgICAgICBcInZ1ZS1pMThuXCI6IFwidnVlLWkxOG4vZGlzdC92dWUtaTE4bi5janMuanNcIlxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgIF9fQVBQX0lORk9fXzogSlNPTi5zdHJpbmdpZnkoX19BUFBfSU5GT19fKVxyXG4gICAgfSxcclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgc2Nzczoge1xyXG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9zdHlsZXMvdmFyLnNjc3NcIjtgXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IFwiMC4wLjAuMFwiLFxyXG4gICAgICBwb3J0OiB2aXRlRW52LlZJVEVfUE9SVCxcclxuICAgICAgb3Blbjogdml0ZUVudi5WSVRFX09QRU4sXHJcbiAgICAgIGNvcnM6IHRydWUsXHJcbiAgICAgIC8vIExvYWQgcHJveHkgY29uZmlndXJhdGlvbiBmcm9tIC5lbnYuZGV2ZWxvcG1lbnRcclxuICAgICAgcHJveHk6IGNyZWF0ZVByb3h5KHZpdGVFbnYuVklURV9QUk9YWSksXHJcbiAgICAgIGhtcjogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYpLFxyXG4gICAgZXNidWlsZDoge1xyXG4gICAgICBwdXJlOiB2aXRlRW52LlZJVEVfRFJPUF9DT05TT0xFID8gW1wiY29uc29sZS5sb2dcIiwgXCJkZWJ1Z2dlclwiXSA6IFtdXHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiBcImRpc3RcIixcclxuICAgICAgbWluaWZ5OiBcImVzYnVpbGRcIixcclxuICAgICAgLy8gZXNidWlsZCBcdTYyNTNcdTUzMDVcdTY2RjRcdTVGRUJcdUZGMENcdTRGNDZcdTY2MkZcdTRFMERcdTgwRkRcdTUzQkJcdTk2NjQgY29uc29sZS5sb2dcdUZGMEN0ZXJzZXJcdTYyNTNcdTUzMDVcdTYxNjJcdUZGMENcdTRGNDZcdTgwRkRcdTUzQkJcdTk2NjQgY29uc29sZS5sb2dcclxuICAgICAgLy8gbWluaWZ5OiBcInRlcnNlclwiLFxyXG4gICAgICAvLyB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgIC8vIFx0Y29tcHJlc3M6IHtcclxuICAgICAgLy8gXHRcdGRyb3BfY29uc29sZTogdml0ZUVudi5WSVRFX0RST1BfQ09OU09MRSxcclxuICAgICAgLy8gXHRcdGRyb3BfZGVidWdnZXI6IHRydWVcclxuICAgICAgLy8gXHR9XHJcbiAgICAgIC8vIH0sXHJcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICAgIC8vIFx1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QVx1RkYwQ1x1NTNFRlx1NzU2NVx1NUZBRVx1NTFDRlx1NUMxMVx1NjI1M1x1NTMwNVx1NjVGNlx1OTVGNFxyXG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXHJcbiAgICAgIC8vIFx1ODlDNFx1NUI5QVx1ODlFNlx1NTNEMVx1OEI2Nlx1NTQ0QVx1NzY4NCBjaHVuayBcdTU5MjdcdTVDMEZcclxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiAyMDAwLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAvLyBTdGF0aWMgcmVzb3VyY2UgY2xhc3NpZmljYXRpb24gYW5kIHBhY2thZ2luZ1xyXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcImFzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzXCIsXHJcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogXCJhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XVwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGluY2x1ZGU6IFtcclxuICAgICAgICBgbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvanNvbi9qc29uLndvcmtlcmAsXHJcbiAgICAgICAgYG1vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL2Nzcy9jc3Mud29ya2VyYCxcclxuICAgICAgICBgbW9uYWNvLWVkaXRvci9lc20vdnMvbGFuZ3VhZ2UvaHRtbC9odG1sLndvcmtlcmAsXHJcbiAgICAgICAgYG1vbmFjby1lZGl0b3IvZXNtL3ZzL2xhbmd1YWdlL3R5cGVzY3JpcHQvdHMud29ya2VyYCxcclxuICAgICAgICBgbW9uYWNvLWVkaXRvci9lc20vdnMvZWRpdG9yL2VkaXRvci53b3JrZXJgXHJcbiAgICAgIF1cclxuICAgIH1cclxuICB9O1xyXG59KTtcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxwcm9qZWN0XFxcXFx1NTI0RFx1N0FFRlx1N0VDNFx1NUVGQVx1OEJCRVxcXFx5bF9hZG1pbl9iYXNlX3Byb2plY3RcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHByb2plY3RcXFxcXHU1MjREXHU3QUVGXHU3RUM0XHU1RUZBXHU4QkJFXFxcXHlsX2FkbWluX2Jhc2VfcHJvamVjdFxcXFxidWlsZFxcXFxnZXRFbnYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3Byb2plY3QvJUU1JTg5JThEJUU3JUFCJUFGJUU3JUJCJTg0JUU1JUJCJUJBJUU4JUFFJUJFL3lsX2FkbWluX2Jhc2VfcHJvamVjdC9idWlsZC9nZXRFbnYudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNEZXZGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZEZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Rlc3RGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09IFwidGVzdFwiO1xufVxuXG4vKipcbiAqIFdoZXRoZXIgdG8gZ2VuZXJhdGUgcGFja2FnZSBwcmV2aWV3XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1JlcG9ydE1vZGUoKTogYm9vbGVhbiB7XG4gIHJldHVybiBwcm9jZXNzLmVudi5WSVRFX1JFUE9SVCA9PT0gXCJ0cnVlXCI7XG59XG5cbi8vIFJlYWQgYWxsIGVudmlyb25tZW50IHZhcmlhYmxlIGNvbmZpZ3VyYXRpb24gZmlsZXMgdG8gcHJvY2Vzcy5lbnZcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcbiAgY29uc3QgcmV0OiBhbnkgPSB7fTtcblxuICBmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcbiAgICBsZXQgcmVhbE5hbWUgPSBlbnZDb25mW2Vudk5hbWVdLnJlcGxhY2UoL1xcXFxuL2csIFwiXFxuXCIpO1xuICAgIHJlYWxOYW1lID0gcmVhbE5hbWUgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IHJlYWxOYW1lID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHJlYWxOYW1lO1xuICAgIGlmIChlbnZOYW1lID09PSBcIlZJVEVfUE9SVFwiKSByZWFsTmFtZSA9IE51bWJlcihyZWFsTmFtZSk7XG4gICAgaWYgKGVudk5hbWUgPT09IFwiVklURV9QUk9YWVwiKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZWFsTmFtZSA9IEpTT04ucGFyc2UocmVhbE5hbWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gICAgfVxuICAgIHJldFtlbnZOYW1lXSA9IHJlYWxOYW1lO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbi8qKlxuICogR2V0IHVzZXIgcm9vdCBkaXJlY3RvcnlcbiAqIEBwYXJhbSBkaXIgZmlsZSBwYXRoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290UGF0aCguLi5kaXI6IHN0cmluZ1tdKSB7XG4gIHJldHVybiBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgLi4uZGlyKTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxccHJvamVjdFxcXFxcdTUyNERcdTdBRUZcdTdFQzRcdTVFRkFcdThCQkVcXFxceWxfYWRtaW5fYmFzZV9wcm9qZWN0XFxcXGJ1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxwcm9qZWN0XFxcXFx1NTI0RFx1N0FFRlx1N0VDNFx1NUVGQVx1OEJCRVxcXFx5bF9hZG1pbl9iYXNlX3Byb2plY3RcXFxcYnVpbGRcXFxccHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L3Byb2plY3QvJUU1JTg5JThEJUU3JUFCJUFGJUU3JUJCJTg0JUU1JUJCJUJBJUU4JUFFJUJFL3lsX2FkbWluX2Jhc2VfcHJvamVjdC9idWlsZC9wcm94eS50c1wiO2ltcG9ydCB0eXBlIHsgUHJveHlPcHRpb25zIH0gZnJvbSBcInZpdGVcIjtcclxuXHJcbnR5cGUgUHJveHlJdGVtID0gW3N0cmluZywgc3RyaW5nXTtcclxuXHJcbnR5cGUgUHJveHlMaXN0ID0gUHJveHlJdGVtW107XHJcblxyXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz47XHJcblxyXG4vKipcclxuICogXHU1MjFCXHU1RUZBXHU0RUUzXHU3NDA2XHVGRjBDXHU3NTI4XHU0RThFXHU4OUUzXHU2NzkwIC5lbnYuZGV2ZWxvcG1lbnQgXHU0RUUzXHU3NDA2XHU5MTREXHU3RjZFXHJcbiAqIEBwYXJhbSBsaXN0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHkobGlzdDogUHJveHlMaXN0ID0gW10pIHtcclxuICBjb25zdCByZXQ6IFByb3h5VGFyZ2V0TGlzdCA9IHt9O1xyXG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XHJcbiAgICBjb25zdCBodHRwc1JFID0gL15odHRwczpcXC9cXC8vO1xyXG4gICAgY29uc3QgaXNIdHRwcyA9IGh0dHBzUkUudGVzdCh0YXJnZXQpO1xyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9odHRwLXBhcnR5L25vZGUtaHR0cC1wcm94eSNvcHRpb25zXHJcbiAgICByZXRbcHJlZml4XSA9IHtcclxuICAgICAgdGFyZ2V0OiB0YXJnZXQsXHJcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgd3M6IHRydWUsXHJcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgXCJcIiksXHJcbiAgICAgIC8vIGh0dHBzIGlzIHJlcXVpcmUgc2VjdXJlPWZhbHNlXHJcbiAgICAgIC4uLihpc0h0dHBzID8geyBzZWN1cmU6IGZhbHNlIH0gOiB7fSlcclxuICAgIH07XHJcbiAgfVxyXG4gIHJldHVybiByZXQ7XHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxwcm9qZWN0XFxcXFx1NTI0RFx1N0FFRlx1N0VDNFx1NUVGQVx1OEJCRVxcXFx5bF9hZG1pbl9iYXNlX3Byb2plY3RcXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXHByb2plY3RcXFxcXHU1MjREXHU3QUVGXHU3RUM0XHU1RUZBXHU4QkJFXFxcXHlsX2FkbWluX2Jhc2VfcHJvamVjdFxcXFxidWlsZFxcXFxwbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9wcm9qZWN0LyVFNSU4OSU4RCVFNyVBQiVBRiVFNyVCQiU4NCVFNSVCQiVCQSVFOCVBRSVCRS95bF9hZG1pbl9iYXNlX3Byb2plY3QvYnVpbGQvcGx1Z2lucy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xyXG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI7XHJcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI7XHJcbmltcG9ydCBlc2xpbnRQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWVzbGludFwiO1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xyXG5pbXBvcnQgdnVlU2V0dXBFeHRlbmQgZnJvbSBcInVucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1cy92aXRlXCI7XHJcblxyXG4vKipcclxuICogXHU1MjFCXHU1RUZBIHZpdGUgXHU2M0QyXHU0RUY2XHJcbiAqIEBwYXJhbSB2aXRlRW52XHJcbiAqL1xyXG5leHBvcnQgY29uc3QgY3JlYXRlVml0ZVBsdWdpbnMgPSAodml0ZUVudjogVml0ZUVudik6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9PiB7XHJcbiAgY29uc3QgeyBWSVRFX0dMT0JfQVBQX1RJVExFLCBWSVRFX1JFUE9SVCwgVklURV9QV0EgfSA9IHZpdGVFbnY7XHJcbiAgcmV0dXJuIFtcclxuICAgIHZ1ZSgpLFxyXG4gICAgLy8gdnVlIFx1NTNFRlx1NEVFNVx1NEY3Rlx1NzUyOCBqc3gvdHN4IFx1OEJFRFx1NkNENVxyXG4gICAgdnVlSnN4KCksXHJcbiAgICAvLyBlc0xpbnQgXHU2MkE1XHU5NTE5XHU0RkUxXHU2MDZGXHU2NjNFXHU3OTNBXHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU3NTRDXHU5NzYyXHU0RTBBXHJcbiAgICAvLyBlc2xpbnRQbHVnaW4oKSxcclxuICAgIC8vIG5hbWUgXHU1M0VGXHU0RUU1XHU1MTk5XHU1NzI4IHNjcmlwdCBcdTY4MDdcdTdCN0VcdTRFMEFcclxuICAgIHZ1ZVNldHVwRXh0ZW5kKHt9KSxcclxuICAgIC8vIFx1NTIxQlx1NUVGQVx1NjI1M1x1NTMwNVx1NTM4Qlx1N0YyOVx1OTE0RFx1N0Y2RVxyXG4gICAgY3JlYXRlQ29tcHJlc3Npb24odml0ZUVudiksXHJcbiAgICAvLyBcdTZDRThcdTUxNjVcdTUzRDhcdTkxQ0ZcdTUyMzAgaHRtbCBcdTY1ODdcdTRFRjZcclxuICAgIGNyZWF0ZUh0bWxQbHVnaW4oe1xyXG4gICAgICBtaW5pZnk6IHRydWUsXHJcbiAgICAgIHZpdGVOZXh0OiB0cnVlLFxyXG4gICAgICBpbmplY3Q6IHtcclxuICAgICAgICBkYXRhOiB7IHRpdGxlOiBWSVRFX0dMT0JfQVBQX1RJVExFIH1cclxuICAgICAgfVxyXG4gICAgfSksXHJcbiAgICAvLyBcdTRGN0ZcdTc1Mjggc3ZnIFx1NTZGRVx1NjgwN1xyXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL2ljb25zXCIpXSxcclxuICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIlxyXG4gICAgfSksXHJcbiAgICAvLyB2aXRlUFdBXHJcbiAgICBWSVRFX1BXQSAmJiBjcmVhdGVWaXRlUHdhKHZpdGVFbnYpLFxyXG4gICAgLy8gXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwXHU1MzA1XHU5ODg0XHU4OUM4XHVGRjBDXHU1MjA2XHU2NzkwXHU0RjlEXHU4RDU2XHU1MzA1XHU1OTI3XHU1QzBGXHU1MDVBXHU0RjE4XHU1MzE2XHU1OTA0XHU3NDA2XHJcbiAgICBWSVRFX1JFUE9SVCAmJiAodmlzdWFsaXplcih7IGZpbGVuYW1lOiBcInN0YXRzLmh0bWxcIiwgZ3ppcFNpemU6IHRydWUsIGJyb3RsaVNpemU6IHRydWUgfSkgYXMgUGx1Z2luT3B0aW9uKVxyXG4gIF07XHJcbn07XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIFx1NjgzOVx1NjM2RSBjb21wcmVzcyBcdTkxNERcdTdGNkVcdUZGMENcdTc1MUZcdTYyMTBcdTRFMERcdTU0MENcdTc2ODRcdTUzOEJcdTdGMjlcdTg5QzRcdTUyMTlcclxuICogQHBhcmFtIHZpdGVFbnZcclxuICovXHJcbmNvbnN0IGNyZWF0ZUNvbXByZXNzaW9uID0gKHZpdGVFbnY6IFZpdGVFbnYpOiBQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSA9PiB7XHJcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTID0gXCJub25lXCIsIFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFIH0gPSB2aXRlRW52O1xyXG4gIGNvbnN0IGNvbXByZXNzTGlzdCA9IFZJVEVfQlVJTERfQ09NUFJFU1Muc3BsaXQoXCIsXCIpO1xyXG4gIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk9wdGlvbltdID0gW107XHJcbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcyhcImd6aXBcIikpIHtcclxuICAgIHBsdWdpbnMucHVzaChcclxuICAgICAgdml0ZUNvbXByZXNzaW9uKHtcclxuICAgICAgICBleHQ6IFwiLmd6XCIsXHJcbiAgICAgICAgYWxnb3JpdGhtOiBcImd6aXBcIixcclxuICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBWSVRFX0JVSUxEX0NPTVBSRVNTX0RFTEVURV9PUklHSU5fRklMRVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcyhcImJyb3RsaVwiKSkge1xyXG4gICAgcGx1Z2lucy5wdXNoKFxyXG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xyXG4gICAgICAgIGV4dDogXCIuYnJcIixcclxuICAgICAgICBhbGdvcml0aG06IFwiYnJvdGxpQ29tcHJlc3NcIixcclxuICAgICAgICBkZWxldGVPcmlnaW5GaWxlOiBWSVRFX0JVSUxEX0NPTVBSRVNTX0RFTEVURV9PUklHSU5fRklMRVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIHBsdWdpbnM7XHJcbn07XHJcblxyXG4vKipcclxuICogQGRlc2NyaXB0aW9uIFZpdGVQd2FcclxuICogQHBhcmFtIHZpdGVFbnZcclxuICovXHJcbmNvbnN0IGNyZWF0ZVZpdGVQd2EgPSAodml0ZUVudjogVml0ZUVudik6IFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdID0+IHtcclxuICBjb25zdCB7IFZJVEVfR0xPQl9BUFBfVElUTEUgfSA9IHZpdGVFbnY7XHJcbiAgcmV0dXJuIFZpdGVQV0Eoe1xyXG4gICAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcclxuICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgIG5hbWU6IFZJVEVfR0xPQl9BUFBfVElUTEUsXHJcbiAgICAgIHNob3J0X25hbWU6IFZJVEVfR0xPQl9BUFBfVElUTEUsXHJcbiAgICAgIHRoZW1lX2NvbG9yOiBcIiNmZmZmZmZcIixcclxuICAgICAgaWNvbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzcmM6IFwiL2xvZ28ucG5nXCIsXHJcbiAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzcmM6IFwiL2xvZ28ucG5nXCIsXHJcbiAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzcmM6IFwiL2xvZ28ucG5nXCIsXHJcbiAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgcHVycG9zZTogXCJhbnkgbWFza2FibGVcIlxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG4iLCAie1xyXG4gIFwibmFtZVwiOiBcImdlZWtlci1hZG1pblwiLFxyXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxyXG4gIFwidmVyc2lvblwiOiBcIjEuMi4wXCIsXHJcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcImdlZWtlci1hZG1pbiBvcGVuIHNvdXJjZSBtYW5hZ2VtZW50IHN5c3RlbVwiLFxyXG4gIFwiYXV0aG9yXCI6IHtcclxuICAgIFwibmFtZVwiOiBcIkFETUlOXCIsXHJcbiAgICBcImVtYWlsXCI6IFwiODQ4MTMwNDU0QHFxLmNvbVwiLFxyXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vSGFsc2V5U3BpY3lcIlxyXG4gIH0sXHJcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXHJcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9IYWxzZXlTcGljeS9HZWVrZXItQWRtaW5cIixcclxuICBcInJlcG9zaXRvcnlcIjoge1xyXG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXHJcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkhhbHNleVNwaWN5L0dlZWtlci1BZG1pbi5naXRcIlxyXG4gIH0sXHJcbiAgXCJidWdzXCI6IHtcclxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0hhbHNleVNwaWN5L0dlZWtlci1BZG1pbi9pc3N1ZXNcIlxyXG4gIH0sXHJcbiAgXCJzY3JpcHRzXCI6IHtcclxuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxyXG4gICAgXCJzZXJ2ZVwiOiBcInZpdGVcIixcclxuICAgIFwiYnVpbGQ6ZGV2XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSBkZXZlbG9wbWVudFwiLFxyXG4gICAgXCJidWlsZDp0ZXN0XCI6IFwidnVlLXRzYyAmJiB2aXRlIGJ1aWxkIC0tbW9kZSB0ZXN0XCIsXHJcbiAgICBcImJ1aWxkOnByb1wiOiBcInZ1ZS10c2MgJiYgdml0ZSBidWlsZCAtLW1vZGUgcHJvZHVjdGlvblwiLFxyXG4gICAgXCJ0eXBlOmNoZWNrXCI6IFwidnVlLXRzYyAtLW5vRW1pdCAtLXNraXBMaWJDaGVja1wiLFxyXG4gICAgXCJwcmV2aWV3XCI6IFwibnBtIHJ1biBidWlsZDpkZXYgJiYgdml0ZSBwcmV2aWV3XCIsXHJcbiAgICBcImxpbnQ6ZXNsaW50XCI6IFwiZXNsaW50IC0tZml4IC0tZXh0IC5qcywudHMsLnZ1ZSAuL3NyY1wiLFxyXG4gICAgXCJsaW50OnByZXR0aWVyXCI6IFwicHJldHRpZXIgLS13cml0ZSBcXFwic3JjLyoqLyoue2pzLHRzLGpzb24sdHN4LGNzcyxsZXNzLHNjc3MsdnVlLGh0bWwsbWR9XFxcIlwiLFxyXG4gICAgXCJsaW50OnN0eWxlbGludFwiOiBcInN0eWxlbGludCAtLWNhY2hlIC0tZml4IFxcXCIqKi8qLnt2dWUsbGVzcyxwb3N0Y3NzLGNzcyxzY3NzfVxcXCIgLS1jYWNoZSAtLWNhY2hlLWxvY2F0aW9uIG5vZGVfbW9kdWxlcy8uY2FjaGUvc3R5bGVsaW50L1wiLFxyXG4gICAgXCJsaW50OmxpbnQtc3RhZ2VkXCI6IFwibGludC1zdGFnZWRcIixcclxuICAgIFwicHJlcGFyZVwiOiBcImh1c2t5IGluc3RhbGxcIixcclxuICAgIFwicmVsZWFzZVwiOiBcInN0YW5kYXJkLXZlcnNpb25cIixcclxuICAgIFwiY29tbWl0XCI6IFwiZ2l0IGFkZCAtQSAmJiBjemcgJiYgZ2l0IHB1c2hcIlxyXG4gIH0sXHJcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAZWxlbWVudC1wbHVzL2ljb25zLXZ1ZVwiOiBcIl4yLjMuMVwiLFxyXG4gICAgXCJAaGlnaGxpZ2h0anMvdnVlLXBsdWdpblwiOiBcIl4yLjEuMFwiLFxyXG4gICAgXCJAdnVldXNlL2NvcmVcIjogXCJeMTAuNy4xXCIsXHJcbiAgICBcIkB3YW5nZWRpdG9yL2VkaXRvclwiOiBcIl41LjEuMjNcIixcclxuICAgIFwiQHdhbmdlZGl0b3IvZWRpdG9yLWZvci12dWVcIjogXCJeNS4xLjEyXCIsXHJcbiAgICBcImF4aW9zXCI6IFwiXjEuNi4zXCIsXHJcbiAgICBcImRheWpzXCI6IFwiXjEuMTEuMTBcIixcclxuICAgIFwiZHJpdmVyLmpzXCI6IFwiXjEuMy4xXCIsXHJcbiAgICBcImVjaGFydHNcIjogXCJeNS40LjNcIixcclxuICAgIFwiZWNoYXJ0cy1saXF1aWRmaWxsXCI6IFwiXjMuMS4wXCIsXHJcbiAgICBcImVsZW1lbnQtcGx1c1wiOiBcIl4yLjQuNFwiLFxyXG4gICAgXCJtZDVcIjogXCJeMi4zLjBcIixcclxuICAgIFwibWl0dFwiOiBcIl4zLjAuMVwiLFxyXG4gICAgXCJtb25hY28tZWRpdG9yXCI6IFwiXjAuMjguMVwiLFxyXG4gICAgXCJucHJvZ3Jlc3NcIjogXCJeMC4yLjBcIixcclxuICAgIFwicGluaWFcIjogXCJeMi4xLjdcIixcclxuICAgIFwicGluaWEtcGx1Z2luLXBlcnNpc3RlZHN0YXRlXCI6IFwiXjMuMi4xXCIsXHJcbiAgICBcInFzXCI6IFwiXjYuMTEuMlwiLFxyXG4gICAgXCJzY3JlZW5mdWxsXCI6IFwiXjYuMC4yXCIsXHJcbiAgICBcInNvcnRhYmxlanNcIjogXCJeMS4xNS4xXCIsXHJcbiAgICBcInZ1ZVwiOiBcIl4zLjQuM1wiLFxyXG4gICAgXCJ2dWUtaTE4blwiOiBcIl45LjguMFwiLFxyXG4gICAgXCJ2dWUtcm91dGVyXCI6IFwiXjQuMi41XCIsXHJcbiAgICBcInZ1ZWRyYWdnYWJsZVwiOiBcIl40LjEuMFwiXHJcbiAgfSxcclxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcIkBjb21taXRsaW50L2NsaVwiOiBcIl4xOC40LjNcIixcclxuICAgIFwiQGNvbW1pdGxpbnQvY29uZmlnLWNvbnZlbnRpb25hbFwiOiBcIl4xOC40LjNcIixcclxuICAgIFwiQHR5cGVzL21kNVwiOiBcIl4yLjMuNVwiLFxyXG4gICAgXCJAdHlwZXMvbnByb2dyZXNzXCI6IFwiXjAuMi4zXCIsXHJcbiAgICBcIkB0eXBlcy9xc1wiOiBcIl42LjkuMTFcIixcclxuICAgIFwiQHR5cGVzL3NvcnRhYmxlanNcIjogXCJeMS4xNS43XCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjYuMTcuMFwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjYuMTcuMFwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWVcIjogXCJeNS4wLjJcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiOiBcIl4zLjEuMFwiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xNlwiLFxyXG4gICAgXCJjei1naXRcIjogXCJeMS44LjBcIixcclxuICAgIFwiY3pnXCI6IFwiXjEuOC4wXCIsXHJcbiAgICBcImVzbGludFwiOiBcIl44LjU2LjBcIixcclxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjEuMFwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLXByZXR0aWVyXCI6IFwiXjUuMS4yXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tdnVlXCI6IFwiXjkuMTkuMlwiLFxyXG4gICAgXCJodXNreVwiOiBcIl44LjAuM1wiLFxyXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjBcIixcclxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzJcIixcclxuICAgIFwicG9zdGNzcy1odG1sXCI6IFwiXjEuNS4wXCIsXHJcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMS4xXCIsXHJcbiAgICBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl41LjEyLjBcIixcclxuICAgIFwic2Fzc1wiOiBcIl4xLjY5LjdcIixcclxuICAgIFwic3RhbmRhcmQtdmVyc2lvblwiOiBcIl45LjUuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTYuMS4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctaHRtbFwiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY2Vzcy1vcmRlclwiOiBcIl40LjQuMFwiLFxyXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY29tbWVuZGVkLXNjc3NcIjogXCJeMTQuMC4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjb21tZW5kZWQtdnVlXCI6IFwiXjEuNS4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmRcIjogXCJeMzYuMC4wXCIsXHJcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtc2Nzc1wiOiBcIl4xMi4wLjBcIixcclxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjMuM1wiLFxyXG4gICAgXCJ1bnBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kLXBsdXNcIjogXCJeMS4wLjBcIixcclxuICAgIFwidml0ZVwiOiBcIl41LjAuMTBcIixcclxuICAgIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjogXCJeMC41LjFcIixcclxuICAgIFwidml0ZS1wbHVnaW4tZXNsaW50XCI6IFwiXjEuOC4xXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWh0bWxcIjogXCJeMy4yLjFcIixcclxuICAgIFwidml0ZS1wbHVnaW4tbW9uYWNvLWVkaXRvclwiOiBcIl4xLjEuMFwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1wd2FcIjogXCJeMC4xNy40XCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiOiBcIl4yLjAuMVwiLFxyXG4gICAgXCJ2dWUtdHNjXCI6IFwiXjEuOC4yN1wiXHJcbiAgfSxcclxuICBcImVuZ2luZXNcIjoge1xyXG4gICAgXCJub2RlXCI6IFwiPj0xNi4wLjBcIlxyXG4gIH0sXHJcbiAgXCJicm93c2Vyc2xpc3RcIjoge1xyXG4gICAgXCJwcm9kdWN0aW9uXCI6IFtcclxuICAgICAgXCI+IDElXCIsXHJcbiAgICAgIFwibm90IGRlYWRcIixcclxuICAgICAgXCJub3Qgb3BfbWluaSBhbGxcIlxyXG4gICAgXSxcclxuICAgIFwiZGV2ZWxvcG1lbnRcIjogW1xyXG4gICAgICBcImxhc3QgMSBjaHJvbWUgdmVyc2lvblwiLFxyXG4gICAgICBcImxhc3QgMSBmaXJlZm94IHZlcnNpb25cIixcclxuICAgICAgXCJsYXN0IDEgc2FmYXJpIHZlcnNpb25cIlxyXG4gICAgXVxyXG4gIH0sXHJcbiAgXCJjb25maWdcIjoge1xyXG4gICAgXCJjb21taXRpemVuXCI6IHtcclxuICAgICAgXCJwYXRoXCI6IFwibm9kZV9tb2R1bGVzL2N6LWdpdFwiXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1YsU0FBUyxjQUFjLGVBQXNDO0FBQ2paLFNBQVMsV0FBQUEsZ0JBQWU7OztBQ3FCakIsU0FBUyxXQUFXLFNBQThCO0FBQ3ZELFFBQU0sTUFBVyxDQUFDO0FBRWxCLGFBQVcsV0FBVyxPQUFPLEtBQUssT0FBTyxHQUFHO0FBQzFDLFFBQUksV0FBVyxRQUFRLE9BQU8sRUFBRSxRQUFRLFFBQVEsSUFBSTtBQUNwRCxlQUFXLGFBQWEsU0FBUyxPQUFPLGFBQWEsVUFBVSxRQUFRO0FBQ3ZFLFFBQUksWUFBWTtBQUFhLGlCQUFXLE9BQU8sUUFBUTtBQUN2RCxRQUFJLFlBQVksY0FBYztBQUM1QixVQUFJO0FBQ0YsbUJBQVcsS0FBSyxNQUFNLFFBQVE7QUFBQSxNQUNoQyxTQUFTLE9BQU87QUFBQSxNQUFDO0FBQUEsSUFDbkI7QUFDQSxRQUFJLE9BQU8sSUFBSTtBQUFBLEVBQ2pCO0FBQ0EsU0FBTztBQUNUOzs7QUN6Qk8sU0FBUyxZQUFZLE9BQWtCLENBQUMsR0FBRztBQUNoRCxRQUFNLE1BQXVCLENBQUM7QUFDOUIsYUFBVyxDQUFDLFFBQVEsTUFBTSxLQUFLLE1BQU07QUFDbkMsVUFBTSxVQUFVO0FBQ2hCLFVBQU0sVUFBVSxRQUFRLEtBQUssTUFBTTtBQUduQyxRQUFJLE1BQU0sSUFBSTtBQUFBLE1BQ1o7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLElBQUk7QUFBQSxNQUNKLFNBQVMsVUFBUSxLQUFLLFFBQVEsSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUFBO0FBQUEsTUFFMUQsR0FBSSxVQUFVLEVBQUUsUUFBUSxNQUFNLElBQUksQ0FBQztBQUFBLElBQ3JDO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDs7O0FDN0JnVyxTQUFTLGVBQWU7QUFFeFgsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsa0JBQWtCO0FBQzNCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFFbkIsT0FBTyxxQkFBcUI7QUFDNUIsT0FBTyxvQkFBb0I7QUFNcEIsSUFBTSxvQkFBb0IsQ0FBQyxZQUF3RDtBQUN4RixRQUFNLEVBQUUscUJBQXFCLGFBQWEsU0FBUyxJQUFJO0FBQ3ZELFNBQU87QUFBQSxJQUNMLElBQUk7QUFBQTtBQUFBLElBRUosT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLElBSVAsZUFBZSxDQUFDLENBQUM7QUFBQTtBQUFBLElBRWpCLGtCQUFrQixPQUFPO0FBQUE7QUFBQSxJQUV6QixpQkFBaUI7QUFBQSxNQUNmLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxRQUNOLE1BQU0sRUFBRSxPQUFPLG9CQUFvQjtBQUFBLE1BQ3JDO0FBQUEsSUFDRixDQUFDO0FBQUE7QUFBQSxJQUVELHFCQUFxQjtBQUFBLE1BQ25CLFVBQVUsQ0FBQyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsTUFDckQsVUFBVTtBQUFBLElBQ1osQ0FBQztBQUFBO0FBQUEsSUFFRCxZQUFZLGNBQWMsT0FBTztBQUFBO0FBQUEsSUFFakMsZUFBZ0IsV0FBVyxFQUFFLFVBQVUsY0FBYyxVQUFVLE1BQU0sWUFBWSxLQUFLLENBQUM7QUFBQSxFQUN6RjtBQUNGO0FBTUEsSUFBTSxvQkFBb0IsQ0FBQyxZQUFvRDtBQUM3RSxRQUFNLEVBQUUsc0JBQXNCLFFBQVEsdUNBQXVDLElBQUk7QUFDakYsUUFBTSxlQUFlLG9CQUFvQixNQUFNLEdBQUc7QUFDbEQsUUFBTSxVQUEwQixDQUFDO0FBQ2pDLE1BQUksYUFBYSxTQUFTLE1BQU0sR0FBRztBQUNqQyxZQUFRO0FBQUEsTUFDTixnQkFBZ0I7QUFBQSxRQUNkLEtBQUs7QUFBQSxRQUNMLFdBQVc7QUFBQSxRQUNYLGtCQUFrQjtBQUFBLE1BQ3BCLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNBLE1BQUksYUFBYSxTQUFTLFFBQVEsR0FBRztBQUNuQyxZQUFRO0FBQUEsTUFDTixnQkFBZ0I7QUFBQSxRQUNkLEtBQUs7QUFBQSxRQUNMLFdBQVc7QUFBQSxRQUNYLGtCQUFrQjtBQUFBLE1BQ3BCLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQU1BLElBQU0sZ0JBQWdCLENBQUMsWUFBb0Q7QUFDekUsUUFBTSxFQUFFLG9CQUFvQixJQUFJO0FBQ2hDLFNBQU8sUUFBUTtBQUFBLElBQ2IsY0FBYztBQUFBLElBQ2QsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLEtBQUs7QUFBQSxVQUNMLE9BQU87QUFBQSxVQUNQLE1BQU07QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFVBQ0UsS0FBSztBQUFBLFVBQ0wsT0FBTztBQUFBLFVBQ1AsTUFBTTtBQUFBLFFBQ1I7QUFBQSxRQUNBO0FBQUEsVUFDRSxLQUFLO0FBQUEsVUFDTCxPQUFPO0FBQUEsVUFDUCxNQUFNO0FBQUEsVUFDTixTQUFTO0FBQUEsUUFDWDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7OztBQzdHQTtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsUUFBVTtBQUFBLElBQ1IsTUFBUTtBQUFBLElBQ1IsT0FBUztBQUFBLElBQ1QsS0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFNBQVc7QUFBQSxFQUNYLFVBQVk7QUFBQSxFQUNaLFlBQWM7QUFBQSxJQUNaLE1BQVE7QUFBQSxJQUNSLEtBQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxNQUFRO0FBQUEsSUFDTixLQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsY0FBYztBQUFBLElBQ2QsU0FBVztBQUFBLElBQ1gsZUFBZTtBQUFBLElBQ2YsaUJBQWlCO0FBQUEsSUFDakIsa0JBQWtCO0FBQUEsSUFDbEIsb0JBQW9CO0FBQUEsSUFDcEIsU0FBVztBQUFBLElBQ1gsU0FBVztBQUFBLElBQ1gsUUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLGNBQWdCO0FBQUEsSUFDZCwyQkFBMkI7QUFBQSxJQUMzQiwyQkFBMkI7QUFBQSxJQUMzQixnQkFBZ0I7QUFBQSxJQUNoQixzQkFBc0I7QUFBQSxJQUN0Qiw4QkFBOEI7QUFBQSxJQUM5QixPQUFTO0FBQUEsSUFDVCxPQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixTQUFXO0FBQUEsSUFDWCxzQkFBc0I7QUFBQSxJQUN0QixnQkFBZ0I7QUFBQSxJQUNoQixLQUFPO0FBQUEsSUFDUCxNQUFRO0FBQUEsSUFDUixpQkFBaUI7QUFBQSxJQUNqQixXQUFhO0FBQUEsSUFDYixPQUFTO0FBQUEsSUFDVCwrQkFBK0I7QUFBQSxJQUMvQixJQUFNO0FBQUEsSUFDTixZQUFjO0FBQUEsSUFDZCxZQUFjO0FBQUEsSUFDZCxLQUFPO0FBQUEsSUFDUCxZQUFZO0FBQUEsSUFDWixjQUFjO0FBQUEsSUFDZCxjQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQixtQkFBbUI7QUFBQSxJQUNuQixtQ0FBbUM7QUFBQSxJQUNuQyxjQUFjO0FBQUEsSUFDZCxvQkFBb0I7QUFBQSxJQUNwQixhQUFhO0FBQUEsSUFDYixxQkFBcUI7QUFBQSxJQUNyQixvQ0FBb0M7QUFBQSxJQUNwQyw2QkFBNkI7QUFBQSxJQUM3QixzQkFBc0I7QUFBQSxJQUN0QiwwQkFBMEI7QUFBQSxJQUMxQixjQUFnQjtBQUFBLElBQ2hCLFVBQVU7QUFBQSxJQUNWLEtBQU87QUFBQSxJQUNQLFFBQVU7QUFBQSxJQUNWLDBCQUEwQjtBQUFBLElBQzFCLDBCQUEwQjtBQUFBLElBQzFCLHFCQUFxQjtBQUFBLElBQ3JCLE9BQVM7QUFBQSxJQUNULGVBQWU7QUFBQSxJQUNmLFNBQVc7QUFBQSxJQUNYLGdCQUFnQjtBQUFBLElBQ2hCLFVBQVk7QUFBQSxJQUNaLDRCQUE0QjtBQUFBLElBQzVCLE1BQVE7QUFBQSxJQUNSLG9CQUFvQjtBQUFBLElBQ3BCLFdBQWE7QUFBQSxJQUNiLHlCQUF5QjtBQUFBLElBQ3pCLGlDQUFpQztBQUFBLElBQ2pDLHFDQUFxQztBQUFBLElBQ3JDLG9DQUFvQztBQUFBLElBQ3BDLDZCQUE2QjtBQUFBLElBQzdCLGtDQUFrQztBQUFBLElBQ2xDLFlBQWM7QUFBQSxJQUNkLGtDQUFrQztBQUFBLElBQ2xDLE1BQVE7QUFBQSxJQUNSLDJCQUEyQjtBQUFBLElBQzNCLHNCQUFzQjtBQUFBLElBQ3RCLG9CQUFvQjtBQUFBLElBQ3BCLDZCQUE2QjtBQUFBLElBQzdCLG1CQUFtQjtBQUFBLElBQ25CLHlCQUF5QjtBQUFBLElBQ3pCLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsY0FBZ0I7QUFBQSxJQUNkLFlBQWM7QUFBQSxNQUNaO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxhQUFlO0FBQUEsTUFDYjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVU7QUFBQSxJQUNSLFlBQWM7QUFBQSxNQUNaLE1BQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUNGOzs7QUp4SEEsT0FBTyxXQUFXO0FBTmxCLElBQU0sbUNBQW1DO0FBUXpDLElBQU0sRUFBRSxjQUFjLGlCQUFpQixNQUFNLFFBQVEsSUFBSTtBQUN6RCxJQUFNLGVBQWU7QUFBQSxFQUNuQixLQUFLLEVBQUUsY0FBYyxpQkFBaUIsTUFBTSxRQUFRO0FBQUEsRUFDcEQsZUFBZSxNQUFNLEVBQUUsT0FBTyxxQkFBcUI7QUFDckQ7QUFHQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBNkI7QUFDL0QsUUFBTSxPQUFPLFFBQVEsSUFBSTtBQUN6QixRQUFNLE1BQU0sUUFBUSxNQUFNLElBQUk7QUFDOUIsUUFBTSxVQUFVLFdBQVcsR0FBRztBQUU5QixTQUFPO0FBQUEsSUFDTCxNQUFNLFFBQVE7QUFBQSxJQUNkO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLQyxTQUFRLGtDQUFXLE9BQU87QUFBQSxRQUMvQixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLGNBQWMsS0FBSyxVQUFVLFlBQVk7QUFBQSxJQUMzQztBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTSxRQUFRO0FBQUEsTUFDZCxNQUFNLFFBQVE7QUFBQSxNQUNkLE1BQU07QUFBQTtBQUFBLE1BRU4sT0FBTyxZQUFZLFFBQVEsVUFBVTtBQUFBLE1BQ3JDLEtBQUs7QUFBQSxJQUNQO0FBQUEsSUFDQSxTQUFTLGtCQUFrQixPQUFPO0FBQUEsSUFDbEMsU0FBUztBQUFBLE1BQ1AsTUFBTSxRQUFRLG9CQUFvQixDQUFDLGVBQWUsVUFBVSxJQUFJLENBQUM7QUFBQSxJQUNuRTtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVNSLFdBQVc7QUFBQTtBQUFBLE1BRVgsc0JBQXNCO0FBQUE7QUFBQSxNQUV0Qix1QkFBdUI7QUFBQSxNQUN2QixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUE7QUFBQSxVQUVOLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInJlc29sdmUiLCAicmVzb2x2ZSJdCn0K
