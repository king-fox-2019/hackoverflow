<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'
export default {
  components:{
    navbar
  },
  created(){
    if(localStorage.getItem('token')){
      this.$store.commit('IS_LOGIN_TRUE')
    }else{
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style>

</style>
