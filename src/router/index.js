import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import checkAuth from './checkAuth'

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
    component: () => import('../views/AboutView.vue'), 
    meta:{
      title:'О нас'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta:{
      title:'Личный кабинет'
    }
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta:{
      title:'Регистрация'
    }
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta:{
      title:'Вход в личный кабинет'
    }
  },
  {
    path: '/auth/activate/:activation_token',
    name: 'activate',
    component: () => import('../views/ActivationView.vue'),
    meta:{
      title:'Активация'
    }
  },
  {
    path: '/auth/forgot',
    name: 'forgot',
    component: () => import('../views/ForgotView.vue'),
    meta:{
      title:'Сброс пароля'
    }
  },
  {
    path: '/auth/reset/:reset_password_token',
    name: 'reset',
    component: () => import('../views/ResetView.vue'),
    meta:{
      title:'Новый пароль'
    }
  },
  {
    path: '/grammar',
    name: 'grammar',
    component: () => import('../views/GrammarView.vue'),
    meta:{
      title:'Грамматика'
    }
  },
  {
    path: '/listening',
    name: 'listening',
    component: () => import('../views/ListeningView.vue'),
    meta:{
      title:'Аудирование'
    }
  },
  {
    path: '/403',
    name: 'forbidden',
    component: () => import('../views/ForbiddenView.vue'),
    meta:{
      title:'Ошибка нет доступа'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/NotFoundView.vue'),
    meta:{
      title:'Ошибка страница не найдена'
    }
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
 
  checkAuth(to, from, next)
})


export default router
