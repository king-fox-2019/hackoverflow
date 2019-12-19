<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link v-if="!$store.state.isLogin" to="/login">Login</router-link>
    <router-link v-if="!$store.state.isLogin" to="/register">Register</router-link>
    <router-link v-if="$store.state.isLogin" to="/mythread">My Thread</router-link>
    <a href="/" v-if="$store.state.isLogin" @click.prevent="logout">Logout</a>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.clear()
      this.$store.commit('CHECK_LOGIN')
    }
  }
}
</script>

<style scoped>
  #nav {
    height: 4rem;
    line-height: 4rem;
    padding: 0 2rem;
    background-color: #5dbeba;
    margin-bottom: 2rem;
  }
</style>