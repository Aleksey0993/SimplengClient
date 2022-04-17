<template>
  


 <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0" class="pa-2">
              <a href="https://edu-fedorae.netlify.app" name="Fedorae Education" title="Fedorae Education" target="_blank">
                <v-img src="@/assets/logo1.png" alt="Fedorae Education Log" contain height="200"></v-img>
              </a>
              <v-card-text>
                <v-form>
                   <v-text-field
                       outlined
                         label="Email"
                         prepend-inner-icon="mdi-at"
                         :disabled='isLoading'
                         v-model="email"
                         type="email">
                         </v-text-field>
                              <v-text-field
                             outlined
                              label="Password"
                              prepend-inner-icon="mdi-lock"
                              :disabled='isLoading'
                              v-model="password"
                              type="password">
                              </v-text-field>  
                        
                  
                    <v-btn
                     
                      :disabled='isLoading'
                       color="primary"
                       x-large block
                         @click="login({email,password})"
                
                         >
                Войти
               </v-btn>

                  
                </v-form>
              </v-card-text>
                 <v-card-actions>
                   <p class="mx-auto">Нет аккаунта? <router-link :to="{ name: 'register' }" class="pl-2" >Зарегистрироваться</router-link> </p> 
                  </v-card-actions>
             <v-card-actions>
                   <p class="mx-auto">Забыли пароль? <router-link :to="{ name: 'forgot' }" class="pl-2" >Сбросить пароль</router-link> </p> 
              </v-card-actions>
            </v-card>
            <error-messages v-if="err" class="mt-3">{{err}}</error-messages>
          </v-col>
        </v-row>
         <my-loader v-if="isLoading" />
      </v-container>

  
</template>

<script>
import MyLoader from '@/components/MyLoader'
import ErrorMessages from '@/components/messages/ErrorMessages'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  components:{
   ErrorMessages,
   MyLoader,
   
  },
  data(){
      return{
          email:'',
          password:''
      }
  },
  computed:{
      ...mapState('auth',{
          isLoading: state => state.isLoading,
          err: state => state.err,
         
      })
  },
  methods:{
      ...mapActions('auth',{
          login: 'login'
      }),
      ...mapMutations('auth',['clearMessage'])

  },
  beforeDestroy(){
    this.clearMessage()
  }
}
</script>

<style>
 .register-container{
     position: relative;
 }

 .btn{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    z-index: 10;
 }
 .progress{
    position: absolute;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%)
 }
 .loading{
     background-color: rgba(0,0,0,0.3);
 }
 .success{
     width:150px;
 }
 .err{
     width:150px;
 }

</style>