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
import axios from '@/utils/axios-instance';

export default {
  name: 'VoteButton',
  props: ['totalVotes', 'urlTarget', 'questionId', 'answerId'],
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
      } else {
        if (this.urlTarget === 'answers') {
          // push to question route
          this.pushVoteForAnswer(value);
        } else {
          // push to answer route
          this.pushVoteForQuestion(value);
        }
      }
    },
    pushVoteForAnswer(value) {
      axios
        .post(
          `/${this.urlTarget}/vote`,
          {
            value,
            answerId: this.answerId,
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({data}) => {
          this.$bvToast.toast('Success add vote', {
            title: 'Success',
            variant: 'success',
            autoHideDelay: 1500,
            appendToast: true,
          });
          this.$store.dispatch('fetchSingelQuestion', this.questionId);
        })
        .catch(error => {
          this.$bvToast.toast('Error happen, check console log', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 1500,
            appendToast: true,
          });
          console.log(error);
        });
    },
    pushVoteForQuestion(value) {
      axios
        .post(
          `/${this.urlTarget}/vote`,
          {
            value,
            questionId: this.questionId,
          },
          {
            headers: {
              token: localStorage.getItem('token'),
            },
          },
        )
        .then(({data}) => {
          this.$bvToast.toast('Success add vote', {
            title: 'Success',
            variant: 'success',
            autoHideDelay: 1500,
            appendToast: true,
          });
          this.$store.dispatch('fetchSingelQuestion', this.questionId);
          this.$store.dispatch('fetchAllQuestions');
        })
        .catch(error => {
          this.$bvToast.toast('Error happen, check console log', {
            title: 'Error',
            variant: 'danger',
            autoHideDelay: 1500,
            appendToast: true,
          });
          console.log(error);
        });
    },
  },
};
</script>
