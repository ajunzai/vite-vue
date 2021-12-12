<template>
  <!-- <div id="app"> -->
    <router-view></router-view>
    <!-- <img class="img" ref="logo" alt="Vue logo" src="./assets/logo.png" />
    <Ellipsis></Ellipsis>
    <ImgColor></ImgColor> -->
  <!-- </div> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import HelloWorld from "./components/HelloWorld.vue"
import analyze from "rgbaster"
import ColorThief from "colorthief"
import Ellipsis from './components/ellipsis'
import ImgColor from './components/img-color'

export default defineComponent({
  name: "App",
  components: {
    // HelloWorld
    // Ellipsis,
    // ImgColor
  },
  mounted() {
    // console.log(111, import.meta.url)
    // console.log(222, import.meta)
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
.picture {
  display: block;
  width: 1920px;
  height: 396px;
}
</style>
