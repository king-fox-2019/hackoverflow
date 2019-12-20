<template>
  <div class="flex justify-center my-12">
    <div class="border border-gray-500 p-6" id="question-card-container">
      <question-card v-for="question in questions" :key="question._id" :question="question" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapActions, mapState} from 'vuex'
import QuestionCard from '../components/QuestionCard'


export default {
  name: 'home',
  components: {
    'question-card': QuestionCard
  },

  computed: {
    ...mapState('question', ['questions'])
  },

  methods: {
    ...mapActions('user', ['checkLoggedIn']),
    ...mapActions('question', ['fetchQuestions'])
  },

  created() {
    this.checkLoggedIn()
    this.fetchQuestions()
  }
}
</script>

<style scoped>
  #question-card-container {
    max-width: 70%
  }
</style>