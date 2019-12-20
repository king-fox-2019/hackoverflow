<template>
  <div class="container">
    <b-card border-variant="info">
      <b-card-title>
        <h1 class="text-info">{{ question.title }}</h1>
      </b-card-title>
      <b-card-sub-title class="font-italic"
        >By {{ question.owner.username }}</b-card-sub-title
      >
      <hr class="my-3" />
      <b-card-text class="mb-5">{{ question.description }}</b-card-text>
      <div class="d-flex align-items-baseline justify-content-between">
        <VoteButton :totalVotes="totalVote" />
      </div>
    </b-card>
    <AnswerCard
      v-for="answer in question.answers"
      :key="answer._id"
      :detail="answer"
    />
  </div>
</template>

<script>
import axios from '@/utils/axios-instance';
import AnswerCard from '@/components/AnswerCard.vue';
import VoteButton from '@/components/VoteButton';

export default {
  name: 'Question',
  components: {
    AnswerCard,
    VoteButton,
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    question() {
      return this.$store.state.question;
    },
    totalVote() {
      return this.question.votes.reduce((a, vote) => (a += vote.value), 0);
    },
  },
  created() {
    this.$store.dispatch('fetchSingelQuestion', this.$route.params.questionId);
  },
};
</script>
