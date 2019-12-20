<template>
   <div class="flex items-center my-4" id="question-card">
      <div class="flex flex-col mx-4" id="vote-counter">
         <h3 class="font-bold text-3xl text-gray-700">{{question.votes.length}}</h3>
         <span class="text-gray-700">Total votes</span>
      </div>
      <div class="px-2 flex flex-col items-start">
         <router-link :to="`/question/${question._id}`" class="text-3xl font-bold text-gray-600 hover:text-gray-800 border-b border-gray-700 mb-2">{{question.title}}</router-link>
         <p class="text-gray-700">{{question.description}}</p>
      </div>
   </div>
</template>

<script>
export default {
   name: 'QuestionCard',
   props: {
      question: Object,
      voteFlag: null
   },
   methods: {
      checkVoteByCurrentUser() {
         const userFilterVotes = this.question.votes.filter((vote) => {
            return vote.userId == localStorage.userId
         })

         if(userFilterVotes.length > 0) {
            this.voteFlag = userFilterVotes[0].voteType
         }
      }
   },

   created() {
      this.checkVoteByCurrentUser()
   }
}
</script>

<style scoped>
   #vote-counter {
      min-width: 100px;
   }
</style>