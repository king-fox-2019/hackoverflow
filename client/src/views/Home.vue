<template>
  <div class="container">
    <div class="home row">
      <div class="col-md-2 overflow-hidden">
        <img v-if="!$store.state.user" alt="Vue logo" src="../assets/logo.png" class="img-fluid">
        <div v-if="$store.state.user">
          <img alt="Vue logo" :src="$store.state.user.image" class="img-fluid">
          <div>
            <h5>Watched tags: </h5>
            <span class="badge badge-pill badge-info" v-for="(tag, index) in $store.state.user.tags" :key="index">{{tag}}</span>
          </div>
        </div>
      </div>
      <div class="col-md-10">
        <Main msg="Top Question"/>
      </div>
    </div>
  </div>
</template>

<script>
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
