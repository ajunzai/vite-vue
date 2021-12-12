const entries = [
  {
    province: "浙江",
    city: "杭州",
    name: "西湖",
  },
  {
    province: "四川",
    city: "成都",
    name: "锦里",
  },
  {
    province: "四川",
    city: "成都",
    name: "方所",
  },
  {
    province: "四川",
    city: "阿坝",
    name: "九寨沟",
  },
]

const level = ["province", "city", "name"]

function transfrom(list: any[], level: string[]) {
  const res: any[] = []
  list.forEach((item) => {
    pushItem(res, item, 0)
  })

  function pushItem(arr: any[], obj: any, i: number) {
    const o: any = {
      value: obj[level[i]],
      children: [],
    }
    // 判断传入数组里是否有value等于要传入的项
    const hasItem = arr.find((el) => el.value === obj[level[i]])
    let nowArr
    if (hasItem) {
      nowArr = hasItem.children // 存在，则下一次遍历传入存在项的children
    } else {
      // 不存在 压入arr，下一次遍历传入此项的children
      arr.push(o)
      nowArr = o.children
    }
    if (i === level.length -1) delete o.children
    i++
    if (i < level.length) {
      pushItem(nowArr, obj, i)
    }
  }
}

transfrom(entries, level)

//  js 原生instanceof

function _instanceof(left: any, right: any) {
  const prototype = right.prototype
  left = left.__proto__

  while(true) {
    if (left === null) {
      return false
    }
    if (left === prototype) {
      return true
    }
    left = left.__proto__
  }
}