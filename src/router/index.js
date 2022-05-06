import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import checkAuth from "./checkAuth";
import checkAdmin from "./checkAdmin";
//import store from '@/store/index'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Главная",
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
    meta: {
      title: "О нас",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
    meta: {
      title: "Личный кабинет",
    },
  },
  {
    path: "/auth/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
    meta: {
      title: "Регистрация",
    },
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      title: "Вход в личный кабинет",
    },
  },
  {
    path: "/auth/activate/:activation_token",
    name: "activate",
    component: () => import("../views/ActivationView.vue"),
    meta: {
      title: "Активация",
    },
  },
  {
    path: "/auth/forgot",
    name: "forgot",
    component: () => import("../views/ForgotView.vue"),
    meta: {
      title: "Сброс пароля",
    },
  },
  {
    path: "/auth/reset/:reset_password_token",
    name: "reset",
    component: () => import("../views/ResetView.vue"),
    meta: {
      title: "Новый пароль",
    },
  },
  {
    path: "/grammar",
    name: "grammar",
    component: () => import("../views/GrammarView.vue"),
    meta: {
      title: "Грамматика",
    },
  },
  {
    path: "/grammar/:id",
    name: "grammarItem",
    component: () => import("../components/GrammarItem.vue"),
    meta: {
      title: "Грамматика",
    },
  },
  {
    path: "/grammarEditor/:id",
    name: "grammarEditor",
    component: () => import("../components/GrammarEditor.vue"),
    meta: {
      title: "Редактирование грамматики",
    },
  },
  {
    path: "/grammarCreate",
    name: "grammarCreate",
    component: () => import("../components/GrammarCreate.vue"),
    meta: {
      title: "Создание новой лекции",
    },
  },
  {
    path: "/listening",
    name: "listening",
    component: () => import("../views/ListeningView.vue"),
    meta: {
      title: "Аудирование",
    },
  },
  {
    path: "/403",
    name: "forbidden",
    component: () => import("../views/ForbiddenView.vue"),
    meta: {
      title: "Ошибка нет доступа",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/NotFoundView.vue"),
    meta: {
      title: "Ошибка страница не найдена",
    },
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log("before checkAuth from -", from.name);
  // console.log("before checkAuth to- ", to.name);
  checkAuth(to, from, next);
  checkAdmin(to, from, next);
  //console.log("after checkAuth from - ", from.name);
  // console.log("after checkAuth to -", to.name);
  // const protectedPages = [ 'register', 'login', 'activate', 'forgot', 'reset']
  // const authRequired = protectedPages.includes(to.name.toLowerCase())
  // // document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`
  //  if(from.name === 'profile' && authRequired && store.state.auth.isAuth){
  //   return  next(false)
  //  }
  //document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`
  //  }
});

router.afterEach((to) => {
  //const protectedPages = [ 'register', 'login', 'activate', 'forgot', 'reset']
  //const authRequired = protectedPages.includes(to.name.toLowerCase())
  //console.log('after' , to)
  // console.log("after from -", from.name);
  // console.log("after to - ", to.name);
  document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`;
  //document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`
});

export default router;
