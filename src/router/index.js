import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {path: '/', name: 'Home', component: () => import('../views/home')},
  {path: '/settings', name: 'Settings', component: () => import('../views/settings')},
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
