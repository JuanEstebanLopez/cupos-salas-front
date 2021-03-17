import Vue from 'vue'
import VueRouter from 'vue-router'
import Salas from '../views/Salas.vue'
import Sala from '../views/Sala.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Salas
  },
  {
    path: '/sala/:salaID',
    name: 'Sala',
    component: Sala
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
