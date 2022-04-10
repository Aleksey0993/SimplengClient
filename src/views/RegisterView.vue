<template>
  <div
  
  >
      <v-form 
       class="mt-8"
       >
          <v-container
           class="register-container"
          >
           <v-col
             cols="12"
             xl="2"
             lg="6"
             md="6"
             offset-md="3"
             sm="8"
             offset-sm="2"
           >
                <v-text-field
            outlined
            label="Email"
            prepend-inner-icon="mdi-at"
            :disabled='isLoading'
            v-model.trim="email"
            :error-messages="emailErrors"
          ></v-text-field> 
           </v-col>
           <v-col
             cols="12"
             xl="2"
             lg="6"
             md="6"
             offset-md="3"
             sm="8"
             offset-sm="2"
           >
                <v-text-field
            outlined
            label="Password"
            prepend-inner-icon="mdi-lock"
            :disabled='isLoading'
            v-model="password"
            :error-messages="passwordErrors"
          ></v-text-field> 
             <v-text-field
            outlined
            label="Password repeat"
            prepend-inner-icon="mdi-lock"
            :disabled='isLoading'
            v-model="passwordRepeat"
            :error-messages="passwordRepeatErrors"
          ></v-text-field> 
           </v-col>
        
               <v-btn
                class="btn"
                :disabled=' $v.$invalid || isLoading '
                color="primary"
                @click="register({email,password})"
                
               >
                Зарегистрироваться
               </v-btn>
               <v-alert
                   v-if='success'
                    outlined
                      color="purple"
                      class="success"
                    >
                <div>{{success}}</div>
               
    </v-alert>
       <v-alert
                   v-if='err'
                    outlined
                      color="purple"
                      class="err"
                    >
                <div>{{err}}</div>
               
    </v-alert>
                     
              <v-progress-circular v-if="isLoading"
              class="progress"
      :size="100"
      color="primary"
      indeterminate
    ></v-progress-circular>
          </v-container>
         

      </v-form>

     
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {validationMixin} from 'vuelidate'
import {required, minLength,email, sameAs} from 'vuelidate/lib/validators'
import {hasUppercase, hasLowercase, hasSpecialChars, hasNumbers} from '@/service/validator'
export default {
  mixins:[validationMixin,],
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
      emailErrors(){
        const errors = []
        if (!this.$v.email.required) errors.push('Обязательно для заполнения')
         if (!this.$v.email.email) errors.push('Невалидный email')
        return errors
      },
       passwordErrors(){
        const errors = []
        if (!this.$v.password.required) errors.push('Обязательно для заполнения')
        if (!this.$v.password.minLength) errors.push('Не меньше 8 символов')
        if (!this.$v.password.hasLowercase) errors.push('Пароль должен сожержать буквы в нижнем регистре')
        if (!this.$v.password.hasUppercase) errors.push('Пароль должен содержать буквы в верхнем регистре')
        if (!this.$v.password.hasSpecialChars) errors.push('Пароль должен содержать спецсимволы !@#$%^&*)')
        if (!this.$v.password.hasNumbers) errors.push('Пароль должен содержать числа')
        if (!this.$v.password.sameAs) errors.push('Пароли не совпадают')
        return errors
      },
        passwordRepeatErrors(){
        const errors = []
        if (!this.$v.passwordRepeat.required) errors.push('Обязательно для заполнения')
         if (!this.$v.password.sameAs) errors.push('Пароли не совпадают')
      
        return errors
      }
  },
  methods:{
      ...mapActions('auth',{
          register: 'registration'
      }),

  },
  validations:{
     email:{
       required,
       email
     },
     password:{
       required,
       minLength:minLength(8),
       sameAs:sameAs('passwordRepeat'),
       hasUppercase,
       hasLowercase,
       hasSpecialChars,
       hasNumbers
     },
     passwordRepeat:{
       required,
     }
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