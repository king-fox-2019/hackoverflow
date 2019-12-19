<template>
  <article class="post">
    <h4 @click.prevent="showQuestion">{{ question.title }}</h4>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="http://bulma.io/images/placeholders/128x128.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">{{ question.UserId.username }}</a> {{ question.createdAt.split('T')[0] }} &nbsp;
            <span class="tag is-dark">{{ question.category }}</span>
          </p>
        </div>
      </div>
      <div class="media-right">
        <div class="control">
          <div class="tags has-addons" @click.prevent="upvote">
            <span class="tag is-dark">{{ question.upvotes.length }}</span>
            <span class="tag is-success">Upvote</span>
          </div>
        </div>
        <div class="control">
          <div class="tags has-addons" @click.prevent="downvote">
            <span class="tag is-dark">{{ question.downvotes.length }}</span>
            <span class="tag is-danger">Downvote</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    'question': Object
  },
  methods: {
    showQuestion: function () {
      this.$router.push(`/questions/${this.question._id}`)
    },
    upvote: function () {
      let obj = {
        type: 'upvotes',
        QuestionId: this.question._id 
      }
      return this.$store.dispatch('voteQuestion', obj)
    },
    downvote: function () {
      let obj = {
        type: 'downvotes',
        QuestionId: this.question._id 
      }
      return this.$store.dispatch('voteQuestion', obj)
    }
  }
}
</script>

<style scoped>
.post {
  cursor: pointer
}
</style>
