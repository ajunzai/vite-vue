<template>
  <div class="markdown-wrapper">
    <div class="input">
      <input type="file" ref="uploadInput" @change="onchange" />
    </div>
    <div class="container">
      <div class="left">
        <div class="item-level" :data-level="toc.level" v-for="(toc, ind) in tocRef" :key="ind">
          {{toc.anchor}}---{{toc.level}}
        </div>
      </div>
      <div class="right knowledge-content" v-html="markdownRef">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, toRefs } from "vue"
import { UploadFilled } from "@element-plus/icons"
import { markdownToHtml, tocify } from "./marked"
export default defineComponent({
  name: "markdown",
  setup(props, { attrs, slots, emit }) {
    const logoRef = ref<HTMLImageElement | null>(null)
    const uploadInput = ref<HTMLInputElement | null>(null)
    const markdownRef = ref<string>('')
    const tocRef = ref<any[]>([])
    onMounted(() => {
      const user = reactive({
        name: "小浪",
        age: 21,
      })

      let userObj = toRefs(user)
      // console.log(userObj)
      // console.log(logoRef)
    })

    const onchange = async (e: Event) => {
      const input = <HTMLInputElement>e.target
      let files = input.files
      const content = (await readFileAsync(files![0])) as string
      // console.log("2222", content)
      const markedContent = markdownToHtml(content)
      markdownRef.value = markedContent
      tocRef.value = tocify.getToc()
    }

    const readFileAsync = (file: File): Promise<any> => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsText(file, "utf-8")
        reader.onload = function (evt) {
          resolve(evt?.target?.result)
        }
      })
    }

    return {
      logoRef,
      onchange,
      markdownRef,
      tocRef
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  width: 1128px;
  margin: 0 auto;
  min-height: 500px;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 280px;
  background: #d7d7d7;
  display: flex;
  flex-direction: column;
  .item-level {
    width: 100%;
    height: 40px;
  }
}
.right {
  width: 800px;
  background: #d7d7d7;
}
</style>
<style lang="scss">
.knowledge-content {
  line-height: 1.5;
  font-size: 14px;
  color: #312e4d;

  > p {
    margin: 8px 0;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 500;
  }

  h2,
  h3,
  h4 {
    padding: 8px 0;
    margin: 0;
  }

  h1 {
    padding: 32px 0 4px;
    font-size: 20px;
  }

  h2 {
    font-size: 18px;
  }

  h3 {
    font-size: 16px;
  }

  h4,
  h5 {
    font-size: 14px;
  }

  code {
    margin: 0;
  }

  /* h3 + h4 {
    padding-top: 0;
  }

  h4 + h3 {
    padding-top: 0;
  } */

  // h2 {
  //   font-size: 20px !important;
  //   padding-bottom: 16px !important;
  // }

  h3 {
    // font-size: 13pt;
    line-height: 28px;
  }

  img {
    max-width: 100%;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  ul,
  ol {
    padding: 0;
    list-style-position: outside;
    margin-left: 20px;
  }

  li {
    margin-left: 20px;
    line-height: 1.8 !important;
    // p {
    //   display: inline;
    // }
  }

  .knowledge-code {
    background: rgba($color: #3c3b53, $alpha: 0.9) !important;
    border-radius: 4px;
    margin: 8px 0;
    width: calc(583px - 96px) !important;
    min-width: calc(583px - 96px) !important;
  }

  table {
    // width: 0;
    table-layout: fixed;
    border-collapse: separate; /* the default option */
    border-spacing: 0; /* remove border gaps */
    border-top: 1px solid #d6d6d6;
    font-size: 15px;

    thead {
      th {
        border-color: rgb(216, 206, 204);
        background-color: rgb(254, 242, 240);
      }
    }

    tr {
      height: 30px;
    }

    td,
    th {
      word-wrap: break-word;
      word-break: break-word;
      min-height: 30px;
      border-right: 1px solid #d6d6d6;
      border-bottom: 1px solid #d6d6d6;
      padding: 4px 6px;

      &:first-child {
        border-left: 1px solid #d6d6d6;
      }

      &.selected::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: -1px;
        border: 1px double #888;
        z-index: 2;
        background: rgba(0, 0, 0, 0.07);
      }
    }
  }

  blockquote {
    border-left: 4px solid rgba($color: #eb9f52, $alpha: 0.2);
    font-size: 14px;
    line-height: 1.7;
    color: rgba(#312e4d, 0.6);
    background: rgba(235, 159, 82, 0.06);
    padding: 4px 0;

    > * {
      padding-left: 15px;
    }
    li {
      margin-left: 0;
    }
  }

  .katex {
    font-family: inherit;
    font-size: inherit;
  }
}
</style>