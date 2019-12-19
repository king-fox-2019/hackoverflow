<template>
   <div>
      <login v-if="authPage == 'login'" />
      <register v-if="authPage == 'register'" />
   </div>
</template>

<script>
import register from '../components/Register'
import login from '../components/Login'


export default {
   name: 'Authscreen',

   components: {
      login,
      register
   },

   data() {
      return {
         authPage: 'login'
      }
   },

   methods: {
      setScreen() {
         console.log('asdasdasds')
         if(this.$route.name == 'login') {
            this.authPage = 'login'
         }
         else {
            this.authPage = 'register'
         }
      }
   },

   created() {
      console.log(this.$route.name)
   },

   watch: {
      $route: function(to, from) {
         console.log('triggered')
         this.setScreen()
      }
   }
}
</script>

<style>

</style>