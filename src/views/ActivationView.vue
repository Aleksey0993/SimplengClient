<template>
   <v-container class="fill-height" fluid>
        <v-row align="center" justify="center" dense>
          <v-col cols="12" sm="8" md="4" lg="4">
     <success-messages v-if="success">{{success}}</success-messages>
            <error-messages v-if="err">{{err}}</error-messages>
    
  </v-col> 
  </v-row>
  </v-container>
  
</template>

<script>
import SuccessMessages from '@/components/messages/SuccessMessages'
import ErrorMessages from '@/components/messages/ErrorMessages'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  components:{
    SuccessMessages,
    ErrorMessages
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
          activation: 'activation'
      }),
      ...mapMutations('auth',['clearMessage'])
  },
  mounted(){
    this.activation(this.$route.params.activation_token)
  },
  beforeDestroy(){
    this.clearMessage()
  }
}
</script>

<style>
  .err{
      border: 1px solid red;
  }
  .success{
      border: 1px solid green;
  }
</style>