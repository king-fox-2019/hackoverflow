<template>
  <div id="app">
    <navigation/>
    <div id="nav"></div>
    <router-view/>
  </div>
</template>

<script>
import Navigation from './components/Navbar'
export default {
  components: {
    Navigation
  },
  created () {
    this.$store.dispatch('checkLogin')
  }
}
</script>

<style scoped>
router-view {
  margin-top: 56px
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
#nav {
  margin-top: 56px
}
/* #nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
