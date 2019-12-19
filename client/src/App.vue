<template>
  <div id="app">
    <div id="nav" class="flex justify-between items-center px-16 py-4 bg-green-100 shadow">
      <router-link to="/" class="font-bold text-gray-700">Hackoverflow</router-link>
      <div v-if="!isLoggedIn">
        <router-link class="px-4 font-bold text-gray-600 hover:text-gray-800" to="/login">Log in</router-link>
        <router-link class="px-4 font-bold text-gray-600 hover:text-gray-800" to="/register">Register</router-link>
      </div>
      <div v-if="isLoggedIn">
        <router-link class="px-4 font-bold text-gray-600 cursor-pointer hover:text-gray-800" to="/ask">Ask question</router-link>
        <a class="px-4 font-bold text-gray-600 cursor-pointer hover:text-gray-800" @click.prevent="logout">Log out</a>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  computed: {
    ...mapState('user', ['isLoggedIn'])
  },

  methods: {
    ...mapActions('user', ['checkLoggedIn']),

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.checkLoggedIn()
    }
  },

  watch: {
    isLoggedIn: function() {
      this.checkLoggedIn()
    }
  },

  created() {
    this.checkLoggedIn()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
