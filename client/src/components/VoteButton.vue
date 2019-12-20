<template>
  <div class="vote-wrapper">
    <b-button variant="primary" class="vote-button" @click="upvote(data._id)">+</b-button>
    <div class="vote">
      {{vote}}
    </div>
    <b-button variant="danger" class="vote-button" @click="downvote(data._id)">-</b-button>
  </div>
</template>

<script>
export default {
  props: ['modeURL', 'data'],
  methods: {
    upvote(id) {
      this.$store.dispatch('upvote', {id, thread:this.data.thread, url:this.modeURL})
    },
    downvote(id) {
      this.$store.dispatch('downvote', {id, thread:this.data.thread, url:this.modeURL})
    }
  },
  computed: {
    vote: function() {
      return this.data.upvote.length - this.data.downvote.length
    }
  }
}
</script>

<style>
  .vote-wrapper {
    margin: 2rem;
  }
  .vote {
    height: 40px;
    line-height: 40px;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
  }
  .vote-button {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
</style>