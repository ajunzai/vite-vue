<template>
  <img class="img" ref="logoRef" alt="Vue logo" src="../../assets/logo.png" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, toRefs } from "vue"
import analyze from "rgbaster"
import ColorThief from "colorthief"
export default defineComponent({
  name: "img-color",
  setup(props, { attrs, slots, emit}) {
    const logoRef = ref<HTMLImageElement | null>(null)

    onMounted(() => {
      // console.log(logoRef.value!.src)
      // const src = (this.$refs.logo as HTMLImageElement)?.src
      analyze(logoRef.value!.src, {
        ignore: ["rgb(255,255,255)", "rgb(0,0,0)"],
        scale: 0.02,
      }).then((res: any) => {
        // console.log(res)
        // console.log(res[0].color)
      })
      // const img = document.querySelector(".img")
      // const img = new Image()
      // img.src = logoRef.value.src
      // const colorThief = new ColorThief()
      // img.onload = () => {
      //   const result = colorThief.getPalette(img, 8)
      //   console.log(result)
      // }

      const user = reactive({
        name: '小浪',
        age: 21,
      })

      let userObj = toRefs(user)
      // console.log(userObj)
      // console.log(logoRef)
    })

    return {
      logoRef
    }
  },
})
</script>
