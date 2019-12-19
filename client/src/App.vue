<template>
  <div id="app">
    <Navbar></Navbar>
    <notifications group="alert" position="top left"/>
    <vue-element-loading :active="$store.state.isLoading" spinner="bar-fade-scale"/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.commit('SET_IS_LOGIN', true)
      this.$store.commit('SET_LOGGED_USER', {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email')
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.clickable {
  cursor: pointer;
}
</style>
