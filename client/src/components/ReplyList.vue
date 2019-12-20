<template>
  <div class="thread-list-wrapper">
    <VoteButton :modeURL="'reply'" :data="reply"/>
    <div class="thread-content">
      <p class="content">{{ reply.content }}</p>
      <span><strong>Author:</strong> {{ $store.state.currentThread.author.name }}</span> &nbsp;&nbsp;
      <span><strong>Created At: </strong>{{ createdAt }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import VoteButton from './VoteButton'

export default {
  props: ['reply'],
  components: {
    VoteButton
  },
  created() {
  },
  methods: {
  },
  computed: {
    createdAt: function() {
      return moment(this.reply.createdAt).format('hh:mm - DD MMMM YYYY')
    }
  }
}
</script>

<style scoped>
  .vote-wrapper {
    margin: 0 0 0 2rem !important;
  }
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
    /* padding: 2rem; */
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