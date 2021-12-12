import marked from "marked"
import Tocify from './toc'

export const tocify = new Tocify();
const renderer = new marked.Renderer()
renderer.heading = function (text, level, raw) {
  // console.log("heading: ", text, level, raw)
  if (level <= 3) {
    tocify.add(text, level, raw)
    return `<h${level} id="${raw}">${text}</h${level}>`
  }
  return `<h${level}>${text}</h${level}>`
}

marked.setOptions({
  breaks: true,
  gfm: true,
  smartLists: true,
})

export const markdownToHtml = (markdown: string) => {
  return marked(
    markdown.replace(/(\n)?\$\$[\s\S]*?\$\$(\n)?/g, (match, key) => {
      if (match.includes("\n")) {
        return match.replace(/\$\$[\s\S]*?\$\$/g, (match) => {
          return "`" + match + "`"
        })
      }
      return "`" + match.replace(/\$\$/g, "$") + "`"
    }),
    { renderer: renderer }
  )
}
