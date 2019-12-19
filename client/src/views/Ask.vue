<template>
  <div class="home" style="display:flex">
  
    <LeftBar />
    <AskSection />
    <RightBar />

  </div>
</template>

<script>
// @ is an alias to /src
import LeftBar from '@/components/LeftBar.vue'
import RightBar from '@/components/RightBar.vue'
import AskSection from '@/components/AskSection.vue'

export default {
  name: 'home',
  components: {
    RightBar,
    LeftBar,
    AskSection
  }
}
</script>
