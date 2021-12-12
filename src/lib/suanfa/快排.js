function quickSort(arr, left, right) {
  let len = arr.length
  let partiIndex
  left = typeof left !== 'number' ? 0 : left
  right = typeof right !== 'number' ? len - 1 : right
  if (left < right) {
    partiIndex = partition(arr, left, right) // 这个值就是下次平分的基准值
    quickSort(arr, left, partiIndex - 1)
    quickSort(arr, partiIndex + 1, right)
  }
  return arr
}
// 取左右两边，拿到某一边第二项的作为基准值，如果比他小就置换在他后面一位（这个位置是累加的index指向）
function partition(arr, left, right) {
  // 分区操作
  let pivot = left
  let index = pivot + 1 // 设定基准值
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[pivot]) {
      swap(arr, i, index)
      index++
    }
  }
  // 如果不增加就自己替换自己
  // 比较一个基准值和累计左右互换前一次的下标值进行互换
  swap(arr, pivot, index - 1)
  return index - 1
}

function swap(arr, i, j) {
  let tmp = arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}

// quickSort([3,54,23,25,2,6,14])
const a = quickSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
console.log('1', a)

function quickSortBinary(arr) {
  if (arr.length <= 1) return arr
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]
  let left = []
  let right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSortBinary(left).concat([pivot], quickSortBinary(right))
}
const b = quickSortBinary([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
console.log('2', b)

// 选择排序 每次循环默认设置外层第一个为最小节点，当有元素小于最小节点，则保存最小下标，对最外层遍历替换
function selectSort(arr) {
  let len = arr.length
  let minIndex, temp
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

// 插入排序 从第一个基准开始抽取，并且循环递增。然后循环之前的元素如果大于基准则互换位置
function insertSrot(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i]
    let j = i - 1
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      j--
    }
    arr[j + 1] = key
  }
  return arr
}
