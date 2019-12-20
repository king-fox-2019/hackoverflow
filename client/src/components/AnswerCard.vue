<template>
  <div>
    <b-card border-variant="info" class="my-3">
      <b-card-text>{{ detail.description }}</b-card-text>
      <hr />
      <b-card-sub-title class="font-italic mb-3"
        >By {{ detail.owner.username }}</b-card-sub-title
      >
      <VoteButton :totalVotes="totalVote" />
    </b-card>
  </div>
</template>

<script>
import VoteButton from '@/components/VoteButton.vue';

export default {
  name: 'AnswerCard',
  props: ['detail'],
  components: {
    VoteButton,
  },
  computed: {
    totalVote() {
      return this.detail.votes.reduce((a, vote) => (a += vote.value), 0);
    },
  },
};
</script>
