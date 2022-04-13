<template>
   <v-progress-circular 
      class="progress"
      :size="100"
      color="primary"
      indeterminate
    ></v-progress-circular>
</template>


<style scoped>
   .progress{
    position: absolute;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%)
 }
</style>