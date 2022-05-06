<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      color="rgba(25, 118, 210, 0.8)"
      dark
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h5"> SimplEng </v-list-item-title>
          <v-list-item-subtitle> Best todo </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-4"></v-divider>
      </v-list>
      <v-list dense nav v-if="isAuth">
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
        <v-divider class="mt-4"></v-divider>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark dense elevate-on-scroll>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>{{ title }}</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn color="primary" depressed v-if="isAuth" @click="logout">
        Выйти
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <my-loader v-if="isLoading" />

      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
import MyLoader from "@/components/MyLoader";
export default {
  components: {
    MyLoader,
  },
  data: () => ({
    drawer: null,
    title: "Главная",
    items: [
      {
        title: "Главная",
        icon: "mdi-mastodon",
        to: "/",
      },
      {
        title: "О нас",
        icon: "mdi-image",
        to: "/about",
      },
      {
        title: "Личный кабинет",
        icon: "mdi-image",
        to: "/profile",
      },
    ],
    items2: [
      { title: "Грамматика", icon: "mdi-image", to: "/grammar" },
      { title: "Аудирование", icon: "mdi-image", to: "/listening" },
    ],

    menuPages: [
      { title: "Главная", name: "home" },
      { title: "О Нас", name: "about" },
      {
        title: "Личный кабинет",
        name: "profile",
      },
      {
        title: "Авторизация",
        name: "login",
      },
      {
        title: "Регистрация",
        name: "register",
      },
      {
        title: "Активация",
        name: "activate",
      },

      {
        title: "Сброс пароля",
        name: "forgot",
      },
      {
        title: "Сброс пароля",
        name: "reset",
      },
      {
        title: "Грамматика",
        name: "grammar",
      },
      {
        title: "Грамматика",
        name: "grammarItem",
      },
      {
        title: "Редактирование грамматики",
        name: "grammarEditor",
      },
      {
        title: "Создание новой лекции",
        name: "grammarCreate",
      },
      {
        title: "Аудирование",
        name: "listening",
      },
      {
        title: "Ошибка",
        name: "forbidden",
      },
      {
        title: "Ошибка",
        name: "404",
      },
    ],
  }),
  watch: {
    $route(to) {
      let path = this.menuPages.filter((item) => item.name === to.name)[0];
      this.title = path.title;
    },
  },
  computed: {
    ...mapState("auth", {
      isAuth: (state) => state.isAuth,
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    ...mapActions("auth", ["setFingerPrint", "logout"]),
  },
  mounted() {
    this.setFingerPrint();
  },
};
</script>
<style>
/* .ql-editor {
  min-height: 200px;
  font-size: 16px;
}
.ql-snow .ql-stroke.ql-thin,
.ql-snow .ql-thin {
  stroke-width: 1px !important;
}
.quillWrapper .ql-snow.ql-toolbar {
  padding-top: 8px;
  padding-bottom: 4px;
}
.quillWrapper .ql-snow.ql-toolbar .ql-formats {
  margin-bottom: 10px;
}
.ql-snow .ql-toolbar button svg,
.quillWrapper .ql-snow.ql-toolbar button svg {
  width: 22px;
  height: 22px;
}
.quillWrapper .ql-editor ul[data-checked="false"] > li::before,
.quillWrapper .ql-editor ul[data-checked="true"] > li::before {
  font-size: 1.35em;
  vertical-align: baseline;
  bottom: -0.065em;
  font-weight: 900;
  color: #222;
}
.quillWrapper .ql-snow .ql-stroke {
  stroke: rgba(63, 63, 63, 0.95);
  stroke-linecap: square;
  stroke-linejoin: initial;
  stroke-width: 1.7px;
}
.quillWrapper .ql-picker-label {
  font-size: 15px;
}
.quillWrapper .ql-snow .ql-active .ql-stroke {
  stroke-width: 2.25px;
}
.quillWrapper .ql-toolbar.ql-snow .ql-formats {
  vertical-align: top;
}
.ql-picker:not(.ql-background) {
  position: relative;
  top: 2px;
}
.ql-picker.ql-color-picker svg {
  width: 22px !important;
  height: 22px !important;
}
.quillWrapper .imageResizeActive img {
  display: block;
  cursor: pointer;
}
.quillWrapper .imageResizeActive ~ div svg {
  cursor: pointer;
} */
</style>
