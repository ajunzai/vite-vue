// 反转链表
function reverseList(head) {
  let [pre, node] = [null, head]
  while (node) {
    const temp = node.next
    node.next = pre
    pre = node
    node = temp
  }
  return pre
}

// 两个有序链表合并
function mergeTwoLists(l1, l2) {
  if (l1 === null) {
    return l2
  }
  if (l2 === null) {
    return l1
  }
  if (l1.val > l2.val) {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  } else {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  }
}
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val
  this.next = next === undefined ? null : next
}
function mergeTwoLists1(l1, l2) {
  const dummpy = (node = new ListNode())
  while (l1 && l2) {
    if (l1.val > l2.val) {
      node.next = l2
      node = node.next
      l2 = l2.next
    } else {
      node.next = l1
      node = node.next
      l1 = l1.next
    }
  }
  node.next = l1 || l2
  return dummpy.next
}

// 判断回文链表 思路: 把值添加到数组中， 然后通过双指针
var isPalindrome = function (head) {
  var vals = []
  while (head) {
    vals.push(head.val)
    head = head.next
  }
  let start = 0
  let end = vals.length - 1
  while (start < end) {
    if (vals[start] !== vals[end]) {
      return false
    }
    start++
    end--
  }
  return true
}
