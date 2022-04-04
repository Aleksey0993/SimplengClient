import Vue from 'vue'
import Vuex from 'vuex'
import AuthService from '@/service/AuthService'
import FingerPrint from '@/service/FingerPrint'
import { jwtDecrypt } from '@/service/decodeToken'
import router from '@/router/index'
import { API_URL } from '@/http'
import $refreshRequest from '@/http'
//import jwtDecrypt from '@/service/decodeToken'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading:false,
    isAuth:false,
    user:null,
    err:'',
    success:''
  },
  getters: {
  },
  mutations: {
    setLoading(state, data){
      state.isLoading = data
    },
    registerSuccess(state,response){
      console.log(response)
      state.success = response.data.msg
     },
     registerError(state, response){
       state.err = response.data.msg
     },
     
     forgotPasswordSuccess(state,response){
      console.log(response)
      state.success = response.data.msg
     },
     forgotPasswordError(state, response){
       state.err = response.data.msg
     },
     resetPasswordSuccess(state,response){
      console.log(response)
      state.success = response.data.msg
     },
     resetPasswordError(state, response){
       state.err = response.data.msg
     },
     activateSuccess(state,response){
      console.log(response)
      state.success = response.data.msg
     },
     activateError(state, response){
       state.err = response.data.msg
     },
     clearAlert(state){
       state.success = ''
       state.err = ''
     },


     loginSuccess(state, response){
      localStorage.setItem('token', response.data.accessToken)
      state.user = jwtDecrypt(localStorage.getItem('token'))
      state.isAuth = true
      router.push({name:'profile'})
     },
     loginError(state, response){
      state.err = response.data.msg
    },
    checkAuthSuccess(state, response){
      console.log(response.data.accessToken)
      localStorage.setItem('token', response.data.accessToken)
      state.user = jwtDecrypt(localStorage.getItem('token'))
      state.isAuth = true
      router.push({name:'profile'})
      },
      logoutSuccess(state){
        localStorage.removeItem('token')
        
        state.isAuth = false
       // console.log(state.isAuth)
        state.user= null
        router.push({name:'login'})
      },
  },
  actions: {
    async registration({commit}, {email, password}){
      try {
      commit('setLoading', true)
      commit('clearAlert')
       const response = await AuthService.registration(email,password)
       
       commit('registerSuccess', response)

      } catch (err) {
        commit('registerError',err.response)
        console.log(err.response.data.msg)
       
      } finally{
     commit('setLoading', false)
    }
    },

   async activation({commit}, activation_token){
     try {
      commit('setLoading', true)
     
      const response = await AuthService.activation(activation_token)
       
       commit('activateSuccess', response)
     } catch (err) {
      commit('activateError',err.response)
     }
     finally{
      commit('setLoading', false)
     }
   },
   async login({commit}, {email, password}){
     try {
       commit('setLoading', true)
       const fingerprint = await FingerPrint.getUserID() 
       const response = await AuthService.login(email,password,fingerprint)
       commit('loginSuccess', response)
     } catch (err) {
       commit('loginError', err.response)
     } finally{
       commit('setLoading', false)
     }
   },

   async checkAuth({commit}){
    commit('setLoading', true)
    try {
      const fingerprint = await FingerPrint.getUserID() 
     
      
      const response = await $refreshRequest.post(`${API_URL}/auth/refresh`, {fingerprint: fingerprint})
      commit('checkAuthSuccess', response)

    } catch (error) {
      console.log(error.response?.data?.message)
    } finally{
      commit('setLoading', false)
    }
  },
  async logout({commit}){
    try {
      //const response = await AuthService.logout()
       await AuthService.logout()
      commit('logoutSuccess')

    } catch (error) {
      console.log(error.response?.data?.message)
    }
  },
  async forgotPassword({commit}, email){
    try {
      commit('setLoading',true)
      const response = await AuthService.forgotPassword(email)
      commit('forgotPasswordSuccess', response)
    } catch (err) {
      commit('forgotPasswordError', err.response)
    }finally{
      commit('setLoading',false)
    }
  },
  async resetPassword({commit}, {password, access_token}){
    try {
      commit('setLoading', true)
      localStorage.setItem('token', access_token)
      console.log('Новый пароль --------')
      console.log(password)
      const response = await AuthService.resetPassword(password)
      commit('resetPasswordSuccess', response)
    } catch (err) {
     commit('resetPasswordError', err.response)      
    }finally{
     commit('setLoading', false)
   //  localStorage.removeItem('token')
    }
  }


  },
  modules: {
  }
})
