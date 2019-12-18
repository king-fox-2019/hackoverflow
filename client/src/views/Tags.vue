<template>
  <div class="home" style="display:flex">
  
    <LeftBar />
    <TagSection />
    <RightBar />

  </div>
</template>

<script>
// @ is an alias to /src
import LeftBar from '@/components/LeftBar.vue'
import RightBar from '@/components/RightBar.vue'
import TagSection from '@/components/TagSection.vue'

export default {
  name: 'home',
  components: {
    RightBar,
    LeftBar,
    TagSection
  }
}
</script>
