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
      <div>
        <div class="mt-2" v-html="question.description"></div>
      </div>
      <div class="ml-auto mr-2">by {{ question.author.username }}</div>
    </div>
  </b-row>
</template>

<script>
export default {
  name: 'QuestionDetails',
  props: {
    question: Object
  },
  methods: {
    submitVote (choice) {
      let payload = {
        questionId: this.question._id,
        choice
      }
      this.$store.dispatch('voteQ', payload)
        .then(() => {
          this.$emit('fetchQ')
        })
    }
  },
  computed: {
    vote () {
      return this.question.upvotes.length - this.question.downvotes.length
    }
  }
}
</script>

<style>

</style>
