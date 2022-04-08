import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/auth/activate/:activation_token',
    name: 'activate',
    component: () => import('../views/ActivationView.vue')
  },
  {
    path: '/auth/forgot',
    name: 'forgot',
    component: () => import('../views/ForgotView.vue')
  },
  {
    path: '/auth/reset/:access_token',
    name: 'reset',
    component: () => import('../views/ResetView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach', store.state.isAuth)
  if (to.name === 'profile' && !store.state.auth.isAuth) next({ name: 'login' })
  else next()
})


export default router
