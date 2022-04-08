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
            v-model="email"
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
          ></v-text-field> 
           </v-col>
        
               <v-btn
                class="btn"
                :disabled='isLoading'
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
export default {
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
          success: state => state.success
      })
  },
  methods:{
      ...mapActions('auth',{
          register: 'registration'
      }),

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