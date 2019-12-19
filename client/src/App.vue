<template>
  <v-app>
    <Sidebar :drawer="drawer" />
    <Navbar @toggleDrawer="toggleDrawer" />
    <v-content>
      <v-alert type="success" dismissible v-if="success">
        {{success}}
      </v-alert>
      <v-alert type="error" dismissible v-if="error">
        {{error}}
      </v-alert>
      <v-container class="p-10 m-10">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { mapState } from 'vuex'

export default {
  name: 'App',

  components: {
    Navbar,
    Sidebar
  },

  data: () => ({
    drawer: null,
  }),

  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    }
  },

  computed: {
    ...mapState(['success', 'error'])
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,500&display=swap');

* {
  font-family: 'Montserrat', sans-serif;
}
</style>
