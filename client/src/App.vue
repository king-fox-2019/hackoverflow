<template>
  <v-app id="app">
    <div id="router-view-container"
      ><router-view/></div>
    <Navbar/>
    <SideNavbar v-if="sideNavbarActive && isLoggedIn"/>
    <RightDrawer v-if="rightDrawerActive && isLoggedIn">
      <template v-slot:widget-1>
        <RightDrawerWidget/>
      </template>
    </RightDrawer>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import SideNavbar from './components/SideNavbar'
import RightDrawer from './components/RightDrawer'
import RightDrawerWidget from "./components/SidebarWidget";
import toast from './mixins/toast'
import { mapState } from 'vuex'

export default {
  name: 'App',

  data () {
    return {
      sideNavbarActive: true,
      rightDrawerActive: true
    }
  },

  components: {
    Navbar, SideNavbar, RightDrawer, RightDrawerWidget
  },

  watch: {
    $route(to, from) {
      if (to.path === '/signin' || to.path === '/join') {
        this.sideNavbarActive = false
        this.rightDrawerActive = false
      } else {
        this.sideNavbarActive = true
        this.rightDrawerActive = true
      }
    }
  },

  computed: {
    ...mapState(['isLoggedIn'])
  },

  mixins: [toast]
}
</script>

<style>
  * {
    font-family: 'Alata', sans-serif !important;
    padding: 0;
    margin: 0;
  }

  #router-view-container {
    max-width: 60vw;
    margin: 0 auto;
    /* padding-right: 30px; */
  }
</style>