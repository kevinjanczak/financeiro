import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Payable from '../views/Payable.vue'
import Receivable from '../views/Receivable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashbaord',
    component: Dashboard
  },
  {
    path: '/payable',
    name: "Dividas",
    component: Payable
  },
  {
    path: '/receivable',
    name: "Recebimentos",
    component: Receivable
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
