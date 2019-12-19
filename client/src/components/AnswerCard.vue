<template>
  <b-row class="border" style="min-height: 10vh">
    <div class="" style="width: 20%; text-align: center">
      <div
        class="arrow"
        @click.prevent="submitVote('up')"
      ><font-awesome-icon icon="angle-up"></font-awesome-icon>
      </div>
      <div>{{ vote }}</div>
      <div
        class="arrow"
        @click.prevent="submitVote('down')"
      ><font-awesome-icon icon="angle-down"></font-awesome-icon>
      </div>
    </div>
    <div class="d-flex flex-column m-0" style="width: 80%">
      <div class="mt-2" v-html="answer.description">
      </div>
      <div v-if="answer.author._id == userId" class="d-flex">
        <b-button
          @click.prevent="deleteAnswer(answer._id)"
          size="sm"
          class=""
          variant="danger"
        >Delete
        </b-button>
        <b-button
          size="sm"
          class="mx-2"
          variant="danger"
          @click.prevent="openEditAnswer = !openEditAnswer"
        >Edit
        </b-button>
        <span class="ml-auto mr-2">by {{ answer.author.username }}</span>
      </div>
    </div>
    <div v-if="openEditAnswer" style="width: 100%">
      <wysiwyg v-model="content"/>
      <b-button
        block
        class="my-2"
        type="submit"
        variant="primary"
        @click.prevent="editAnswer(answer._id)"
      >Save
      </b-button>
    </div>
  </b-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AnswerCard',
  props: {
    answer: Object
  },
  data () {
    return {
      content: '',
      openEditAnswer: false
    }
  },
  methods: {
    submitVote (choice) {
      let payload = {
        answerId: this.answer._id,
        questionId: this.$route.params.questionId,
        choice
      }
      this.$store.dispatch('voteA', payload)
      this.$emit('fetchAnswers')
    },
    deleteAnswer (answerId) {
      let payload = {
        answerId,
        questionId: this.$route.params.questionId
      }
      this.$store.dispatch('deleteAnswer', payload)
    },
    editAnswer (answerId) {
      let payload = {
        answerId,
        content: this.content,
        questionId: this.$route.params.questionId
      }
      this.$store.dispatch('editAnswer', payload)
      this.openEditAnswer = false
    }
  },
  computed: {
    vote () {
      return this.answer.upvotes.length - this.answer.downvotes.length
    },
    userId () {
      return localStorage.getItem('userId')
    }
  },
  created () {
    this.$emit('fetchAnswers')
    this.content = this.answer.description

  }
}
</script>

<style>

</style>
