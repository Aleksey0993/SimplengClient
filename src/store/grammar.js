import GrammarService from '@/service/GrammarService'
//import FingerPrint from '@/service/FingerPrint'
//import { jwtDecrypt } from '@/service/decodeToken'
//import router from '@/router/index'

  const state = {
   users:[]
  }
 
 const mutations= {
   getAllUser(state, payload){
      state.users = payload
   }
  }
 const actions = {
    async getUser({commit}){
      try {
       const response = await GrammarService.listUser()
       console.log('getAllUser', response.data.users)
       commit('getAllUser', response.data.users)
     
      } 
      catch (err) {
      // commit('registerError',err.response.data.msg)
       
      } 
      finally {
     //
    }
    },
    async addUser(){
        try {
          await GrammarService.addUser()
         
        } 
        catch (err) {
        // commit('registerError',err.response.data.msg)
         
        } 
        finally {
       //
      }
      },

  
  }
  
  export default {
    namespaced: true,
    state,
    actions,
    mutations
  }

