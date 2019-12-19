<template>
  <section id="question-summaries">
    <div v-for="question in questions" :key="question._id">
      <CardQuestionSummary :question="question" />
    </div>
  </section>
</template>

<script>
import CardQuestionSummary from '../components/CardQuestionSummary'
import { mapState } from 'vuex'

export default {
  name: 'question-summaries',
  components: {
    CardQuestionSummary
  },
  computed: {
    ...mapState(['questions'])
  }
}
</script>

<style>
  #question-summaries {
    left: 1000px;
  }
</style>