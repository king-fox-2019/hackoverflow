<template>
  <div class="home" style="display:flex">
    <LeftBar />
    <Center />
    <RightBar />

  </div>
</template>

<script>
// @ is an alias to /src
import Center from '@/components/CenterBar.vue'
import LeftBar from '@/components/LeftBar.vue'
import RightBar from '@/components/RightBar.vue'

export default {
  name: 'home',
  components: {
    Center,
    RightBar,
    LeftBar
  }, 
  created(){
        if(localStorage.getItem('token')){
          
            this.$store.commit('CHANGE_ISLOGIN',true)
            this.$store.dispatch('fetchQuestion') 
            this.$store.dispatch('getAllTags')
        }
    }
}
</script>
