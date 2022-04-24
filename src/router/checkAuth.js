import store from '@/store/index'


export default (to, from, next) => {
  const publicPages = ['home', 'about', 'register', 'login', 'activate', 'forgot', 'reset', '404']
  const protectedPages = [ 'register', 'login', 'activate', 'forgot', 'reset']
  const authNotRequired = publicPages.includes(to.name.toLowerCase())
 const authRequired = protectedPages.includes(to.name.toLowerCase())
  // if(authRequired && from.name === 'profile' && store.state.auth.isAuth){
  //   console.log('hhh')
  //    return next(false)
  // }
  if(authRequired && store.state.auth.isAuth){
    if(from.name === 'profile') return next({name:'home'})
     return next({name:'profile'})
  }
  if (authNotRequired || store.state.auth.isAuth) {
    //if(from.name === 'login') return next({name:'home'})
    return next()
  }
   
  else  {
    if(from.name === 'login' && to.name === 'profile') return next(false)
    if(from.name === 'login') return next({name:'home'})
    return next({ name: 'login'})
  }
  
  
  
}

