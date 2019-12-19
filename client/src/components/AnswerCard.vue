<template>
   <div>
      <p>{{answer.content}}</p>
   </div>
</template>

<script>
import axios from '../../apis/server'

export default {
   name: 'AnswerCard',
   data() {
      return {
         answer: {}
      }
   },

   props: {
      answerId: String
   },

   methods: {
      fetchAnswer() {
         axios({
            url: `/answer/${this.answerId}`,
            method: 'get'
         })
         .then(({data}) => {
            this.answer = data.answer
         })
         .catch(error => console.log(error))
      }
   },

   created() {
      this.fetchAnswer()
   }
}
</script>

<style>

</style>