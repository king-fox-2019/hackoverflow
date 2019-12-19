<template>
  <div class="home" style="display:flex">
    <LeftBar />
    <Filtered />
    <RightBar />

  </div>
</template>

<script>
// @ is an alias to /src
import Filtered from '@/components/FilteredPage.vue'
import LeftBar from '@/components/LeftBar.vue'
import RightBar from '@/components/RightBar.vue'

export default {
  name: 'home',
  components: {
    Filtered,
    RightBar,
    LeftBar
  }, 
  created(){
        if(localStorage.getItem('token')){
            this.$store.dispatch('fetchQuestion') 
            this.$store.dispatch('getAllTags')
        }
    }
}
</script>
