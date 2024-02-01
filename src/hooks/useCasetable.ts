/*
 * @Author: qingzi tsy15632385483@163.com
 * @Date: 2024-01-31 17:57:23
 * @LastEditors: qingzi tsy15632385483@163.com
 * @LastEditTime: 2024-02-01 16:04:08
 * @FilePath: \casetemplage\src\hooks\useCasetable.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref } from "vue";

const columns = ref();
const tableData = ref();
export const useCasetable = (routename: any) => {
  // columns.value = [];
  // tableData.value = [];
  // fetch(`/json/table.json`)
  console.log(`routername`, routename);
  fetch(`/json/${routename}.json`)
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData);
      columns.value = jsonData.tableColumns;
      tableData.value = jsonData.tableData;

      console.log(columns.value);
      console.log(tableData.value);
    })
    .catch(error => {
      console.error(error);
    });

  return {
    columns,
    tableData
  };
};
