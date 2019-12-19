<template>
  <div class="home" style="display:flex">
  
    <LeftBar />
    <UserSection />
    <RightBar />

  </div>
</template>

<script>
// @ is an alias to /src
import LeftBar from '@/components/LeftBar.vue'
import RightBar from '@/components/RightBar.vue'
import UserSection from '@/components/UserSection.vue'

export default {
  name: 'home',
  components: {
    RightBar,
    LeftBar,
    UserSection
  }
}
</script>
