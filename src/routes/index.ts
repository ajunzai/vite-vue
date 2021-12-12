import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

let routes: RouteRecordRaw[] = []
try {
  const modules = import.meta.globEager('../pages/*/routes.ts') // `./pages`, true, /.*\/router\.ts?$/
  for (const path in  modules) {
    routes = routes.concat(modules[path].default)
  }
} catch (error) {
  console.error((error as any).message)
}

routes.push({
  path: '/',
  redirect: '/markdown'
})
routes.push({
  path: '/:catchAll(.*)', // '*',
  redirect: '/markdown'
})

console.table(routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router