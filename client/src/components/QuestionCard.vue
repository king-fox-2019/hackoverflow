<template>
  <div>
    <b-row align-v="center" no-gutters class="p-3 border-bottom border-top">
      <b-col md="1">
        <p class="text-center m-1 p-1">
          {{ QuestionData.upvotes.length }}
          <br />votes
        </p>
      </b-col>
      <b-col md="1">
        <p class="text-center m-1 p-1">
          {{ QuestionData.answers.length }}
          <br />answers
        </p>
      </b-col>
      <b-col md="10" class="font-weight-bold text-break pl-4">
        <div @click.prevent="toQuestionDetailPage(QuestionData._id)" style="cursor:pointer; display: flex; justify-content: flex-start;">
          <p class="mb-1">{{ QuestionData.title }}</p>
        </div>
        <br>
        <div style="display: flex; justify-content: space-between;">
          <div>
            <QuestionTags v-for="(tag, i) in QuestionData.tags" :key=i :QuestionTag=tag></QuestionTags>
          </div>
          <div>
            <div style="display: flex; justify-content: flex-start; align-items: flex-end">
              <small> Posted by: {{ QuestionData.user_id.username}} </small>
            </div>
            <div style="display: flex; justify-content: flex-start; align-items: flex-end">
              <small> on {{ new Date(QuestionData.createdAt).toDateString() }} </small>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import QuestionTags from '../components/QuestionTags'

export default {
  name: 'QuestionCard',
  props: ['QuestionData'],
  components: {
    QuestionTags
  },
  methods: {
    toQuestionDetailPage (questionId) {
      // this.$router.push('/main/question-details', QuestionData)
      this.$store.dispatch('getQuestionDetails', questionId)
    }
  }
}
</script>

<style>
</style>
