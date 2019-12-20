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
@import url('https://fonts.googleapis.com/css?family=Bree+Serif&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
@import "~vue-wysiwyg/dist/vueWysiwyg.css";


* {
  color: #353535;
  font-family: 'Roboto', sans-serif;
}
body {
  background-color: #e5edf0 !important;
}
.home {
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.6)
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
