import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HtView from '../views/HtView.vue'
import htChildren from './htRouter'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ht',
    component: HtView,
    children: htChildren
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
