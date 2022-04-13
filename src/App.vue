<template>
  <v-app id="inspire">
      <v-navigation-drawer 
       v-model="drawer"
      color="rgba(25, 118, 210, 0.8)"
     dark
     
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
      dense
      elevate-on-scroll
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
      <my-loader  v-if="isLoading"/>
      
        <router-view></router-view>
      
           
      
       
    </v-main>
    
  </v-app>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import MyLoader from '@/components/MyLoader'
  export default {
     components:{
  
   MyLoader,
    
   
  },
    data: () => ({ 
      drawer: null,
      title:'Главная',
      items: [
          { 
            title: 'Главная', 
            icon: 'mdi-mastodon',
            to: '/',
          },
          { 
            title: 'О нас', 
            icon: 'mdi-image',
            to:'/about',
          },
           { 
            title: 'Личный кабинет', 
            icon: 'mdi-image',
            to:'/profile' ,
            },
            
        ],
          items2: [
          { title: 'Грамматика', 
            icon: 'mdi-image',
            to:'/grammar' },
          { title: 'Аудирование', 
            icon: 'mdi-image',
            to:'/listening' },
        ],

         menuPages: [
          { title: 'Главная', 
            name:'home' 
          },
          { title: 'О Нас', 
            name:'about' 
          },
           { 
             title: 'Личный кабинет', 
             name:'profile' 
            },
             { 
               title: 'Авторизация',
               name: 'login' 
            },
              { 
               title: 'Регистрация',
               name: 'register' 
            },
              { 
               title: 'Активация',
               name: 'activate' 
            },
          
            { 
               title: 'Сброс пароля',
               name: 'forgot' 
            },
              { 
               title: 'Сброс пароля',
               name: 'reset' 
            },
              { 
               title: 'Грамматика',
               name: 'grammar' 
            },
              { 
               title: 'Аудирование',
               name: 'listening' 
            },
        ], 
        
        
        
        }),
        watch: {
    $route(to) {
     
      let path = this.menuPages.filter((item)=>item.name === to.name)[0]
      
       this.title = path.title
       }
         },
        computed:{
          ...mapState('auth',{
            isAuth: state => state.isAuth,
            isLoading: state => state.isLoading,
          })
        },
     methods:{
       ...mapActions('auth',['setFingerPrint']
       
       ),
    
     },
  async mounted(){
    await this.setFingerPrint()
    // if(localStorage.getItem('token')){
    //     this.checkAuth()
    // }
    
     
  }

  }
</script>