<template>
   <div class="flex items-center">
      <div class="flex flex-col px-2">
         <i class="fas fa-chevron-up cursor-pointer font-bold text-3xl text-gray-500 hover:text-gray-800" :class="{'text-blue-700': voteFlag == 'up'}"></i>
         <i class="fas fa-chevron-down cursor-pointer font-bold text-3xl text-gray-500 hover:text-gray-800" :class="{'text-blue-700': voteFlag == 'down'}"></i>
      </div>
      <div class="px-2">
         <router-link :to="`/question/${question._id}`" class="text-3xl font-bold text-gray-600 hover:text-gray-800 border-b border-gray-700">{{question.title}}</router-link>
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

<style>

</style>