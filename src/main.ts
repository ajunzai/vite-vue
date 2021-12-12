import { createApp } from "vue"
import App from "./App.vue"
import router from "./routes"
import vuex from "./stores"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

createApp(App).use(ElementPlus).use(router).use(vuex).mount("#app")
