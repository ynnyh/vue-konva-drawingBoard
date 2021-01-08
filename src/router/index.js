import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'konva',
    component: () => import('../views/Konva.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
