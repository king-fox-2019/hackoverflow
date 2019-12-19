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
  sockets: {
    fetchQuestion: function () {
      this.$store.dispatch('fetchData')
    }
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
#nav {
  margin-top: 56px
}
</style>
