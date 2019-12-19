<template>
  <b-badge @click.prevent="getQuestions(QuestionTag)" href="#" variant="warning" style="margin-right: 10px;">{{ QuestionTag }}</b-badge>
</template>

<script>
export default {
  name: 'QuestionTag',
  props: ['QuestionTag'],
  methods: {
    getQuestions (tag) {
      this.$store.dispatch('getFilteredQuestions', tag)
    }
  }
}
</script>

<style>

</style>
