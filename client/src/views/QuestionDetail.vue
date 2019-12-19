<template>
   <div class="flex flex-col items-center">
      <div class="flex items-center">
         <router-link to="">
            <i class="far fa-plus-square text-blue-300 hover:text-blue-700 text-5xl mx-4 px-4 cursor-pointer"></i>
         </router-link>
         <div>
            <h2 class="text-gray-700 font-semibold text-xl">{{question.title}}</h2>
            <h3 class="text-gray-600 font-thin hover:text-gray-800">By: {{user.username}}</h3>
            <p>{{question.description}}</p>
         </div>
         <hr class="py-4">
      </div>

      <answer-card v-for="answer in answers" :key="answer._id" :answerId="answer._id"/>
   </div>
</template>

<script>
import axios from '../../apis/server'
import AnswerCard from '../components/AnswerCard'

export default {
   name: 'QuestionDetail',

   data() {
      return {
         question: {},
         answers: [],
         user: {}
      }
   },

   components: {
      'answer-card': AnswerCard
   },

   methods: {
      fetchDetail() {
         axios({
            url: `/question/${this.$route.params.questionId}`,
            method: 'get'
         })
         .then(({data}) => {
            this.question = data.question
            this.answers = data.question.answers
            console.log(data.question.user, 'disiniasndisandi')
            return axios({
               url: `/user/${data.question.user}`,
               method: 'get'
            })
         })
         .then(({data}) => {
            console.log(data.user)
            this.user = data.user
         })
         .catch(error => console.log(error))
      }
   },

   created() {
      this.fetchDetail()
   }
}
</script>

<style>

</style>