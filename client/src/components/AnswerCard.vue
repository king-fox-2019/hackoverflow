<template>
  <article class="post">
    <h5>{{ answer.title }}</h5>
    <p>{{ answer.description }}</p>
    <div class="media">
      <div class="media-left">
        <p class="image is-32x32">
          <img src="http://bulma.io/images/placeholders/128x128.png">
        </p>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <a href="#">{{ answer.UserId.username }}</a> {{ answer.createdAt.split('T')[0] }} &nbsp;
          </p>
        </div>
      </div>
      <div class="media-right">
        <div class="control">
          <div class="tags has-addons" @click.prevent="upvote">
            <span class="tag is-dark">{{ answer.upvotes.length }}</span>
            <span class="tag is-success" id="vote">Upvote</span>
          </div>
        </div>
        <div class="control">
          <div class="tags has-addons" @click.prevent="downvote">
            <span class="tag is-dark">{{ answer.downvotes.length }}</span>
            <span class="tag is-danger" id="vote">Downvote</span>
          </div>
        </div>
        <div class="control">
          <button class="button is-success is-small" id="vote" @click.prevent="retrieveAnswer">Update</button>
        </div>
        <div class="control">
          <button class="button is-danger is-small" id="vote" @click.prevent="removeAnswer">Delete</button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AnswerCard',
  props: {
    'answer': Object
  },
  data: function () {
    return {
    }
  },
  methods: {
    retrieveAnswer: function () {
      console.log('berhasil emit')
      this.$emit('retrieveAnswer', this.answer._id)
    },
    removeAnswer: function () {
      axios({
      method: 'DELETE',
      url: `${this.$store.state.base_url}/answers/${this.answer._id}`,
      headers: {
        access_token: this.$store.state.access_token
      }
    })
      .then(answer => {
        console.log(answer.data)
        this.$emit('loadAnswers')
      })
      .catch(err => {
        console.log(err)
      })
    },
    upvote: function () {
      let obj = {
        type: 'upvotes',
        AnswerId: this.answer._id,
        QuestionId: this.answer.QuestionId._id
      }
      return this.$store.dispatch('voteAnswer', obj)
    },
    downvote: function () {
      let obj = {
        type: 'downvotes',
        AnswerId: this.answer._id,
        QuestionId: this.answer.QuestionId._id
      }
      return this.$store.dispatch('voteAnswer', obj)
    }
  }
}
</script>

<style scoped>
#vote {
  cursor: pointer
}
</style>
