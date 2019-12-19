<template>
  <div class="home" style="display:flex">
  
    <LeftBar />
    <EditSection />
    <RightBar />

  </div>
</template>

<script>
// @ is an alias to /src
import LeftBar from '@/components/LeftBar.vue'
import RightBar from '@/components/RightBar.vue'
import EditSection from '@/components/EditSection.vue'

export default {
  name: 'home',
  components: {
    RightBar,
    LeftBar,
    EditSection
  }
}
</script>
