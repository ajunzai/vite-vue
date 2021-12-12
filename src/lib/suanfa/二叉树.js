// 二叉树 栈的实现方式
/**
 * 通用模板
 * @param {*} root 
 */
const traver = (root) => {
  const stack = []
  while( root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    root = root.right
  }
}

// 前序遍历
const preTraver = (root) => {
  const stack = []
  const ret = []
  while(root || stack.length) {
    while(root) {
      ret.push(root.val)
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    root = root.right
  }
  return res
}

// 中序遍历
const midTraver = (root) => {
  const stack = []
  const ret = []
  while(root || stack.length) {
    while(root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    ret.push(root.val)
    root = root.right
  }
  return ret
}

// 后序遍历 从右边开始遍历，插到最前面
const endTraver = (root) => {
  const stack = []
  const ret = []
  while(root || stack.length) {
    while(root) {
      stack.push(root)
      res.unshift(root.val)
      root = root.right
    }
    root = stack.pop()
    root = root.left
  }
}

// 二叉树的深度
function maxDepth(root) {
  if (!root) return root
  let ret = 1
  function dfs(root, depth) {
    if (!root.left && !root.right) ret = Math.max(ret, depth)
    if (root.left) dfs(root.left, depth + 1)
    if (root.right) dfs(root.right, depth + 1)
  }
  dfs(root, ret)
  return ret
}