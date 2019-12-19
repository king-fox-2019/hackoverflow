<template>
  <div id="app">
    <NavBar />
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  components: {
    NavBar
  },
  methods: {
    checkLogin() {
      this.$store.commit('CHECK_LOGIN')
    }
  },
  created() {
    this.checkLogin()
  }
}
</script>

<style>
* {
  color: #353535;
}
a, router-link {
  text-decoration: none;
  color: #fff !important;
  padding: 0 1rem;
  display: inline-block;
}
a:hover, router-link:hover {
  background-color: rgb(169, 232, 248) !important;
  transition: 0.6s background-color;

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
