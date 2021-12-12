// p-reduce
const delay = (time: number, item: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(item.value)
    }, time)
  })
}

const inputs = [Promise.resolve(1), delay(50, { value: 6 }), 8]
async function main() {
  const result = await pReduce(inputs, async (a: any, b: any) => a + b, 0)
  console.log(result) // 输出15
}
main()

export async function pReduce(iterable: any, reducer: any, initialValue: any) {
  return new Promise((resolve, reject) => {
    const iterator = iterable[Symbol.iterator]()
    let index = 0 // 索引

    const next = async (total: number) => {
      const element = iterator.next() // 获取下一项

      if (element.done) {
        // 判断迭代器是否迭代完成
        resolve(total)
        return
      }

      try {
        const [resolveTotal, resolvedValue] = await Promise.all([
          total,
          element.value,
        ])
        // 迭代下一项
        next(reducer(resolveTotal, resolvedValue))
      } catch (error) {
        reject(error)
      }
      // 使用初始值，开始迭代

      next(initialValue)
    }
  })
}

// 二差堆

const minHeapSort = (arr: any) => {
  // 1. 构造最小堆
  buildMinHeap(arr)
  // 2. 循环提取根节点arr[0], 直到全部提取完
  for (let i = arr.length - 1; i > 0; i--) {
    let tmp = arr[0]
    arr[0] = arr[i]
    arr[i] = tmp
    siftDown(arr, 0, i - 1)
  }
}

// 把整个数组构造成最小堆
const buildMinHeap = (arr: any) => {
  if (arr.length < 2) {
    return arr
  }
  const startIndex = Math.floor(arr.length / 2 - 1)
  for (let i = startIndex; i >= 0; i--) {
    siftDown(arr, i, arr.length - 1)
  }
}

// 从startIndex索引开始, 向下调整最小堆
// arr = [5,8,0,10,4,6,1] stratIndex: 2,1,0 endIndex: 6
const siftDown = (arr: any, startIndex: any, endIndex: any) => {
  const leftChildIndx = 2 * startIndex + 1
  const rightChildIndx = 2 * startIndex + 2
  let swapIndex = startIndex
  let tmpNode = arr[startIndex]
  if (leftChildIndx <= endIndex) {
    if (arr[leftChildIndx] < tmpNode) {
      // 待定是否交换, 因为right子节点有可能更小
      tmpNode = arr[leftChildIndx]
      swapIndex = leftChildIndx
    }
  }
  if (rightChildIndx <= endIndex) {
    if (arr[rightChildIndx] < tmpNode) {
      // 比left节点更小, 替换swapIndex
      tmpNode = arr[rightChildIndx]
      swapIndex = rightChildIndx
    }
  }
  if (swapIndex !== startIndex) {
    // 1.交换节点
    arr[swapIndex] = arr[startIndex]
    arr[startIndex] = tmpNode

    // 2. 递归调用, 继续向下调整
    siftDown(arr, swapIndex, endIndex)
  }
}

var arr1 = [5, 8, 0, 10, 4, 6, 1]
minHeapSort(arr1)
console.log(arr1) // [10, 8, 6, 5,4, 1, 0]

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data]) // 执行成功，返回数组第一项为 null。第二个是结果。
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err, errorExt)
      }

      return [err, undefined] // 执行失败，返回数组第一项为错误信息，第二项为 undefined
    })
}

export const compose = (fn: any[]) => (value: any) => {
  return fn.reduce((v, fn) => {
    return fn(v)
  }, value)
}

export const compose1 = (fn: any[]) => (value: any) =>
  fn.reduce((v, fn) => fn(v), value)


  