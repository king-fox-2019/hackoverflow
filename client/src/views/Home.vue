<template>
  <v-container fluid>
    <h1>Questions</h1>
    <QuestionList />
  </v-container>
</template>

<script>
import QuestionList from '@/components/QuestionList'
export default {
  name: 'home',
  components: {
    QuestionList
  }
}
</script>
