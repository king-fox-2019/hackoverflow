<template>
  <div>
    <b-container>
      <b-jumbotron
        header="Hackoverflow"
        lead="You asking, somebody that you used to know answering"
        bg-variant="light"
        text-variant="info"
        border-variant="info"
      >
        <hr class="my-3" />
        <p v-if="!username">Please login before ask / answering</p>
      </b-jumbotron>
      <hr class="mt-2 mb-4" />
      <QuestionCard v-for="question in questions" :key="question._id" :detail="question" />
    </b-container>
  </div>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue';

export default {
  name: 'home',
  computed: {
    username() {
      return this.$store.state.username;
    },
    questions() {
      return this.$store.state.questions;
    },
  },
  components: {
    QuestionCard,
  },
};
</script>
