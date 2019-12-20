<template>
  <div id="nav">
    <span v-if="$store.state.isLogin">HI, {{name}} </span>
    <router-link to="/">HOME</router-link>
    <router-link v-if="!$store.state.isLogin" to="/login">LOGIN</router-link>
    <router-link v-if="!$store.state.isLogin" to="/register">REGISTER</router-link>
    <!-- <router-link v-if="$store.state.isLogin" to="/mythread">MY THREAD</router-link> -->
    <a href="/" v-if="$store.state.isLogin" @click.prevent="logout">LOGOUT</a>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      Swal.fire({
        icon: 'success',
        title: 'You are successfully logout'
      })
      this.$store.commit('CHECK_LOGIN')
    }
  },
  computed: {
    name: function() {
      return localStorage.getItem('name').toUpperCase()
    }
  }
}
</script>

<style scoped>
  #nav {
    height: 4rem;
    line-height: 4rem;
    padding: 0 2rem;
    background-color: #17a2b8;
    margin-bottom: 2rem;
    font-weight: bold;
    color: #fff;
  }
  #nav span {
    color: #fff;
    padding: 0 2rem;
  }
</style>