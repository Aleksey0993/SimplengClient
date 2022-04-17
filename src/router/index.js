import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:'Главная'
    }
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
    path: '/auth/reset/:reset_password_token',
    name: 'reset',
    component: () => import('../views/ResetView.vue')
  },
  {
    path: '/grammar',
    name: 'grammar',
    component: () => import('../views/GrammarView.vue')
  },
  {
    path: '/listening',
    name: 'listening',
    component: () => import('../views/ListeningView.vue')
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('../views/ForbiddenView.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFoundView.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`
  console.log('beforeEach', store.state.isAuth)
  if (to.name === 'profile' && !store.state.auth.isAuth) next({ name: 'login' })
  if (to.name === 'grammar' && !store.state.auth.isAuth) next({ name: 'login' })
  else next()
})


export default router
