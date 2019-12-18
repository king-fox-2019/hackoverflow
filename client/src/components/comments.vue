<template>
  <section id="comment">
    <div id="answerbox">
      <div id="textarea">
        <textarea class="form-control" id="box"
        v-model="comment"></textarea>
        <b-button id="button" class="ml-2"
        style="width: 5rem;"
        @click="post" variant="light">Post</b-button>
      </div>
      <hr>
    </div>
    <div id="commentList">
      <div id="onecomment"
      class="mb-2"
      v-for="comment in $store.state.currentComment"
      :key="comment._id">
        <b-card bg-variant="light" text-variant="dark" :title="comment.title">
          <b-card-text>
            With supporting text below as a natural lead-in to additional content.
          </b-card-text>
          <b-button variant="primary"
          @click="vote({action: 'up', data: 'answer', id: comment._id})"
          class="mr-2">
            <i id="up" class="fas fa-caret-up fa-2x"></i>
          </b-button>
          <b-button variant="primary"
          @click="vote({action: 'down', data: 'answer', id: comment._id})"
          class="mr-2">
            <i id="up" class="fas fa-caret-down fa-2x"></i>
          </b-button>
        </b-card>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      comment: '',
    };
  },
  methods: {
    vote(payload) {
      this.$store.dispatch('votes', payload);
    },
    post() {
      console.log(this.comment);
    },
  },
};
</script>

<style scoped>
hr {
  border: 1px solid white;
}
#comment {
  padding: 1rem;
  margin-left: 20%;
  margin-right: 20%;
  justify-content: center;
  border: 2px dotted snow;
  border-radius: 1rem;
  height: 20rem;
  overflow-y: scroll;
}
#textarea {
  margin-left: 20%;
  margin-right: 20%;
  height: 3rem;
  display: inline-flex;
  justify-content: space-around;
}
#box {
  display: inline-flex;
  justify-content: space-around;
}
#comment::-webkit-scrollbar {
  display: none;
}
</style>
