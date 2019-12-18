<template>
  <div class="container">
    <div class="home row">
      <div class="col-md-2 overflow-hidden">
        <img alt="Vue logo" src="../assets/logo.png">
      </div>
      <div class="col-md-10">
        <Main msg="Top Question"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '@/components/Main.vue'

export default {
  name: 'home',
  components: {
    Main
  },
  created () {
    this.$store.dispatch('fetchData')
  }
}
</script>
