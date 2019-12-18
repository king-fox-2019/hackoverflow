<template>
  <div id="card">
    <b-card :title="question.title" :sub-title="question.userId.fullname">
      <b-button variant="primary"
        @click="vote({action: 'up', data: 'questions', id: question._id})"
        class="mr-2">
        <i id="up" class="fas fa-caret-up fa-sm"></i>
      </b-button>
      <b-button
        @click="vote({action: 'down', data: 'questions', id: question._id})"
        variant="primary" class="mr-2">
        <i id="up" class="fas fa-caret-down fa-sm"></i>
      </b-button>
      <router-link :to="`/questions/${question._id}`">
        <b-button class="ml-3"
        @click="detail(question)"
        variant="outline-primary">View</b-button>
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
</style>
