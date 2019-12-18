<template>
  <div class="answer-list">
    <AnswerItem v-for="answer in updatedAnswers" :key="answer.id" :answer="answer" @refresh="refresh"/>
  </div>
</template>

<script>
import axios from '../config/api'
import AnswerItem from './AnswerItem'
export default {
  name: 'AnswerList',
  props: {
    question: String
  },
  data: function () {
    return {
      answers: []
    }
  },
  computed: {
    updatedAnswers: function () {
      return this.answers
    }
  },
  components: {
    AnswerItem
  },
  methods: {
    refresh () {
      this.$emit('refresh')
    }
  },
  created () {
    axios({
      method: 'GET',
      url: `/answer/${this.question}`
    })
      .then(({ data }) => {
        this.answers = data
      })
      .catch(err => {
        this.$swal.fire(
          'sumting wong',
          err,
          'error'
        )
      })
  }
}
</script>

<style>

</style>
