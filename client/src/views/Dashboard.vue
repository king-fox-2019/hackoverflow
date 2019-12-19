<template>
  <v-container grid-list-xl text-xs-center>
    <h1 class="mt-4" v-if="this.$route.name == 'dashboard'">My Posted Questions</h1>
    <v-layout row wrap>
      <v-flex mt-4 xs10 offset-xs5 offset-md2 offset-lg3>
        <QuestionCard v-for="(q, index) in this.$store.state.myQuestionsList" :q="q" :key="index">
        </QuestionCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'
import QuestionCard from '@/components/QuestionCard.vue'

export default {
  components: {
    QuestionCard
  },
  mounted () {
    this.$store.dispatch('getMyQuestions')
  },
  // methods: {
  //   showMyEditForm (id) {
  //     this.$router.push(`/edit-question/${id}`)
  //   }
  // },
  computed: mapState(['myQuestionsList'])
}
</script>

<style scope>

</style>
