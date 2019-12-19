<template>
  <div class="thread-list-wrapper" @click.prevent="viewThread(thread._id)">
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
      <h4>{{ thread.title }}</h4>
      <p class="content">{{ thread.content }}</p>
      <span><strong>Author:</strong> {{ thread.author.name }}</span> &nbsp;&nbsp;
      <span><strong>Created At: </strong>{{ createdAt }}</span>
      <div v-if="tagLength > 0"><strong>Tags:</strong> {{ tagsDisplay }}</div>
    </div>
  </div>
</template>

<script scoped>
import moment from 'moment'
export default {
  props: ['thread'],
  components: {
  },
  created() {
  },
  methods: {
    viewThread(id) {
      // console.log('id thread', id)
      this.$store.dispatch('viewThread', id)
    }
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
    },
    createdAt: function() {
      return moment(this.thread.createdAt).format('hh:mm - DD MMMM YYYY')
    }
  }
}
</script>

<style scoped>
  .thread-card {
    width: 80px;
    height: 80px;
    display: flex;
    flex-shrink: 0;
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
    /* width: 80%; */
    padding: 1rem;
    margin: 0 auto;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 4px;
  }
  .thread-list-wrapper:nth-child(even) {
    background-color: #ffffff;    
  }
  .thread-list-wrapper:hover {
    padding: 2rem;
    background-color: #78cad6;
    transition: 0.4s padding;
  }
  .thread-content {
    margin-left: 2rem;
    width: calc(100% - 4.4rem);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p.content {
    /* max-width: 100% !important;  */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>