<template>
  <div class="home" style="display:flex">
    <LeftBar />
    <MyPage />
    <RightBar />

  </div>
</template>

<script>
// @ is an alias to /src
import MyPage from '@/components/MyPage.vue'
import LeftBar from '@/components/LeftBar.vue'
import RightBar from '@/components/RightBar.vue'

export default {
  name: 'home',
  components: {
    MyPage,
    RightBar,
    LeftBar
  },
  created(){
    this.$store.dispatch('fetchQuestionById',this.$router.currentRoute.params.id)
  }
}
</script>
