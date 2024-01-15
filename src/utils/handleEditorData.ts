/**
 * 处理echarsOption
 * @param option echarsOption
 * 拼接 字符串：option = option
 * @returns
 */
export function handleEditorData(option) {
  console.log(option);

  const a = convertToTemplate(option);
  // console.log(a);

  const n = `${option}`;
  // console.log(n);
  // console.log(option.toString());

  const handleOption = `option=${JSON.stringify(option)}`;
  // const aaa = eval(`(${handleOption})`)
  // console.log(aaa);
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
      // console.log(`${obj[key]}`);
      // console.log(`${key}`);
      // console.log(obj[key]);
      obj[key].forEach(element => {
        console.log(element, "arr");
        template += `${key}: ${obj[key]},}`;
        // console.log(`${key}: ${obj[key]}`);
      });

      // // 如果属性值是数组类型，则遍历数组并添加到模板中
      // template += `${key}: [${obj[key].join(', ')}], `;
    } else {
      // 其他情况不需要特殊处理，直接添加到模板中
      template += `${key}: ${JSON.stringify(obj[key])}, `;
    }
  }

  return template;
}
// function convertToTemplate(obj) {
//   let template = "";

//   for (let key in obj) {
//     if (typeof obj[key] === "string") {
//       // 如果属性值是字符串类型，则直接添加到模板中
//       template += `${key}: ${obj[key]},}`;
//     } else if (Array.isArray(obj[key])) {
//       // console.log(`${key}:${obj[key]}`, '111');
//       // console.log(`${obj[key]}`);
//       // console.log(`${key}`);

//       // // 如果属性值是数组类型，则遍历数组并添加到模板中
//       // template += `${key}: [${obj[key].join(', ')}], `;
//     } else if (typeof obj[key] === "object" && !Array.isArray(obj[key]) && obj[key] !== null) {
//       // 如果属性值是非空对象类型，则调用自身进行递归处理
//       template += `${key}: { \n`;
//       template += convertToTemplate(obj[key]);
//       template += `\n}\n `;
//     } else {
//       // 其他情况不需要特殊处理，直接添加到模板中
//       template += `${key}: ${JSON.stringify(obj[key])}, `;
//     }
//   }

//   return template;
// }
// function convertToTemplateString(obj) {
//   let template = '';

//   for (let key in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, key)) { // 确保只处理自身的属性而不包括原型上的属性
//       const value = obj[key];

//       // 根据需要进行格式化或其他操作
//       template += `${key}: ${value},`;
//     }
//   }

//   return `{${template}}`;
// }

// const myObj = { name: 'John', age: 25 };
// console.log(convertToTemplateString(myObj));
// Output: "{name: John,age: 25}"
