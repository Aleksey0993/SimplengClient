<template>
  <v-container>
        <v-text-field
            outlined
            label="Email"
            prepend-inner-icon="mdi-at"
            :disabled='isLoading'
            v-model="email"
          ></v-text-field> 
              <v-btn
                class="btn"
                :disabled='isLoading'
                color="primary"
                @click="forgotPassword(email)"
                
               >
                Далее
               </v-btn>
            <v-progress-circular v-if="isLoading"
                class="progress"
                :size="100"
                color="primary"
                indeterminate
                ></v-progress-circular>
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
  </v-container>
  
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
 data(){
     return {
         email:''
     }
 },
 computed:{
     ...mapState({
         isLoading: state => state.isLoading,
           err: state => state.err,
          success: state => state.success
     })
 },
 methods:{
    ...mapActions(['forgotPassword']) 
 }
}
</script>

<style>
    .progress{
    position: absolute;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%)
 }
  .success{
     width:150px;
 }
 .err{
     width:150px;
 }
</style>