/*
 * @Author: qingzi tsy15632385483@163.com
 * @Date: 2024-01-23 11:07:40
 * @LastEditors: qingzi tsy15632385483@163.com
 * @LastEditTime: 2024-01-23 12:29:56
 * @FilePath: \yl_admin_base_project\src\config\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// ? 全局默认配置项

// 首页地址（默认） /home/index
export const HOME_URL: string = "/dashboard/dataVisualize";

// 登录页地址（默认）
export const LOGIN_URL: string = "/login";

// 默认主题颜色
export const DEFAULT_PRIMARY: string = "#0090D1";

// 路由白名单地址（本地存在的路由 staticRouter.ts 中）
export const ROUTER_WHITE_LIST: string[] = ["/500"];

// 高德地图 key
export const AMAP_MAP_KEY: string = "";

// 百度地图 key
export const BAIDU_MAP_KEY: string = "";
