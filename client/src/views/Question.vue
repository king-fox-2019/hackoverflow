<template>
  <div class="home" style="display:flex">
    <LeftBar />
    <QuestionSection />
    <RightBar />

  </div>
</template>

<script>
// @ is an alias to /src
import QuestionSection from '@/components/QuestionSection.vue'
import LeftBar from '@/components/LeftBar.vue'
import RightBar from '@/components/RightBar.vue'

export default {
  name: 'home',
  components: {
    QuestionSection,
    RightBar,
    LeftBar
  },
  created(){
    this.$store.dispatch('fetchQuestionById',this.$router.currentRoute.params.id)
  }
}
</script>
