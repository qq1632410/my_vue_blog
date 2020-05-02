import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=>import('../views/Home.vue')
const Login=()=>import('../views/Login.vue')
const Write=()=>import('../views/Write.vue')
const Manage=()=>import('../views/Manage')
const Show=()=>import("../views/show")
Vue.use(VueRouter)

  const routes = [
    {
      path:'',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/write/:id",
      component:Write,
    },
    {
      path:"/manage",
      component:Manage
    },
    {
      path:"/show/:id",
      component:Show
    }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
