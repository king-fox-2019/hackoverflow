<template>
  <div>
    <TopNavbar />
    <h1 style='text-align: center'v-if='questionList.length == 0'>Nothing to see here</h1>
    <QuestionCard v-for='(question, index) in questionList' :question='question' :key='index'/>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionCard from '@/components/QuestionCard.vue'
import TopNavbar from '@/components/TopNavbar.vue'

export default {
  name: 'home',
  components: {
    TopNavbar,
    QuestionCard
  },
  data(){
    return {
    }
  },
  created(){
    this.$store.dispatch('getAllQuestion')
  },
  computed: {
    questionList(){
      return this.$store.state.questionList
    }
  }
}
</script>
