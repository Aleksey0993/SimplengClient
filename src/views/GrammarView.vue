<template>
  <div>
      <form >
        <input type="text" v-model="text">
        <button @click="test">Проверка</button>
      </form>
  </div>
</template>

<script>
export default {
 data(){
   return{
     text:''
   }
 },
 methods:{
   test(){
     console.log('1111')
   }
 }
}
</script>

<style>

</style>