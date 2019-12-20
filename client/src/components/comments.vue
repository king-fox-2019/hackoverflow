<template>
  <section id="comment">
    <div id="answerbox">
      <div id="mampus">
        <input type="text" class="form-control mb-2"
        placeholder="title"
        id="title" v-model="title">
      </div>
      <div id="textarea">
        <textarea class="form-control" id="box"
        v-model="commentPost"></textarea>
        <b-button id="button" class="ml-2"
        style="width: 5rem;"
        @click="post" variant="light">Post</b-button>
      </div>
      <hr>
    </div>
    <div id="commentList">
      <div
      class="mb-2"
      v-for="comment in $store.state.currentComment"
      :key="comment._id">
        <b-card id="onecomment" bg-variant="light" text-variant="dark" :title="comment.title">
          <b-card-text>
            {{comment.description}}
          </b-card-text>
          <b-button type="button" class="mr-2"
          variant="outline-light">
            Votes <span class="badge badge-light">{{comment.upVotes - comment.downVotes}}</span>
          </b-button>
          <b-button variant="outline-light"
          @click="vote({action: 'up', data: 'answer', id: comment._id})"
          class="mr-2">
            <i id="up" class="fas fa-caret-up fa-2x"></i>
          </b-button>
          <b-button variant="outline-light"
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
      title: '',
      commentPost: '',
    };
  },
  methods: {
    vote(payload) {
      this.$store.dispatch('votes', payload);
    },
    post() {
      this.$store.dispatch('post', { title: this.title, comment: this.commentPost, action: 'answer' });
      this.title = '';
      this.commentPost = '';
    },
  },
};
</script>

<style scoped>
hr {
  border: 1px solid white;
}
#onecomment {
  color: white !important;
  border: 1px solid white;
  background-color: black !important;
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
  display: flex;
  justify-content: space-around;
}
#box {
  display: inline-flex;
  justify-content: space-around;
}
#comment::-webkit-scrollbar {
  display: none;
}
#mampus {
  display: flex;
  justify-content: center;
  margin-left: 30%;
  margin-right: 30%
}
</style>
