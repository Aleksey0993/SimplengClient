<template>
  
 <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
            <v-card elevation="0.5" class="pa-2">
            
          <v-card-text>
          <v-form >
           <v-text-field
            outlined
            label="Email"
            prepend-inner-icon="mdi-at"
            :disabled='isLoading'
            v-model.trim="email"
           
          ></v-text-field> 
          <v-text-field
            outlined
            label="Password"
            prepend-inner-icon="mdi-lock"
            :disabled='isLoading'
            v-model="password"
            type="password"
           
          ></v-text-field> 
             <v-text-field
            outlined
            label="Password repeat"
            prepend-inner-icon="mdi-lock"
            :disabled='isLoading'
            v-model="passwordRepeat"
            type="password"
           
          ></v-text-field> 
             <v-btn
                x-large block
               
                color="primary"
                @click="register({email,password})"
                
               >
                Зарегистрироваться
               </v-btn>

                </v-form>
              </v-card-text>
                 <v-card-actions>
                     <p class="mx-auto">Уже есть аккаунт? <router-link :to="{ name: 'login' }" class="pl-2" >Войти</router-link> </p> 
                  </v-card-actions>
              <v-card-actions class="ml-6 mr-6 text-center">
                <p>By continuing, you agree to Fedorae Education's <a href="#" class="pl-2" style="color: #000000">Policy</a> and <a href="#" class="pl-2" style="color: #000000">Terms of Use</a></p>
              </v-card-actions>
            </v-card>
            <success-messages v-if="success" class="mt-3">{{success}}</success-messages>
            <error-messages v-if="err" class="mt-3">{{err}}</error-messages>
          </v-col>
        </v-row>
     
        <my-loader v-if="isLoading" />
 </v-container>      
</template>

<script>
import MyLoader from '@/components/MyLoader'
import SuccessMessages from '@/components/messages/SuccessMessages'
import ErrorMessages from '@/components/messages/ErrorMessages'
import {mapState, mapActions, mapMutations} from 'vuex'
//import {validationMixin} from 'vuelidate'
//import {required, minLength,email, sameAs} from 'vuelidate/lib/validators'
//import {hasUppercase, hasLowercase, hasSpecialChars, hasNumbers} from '@/service/validator'


export default {
  components:{
   SuccessMessages,
   ErrorMessages,
   MyLoader,
    
   
  },
  //mixins:[validationMixin,],
  data(){
      return{
          email:'',
          password:'',
          passwordRepeat:''
      }
  },
  computed:{
      ...mapState('auth',{
          isLoading: state => state.isLoading,
          err: state => state.err,
          success: state => state.success
      }),
      // emailErrors(){
      //   const errors = []
      //   if (!this.$v.email.required) errors.push('Обязательно для заполнения')
      //    if (!this.$v.email.email) errors.push('Невалидный email')
      //   return errors
      // },
      //  passwordErrors(){
      //   const errors = []
      //   if (!this.$v.password.required) errors.push('Обязательно для заполнения')
      //   if (!this.$v.password.minLength) errors.push('Не меньше 8 символов')
      //   if (!this.$v.password.hasLowercase) errors.push('Пароль должен сожержать буквы в нижнем регистре')
      //   if (!this.$v.password.hasUppercase) errors.push('Пароль должен содержать буквы в верхнем регистре')
      //   if (!this.$v.password.hasSpecialChars) errors.push('Пароль должен содержать спецсимволы !@#$%^&*)')
      //   if (!this.$v.password.hasNumbers) errors.push('Пароль должен содержать числа')
      //   if (!this.$v.password.sameAs) errors.push('Пароли не совпадают')
      //   return errors
      // },
      //   passwordRepeatErrors(){
      //   const errors = []
      //   if (!this.$v.passwordRepeat.required) errors.push('Обязательно для заполнения')
      //    if (!this.$v.password.sameAs) errors.push('Пароли не совпадают')
      
      //   return errors
      // }
  },
  methods:{
      ...mapActions('auth',{
          register: 'registration'
      }),
      ...mapMutations('auth',['clearMessage'])

  },
  // validations:{
  //    email:{
  //      required,
  //      email
  //    },
  //    password:{
  //      required,
  //      minLength:minLength(8),
  //      sameAs:sameAs('passwordRepeat'),
  //      hasUppercase,
  //      hasLowercase,
  //      hasSpecialChars,
  //      hasNumbers
  //    },
  //    passwordRepeat:{
  //      required,
  //    }
  // }



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