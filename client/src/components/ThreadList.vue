<template>
  <div class="thread-list-wrapper">
    <!-- <vote-button class="left" /> -->
    <div class="card thread-card">
      <div class="thread-score">{{threadScore}}</div>
      <label class="label-score">Vote</label>
    </div>
    <div class="card thread-card">
      <div class="thread-score">{{threadReplies}}</div>
      <label class="label-score">Replies</label>
    </div>
    <div class="thread-content">
      <h3>{{ thread.title }}</h3>
      <p v-if="tagLength > 0"><strong>Tags:</strong> {{ tagsDisplay }}</p>
    </div>
  </div>
</template>

<script scoped>
import VoteButton from './VoteButton.vue'
export default {
  props: ['thread'],
  components: {
    // VoteButton
  },
  created() {
  },
  computed: {
    tagLength: function() {
      return this.thread.tags.length
    },
    tagsDisplay: function() {
      return this.thread.tags.join(", ")
    },
    threadScore: function() {
      return this.thread.upvote.length - this.thread.downvote.length
    },
    threadReplies: function() {
      return this.thread.replies.length
    }
  }
}
</script>

<style scoped>
  .thread-card {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
  }
  .thread-score {
    font-size: 2rem;
    color: #9c9c9c;
  }
  .label-score {
    margin-top: auto;
    color: #9c9c9c;
  }
  .thread-list-wrapper {
    display: flex;
    width: 80%;
    padding: 1rem;
    margin: 0 auto;
    background-color: #edebee;
    cursor: pointer;
    border-radius: 4px;
  }
  .thread-list-wrapper:nth-child(even) {
    background-color: #ffffff;    
  }
  .thread-content {
    margin-left: 2rem;
  }
</style>