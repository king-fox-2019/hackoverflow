<template>
<b-container fluid>
  <b-row class="">
    <b-col cols="3">
      <img 
        src="../assets/ill.jpg" 
        style="width: 300px; height: 400px"
      />
    </b-col>
    <b-col cols="8">
      <div class="d-flex align-items-center">
        <h3>Questions</h3>
        <b-button
          size="sm"
          class="ml-auto"
          variant="primary"
          to="/ask"
        >Ask Question
        </b-button>
      </div>
      <QuestionCard
        @fetchQuestions="fetchQuestions"
        class="my-2 rounded"
        v-for="question in questions"
        :key="question._id"
        :question="question"
      ></QuestionCard>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import { mapState } from 'vuex'
import QuestionCard from '../components/QuestionCard'

export default {
  name: 'home',
  components: {
    QuestionCard
  },
  methods: {
    fetchQuestions () {
      this.$store.dispatch('fetchQuestions')
    }
  },
  computed: mapState(['questions']),
  created () {
    this.fetchQuestions()
  }
}
</script>

<style scoped>

</style>
