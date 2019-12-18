<template>
  <div id="card">
    <b-card id="card2" :title="question.title" :sub-title="question.userId.fullname">
      <b-button variant="outline-light"
        @click="vote({action: 'upvotes', data: 'questions', id: question._id})"
        class="mr-2">
        <i id="up" class="fas fa-caret-up fa-sm"></i>
      </b-button>
      <b-button
        @click="vote({action: 'downvotes', data: 'questions', id: question._id})"
        variant="outline-light" class="mr-2">
        <i id="up" class="fas fa-caret-down fa-sm"></i>
      </b-button>
      <b-button type="button"
      variant="outline-light"
      class="ml-1 mr-1">
        Votes <span class="badge badge-light">{{totalVotes}}</span>
      </b-button>
      <router-link :to="`/questions/${question._id}`">
        <b-button class="ml-1"
        @click="detail(question)"
        variant="outline-light">View</b-button>
      </router-link>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
    },
  },
  data() {
    return {
      message: 'Hello world',
    };
  },
  methods: {
    detail(question) {
      this.$store.dispatch('current', question);
    },
    vote(payload) {
      this.$store.dispatch('votes', payload);
    },
  },
  computed: {
    totalVotes() {
      const totalVotes = this.question.upVotes - this.question.downVotes;
      return totalVotes;
    },
  },
};
</script>

<style scoped>
#card {
  margin: 1rem;
}
#button, #updown {
  display: flex;
  justify-content: center;
}
#card2 {
  color: white;
  border: 1px solid white;
  background-color: black;
}
</style>
