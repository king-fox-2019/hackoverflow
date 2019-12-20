<template>
  <div class="d-flex align-items-baseline">
    <b-button variant="outline-info" size="sm" class="mr-2" @click="addVote(1)">
      <span class="fas fa-angle-up"></span>
    </b-button>
    <p class="mr-2">{{ totalVotes }}</p>
    <b-button variant="outline-info" size="sm" @click="addVote(-1)">
      <span class="fas fa-angle-down"></span>
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'VoteButton',
  props: ['totalVotes'],
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    addVote(value) {
      if (!this.username) {
        this.$bvToast.toast('Please login first', {
          title: 'Error',
          variant: 'danger',
          autoHideDelay: 1500,
          appendToast: true,
        });
      }
    },
  },
};
</script>
