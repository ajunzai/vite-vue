// 参考https://learnku.com/articles/34040
export default class Tocify {
  anchors: string[]
  tocItems: any[]
  constructor() {
    this.anchors = []
    this.tocItems = []
  }

  add(text: string, level: number, id: string) {
    // 判断重名
    const count = this.anchors.filter(anchor => anchor === id).length
    const anchor = count ? `${id}${count}` : id
    this.anchors.push(anchor)
    this.tocItems.push({ anchor, level, text})
  }

  reset = () => {
    this.tocItems = []
    this.anchors = []
  }

  getToc = () => {
    return this.tocItems
  } 
}