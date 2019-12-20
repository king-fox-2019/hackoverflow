<template>
  <b-card border-variant="info" class="mb-3">
    <b-card-title
      ><h1>
        <b-link class="text-info" :to="{path: `/question/${detail._id}`}">{{
          detail.title
        }}</b-link>
      </h1></b-card-title
    >
    <b-card-sub-title class="font-italic"
      >By {{ detail.owner.username }}</b-card-sub-title
    >
    <hr class="mt-3 mb-3" />
    <b-card-text class="mb-5">{{ detail.description }}</b-card-text>
    <div class="d-flex align-items-baseline justify-content-between">
      <VoteButton :totalVotes="totalVote" />
      <b-button
        size="sm"
        variant="info"
        v-if="username"
        :to="{path: `/question/${detail._id}`}"
        >Answer</b-button
      >
    </div>
  </b-card>
</template>

<script>
import VoteButton from '@/components/VoteButton.vue';

export default {
  name: 'QuestionCard',
  props: ['detail'],
  components: {
    VoteButton,
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    totalVote() {
      return this.detail.votes.reduce((a, vote) => (a += vote.value), 0);
    },
  },
};
</script>
