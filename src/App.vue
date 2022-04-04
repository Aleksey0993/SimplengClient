<template>
  <v-app id="inspire">
      <v-navigation-drawer 
       v-model="drawer"
       
       app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Todo app
          </v-list-item-title>
          <v-list-item-subtitle>
            Best todo
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
        v-if='!isAuth'
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider
        class="mt-4"></v-divider>
          
      </v-list>
       <v-list
        dense
        nav
        v-if='isAuth'
      >
        <v-list-item
          v-for="item in items2"
          :key="item.title"
          :to="item.to"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider
        class="mt-4"></v-divider>
          
      </v-list>
    </v-navigation-drawer>

   
     <v-app-bar
      app
      
      color="primary"
      dark
      prominent
         
      
    >
    

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{title}}</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      
           <router-view></router-view>
      
      
    </v-main>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
  export default {
    components:{
     
    },
    data: () => ({ 
      drawer: null,
      title:'',
      items: [
          { title: 'Главная', 
            icon: 'mdi-mastodon',
            to: '/',
            name:'home' },
          { title: 'О нас', 
            icon: 'mdi-image',
            to:'/about',
            name:'about' },
           { title: 'Личный кабинет', 
            icon: 'mdi-image',
            to:'/profile' ,
            name:'profile'},
        ],
          items2: [
          { title: 'Главная', 
            icon: 'mdi-mastodon',
            to: '/',
            name:'home' },
          { title: 'О Нас', 
            icon: 'mdi-image',
            to:'/about',
            name:'about' },
           { title: 'Личный кабинет', 
            icon: 'mdi-image',
            to:'/profile',
            name:'profile' },
             { title: 'Теория', 
            icon: 'mdi-image',
            to:'/teory' },
             { title: 'Практика', 
            icon: 'mdi-image',
            to:'/practic' },
        ] }),
        watch: {
    $route(to) {
      let path = this.items.filter((item)=>item.name === to.name)[0]
      console.log(path)
       this.title = path.title
       }
         },
        computed:{
          ...mapState({
            isAuth: state => state.isAuth
          })
        },
     
  mounted(){
    if(localStorage.getItem('token')){
        this.$store.dispatch('checkAuth')
    }
  }

  }
</script>