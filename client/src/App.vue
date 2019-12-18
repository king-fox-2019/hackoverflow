<template>
  <div id="app">
    <navbar></navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  computed: {
    onSession() {
      return this.$store.state.onSession
    },
    routePath() {
      return this.$route.path
    }
  },
  watch: {
    onSession(val) {
      if (val !== null) {
        if (val && this.$route.path.includes('session'))
          this.$router.replace('/')
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100vh;
  padding-top: 3rem;
}
</style>
