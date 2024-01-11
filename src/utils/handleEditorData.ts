/**
 * 处理echarsOption
 * @param option echarsOption
 * 拼接 字符串：option = option
 * @returns
 */
export function handleEditorData(option) {
  const obj = JSON.stringify(option);
  // console.log(obj);
  // const b = option.toString()
  // console.log(b);

  // // let person = JSON.parse(obj);
  // // console.log(`${person}`);
  // // const obj = Object.assign({}, option)
  // // console.log(JSON.parse(JSON.stringify(`${obj}`)));
  const a = convertToTemplate(option);
  console.log(a);

  // const handleOption = `option= ${obj}`
  const handleOption = `option= {
        a:1
    }`;
  // console.log(typeof handleOption)
  return handleOption;
}

function convertToTemplate(obj) {
  let template = "";

  for (let key in obj) {
    if (typeof obj[key] === "string") {
      // 如果属性值是字符串类型，则直接添加到模板中
      template += `${key}: ${obj[key]},}`;
    } else if (Array.isArray(obj[key])) {
      // console.log(`${key}:${obj[key]}`, '111');
      console.log(`${obj[key]}`);
      console.log(`${key}`);

      // // 如果属性值是数组类型，则遍历数组并添加到模板中
      // template += `${key}: [${obj[key].join(', ')}], `;
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null) {
      // 如果属性值是非空对象类型，则调用自身进行递归处理
      template += `${key}: { \n`;
      template += convertToTemplate(obj[key]);
      template += `\n}\n `;
    } else {
      // 其他情况不需要特殊处理，直接添加到模板中
      template += `${key}: ${JSON.stringify(obj[key])}, `;
    }
  }

  return template;
}
