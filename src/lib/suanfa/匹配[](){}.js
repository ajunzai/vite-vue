// 匹配[]{}()

const map = {
  '{': "}",
  "[": "]",
  "(": ")"
}

function isMatch(str) {
  if (str.lenght%2 !== 0) return false
  const stack = []
  for (let ch of str) {
    if (stack[stack.length - 1] === ch) {
      stack.pop()
    } else {
      stack.push(map[ch])
    }
  }
  return !stack.length
}