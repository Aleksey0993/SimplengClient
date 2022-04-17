import store from '@/store/index'


export default (to, from, next) => {
  const publicPages = ['home', 'about', 'register', 'login', 'activate', 'forgot', 'reset', '404']
  const authNotRequired = publicPages.includes(to.name.toLowerCase())
  
  if (authNotRequired || store.state.auth.isAuth) {
    return next()
  }

  return next({ name: 'login' })
}
