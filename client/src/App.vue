<template>
  <div id="app">
    <navbar style="position:fixed;width:100%;overflow: hidden;z-index:1" />
    <router-view style="padding-bottom:300px;"/>
    <!-- <footerPage style="position:absolute;width:100%;margin-top:1000px;"/> -->

    
  </div>
</template>

<script>

import navbar from './components/Navbar'
// import footerPage from './components/Footer'

export default {
  components : {
    navbar,
    // footerPage
  },
    created(){
    if(localStorage.getItem('token')){
      this.$store.commit('CHANGE_ISLOGIN',true)
    }else{
      this.$store.commit('CHANGE_ISLOGIN',false)
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
</style>
