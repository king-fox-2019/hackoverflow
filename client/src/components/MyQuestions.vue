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
      <div class="d-flex align-items-center my-2">
        <h3 class="my-2">My Questions</h3>
      </div>
      <QuestionCard
        class="my-2 rounded"
        v-for="question in questions"
        :key="question._id"
        :question="question"
        @fetchQ="fetchQuestion"
      ></QuestionCard>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import axios from '../api/server'
import QuestionCard from '../components/QuestionCard'

export default {
  name: 'MyQuestion',
  components: {
    QuestionCard
  },
  data () {
    return {
      questions: {},
      questionLoaded: false,
      userId: ''
    }
  },
  methods: {
    fetchQuestion () {
      return axios({
        method: 'get',
        url: `/questions/${this.userId}/myquestions`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.questions = data
          this.questionLoaded = true
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.userId = localStorage.getItem('userId')
    this.fetchQuestion()
  }
}
</script>

<style>

</style>
