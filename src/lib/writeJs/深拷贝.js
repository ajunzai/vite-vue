function isObject(obj) {
  return obj !== null && typeof obj === "object"
}

function cloneDeep(target) {
  if (!isObject(target)) return target
  let result = Array.isArray(target) ? [] : {}
  for (const key in target) {
    result[key] = cloneDeep(target[key])
  }
  return result
}

// 解决问题思路： 解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系
// 循环引用的深拷贝
function cloneDeepLoop(target, map = new Map()) {
  if (!isObject(target)) return target
  // 遍历到之前遍历过的引用直接返回
  if (map.get(target)) return map.get(target)

  let result = Array.isArray(target) ? [] : {}

  map.set(target, result)

  for (const key in target) {
    result[key] = cloneDeepLoop(target[key], map)
  }
  
  return result
}

// * weakMap做优化。弱引用，指不确保引用的对象被垃圾回收器回收的引用。则被认为是不可访问的
// *                   并因此可能在任何时刻被回收。

/*   如果我们使用Map的话，那么对象间是存在强引用关系的
 **  虽然我们手动将obj，进行释放，然是target依然对obj存在强引用关系，
 **  所以这部分内存依然无法被释放。
 */
 let obj = { name : 'ConardLi'}
 const target = new Map();
target.set(obj,'code秘密花园');
 obj = null;

 // 对比遍历数组和对象 for in 属于耗时最多的。
// 使用while 实现循环 迭代器？？？
function forEach(array, iterate) {
  let index = -1
  const length = array.length
  while(++index < length) {
    iterate(array[index], index)
  }
  return array
}


// 优化最终版
function cloneDeepLoop1(target, map = new WeakMap()) {
  if (!isObject(target)) return target
  // 遍历到之前遍历过的引用直接返回
  if (map.get(target)) return map.get(target)

  let result = Array.isArray(target) ? [] : {}

  map.set(target, result)

  const keys = Array.isArray(target) ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    result[key] = cloneDeepLoop1(target[key], map)
  })
  return result
}

// 可继续遍历类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

// 不可继续遍历类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';

// 通过Object.prototype.toString.call()拿到对应类型，做对应的逻辑操作

// ! 克隆函数
// 首先，我们可以通过prototype来区分下箭头函数和普通函数，箭头函数是没有prototype的。
// 我们可以直接使用eval和函数字符串来重新生成一个箭头函数，注意这种方法是不适用于普通函数的。
// 我们可以使用正则来处理普通函数

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = func.toString();
  if (func.prototype) {
      console.log('普通函数');
      const param = paramReg.exec(funcString);
      const body = bodyReg.exec(funcString);
      if (body) {
          console.log('匹配到函数体：', body[0]);
          if (param) {
              const paramArr = param[0].split(',');
              console.log('匹配到参数：', paramArr);
              return new Function(...paramArr, body[0]);
          } else {
              return new Function(body[0]);
          }
      } else {
          return null;
      }
  } else {
      return eval(funcString);
  }
}

// https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/1/16ce893e6ec12377~tplv-t2oaga2asx-watermark.awebp