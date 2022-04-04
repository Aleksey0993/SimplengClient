<template>
  <v-container>
        <v-text-field
            outlined
            label="Password"
            prepend-inner-icon="mdi-lock"
            :disabled='isLoading'
            v-model="password"
          ></v-text-field> 
              <v-btn
                class="btn"
                :disabled='isLoading'
                color="primary"
                @click="resetPassword({password, access_token})"
                absolute
                :style="{left:'50%', transform:'translateX(-50%)'}"
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
         password:'',
         access_token:''
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
    ...mapActions(['resetPassword']) 
 },
 mounted(){
     console.log(this.$route.params.access_token)
  this.access_token = this.$route.params.access_token
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