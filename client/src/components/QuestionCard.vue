<template>
  <b-row class="border" style="min-height: 15vh">
    <div class="my-0" style="width: 10%; text-align: center">
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
      <div class="mt-2">
        <router-link
          :to="'/questions/' + question._id"
        >{{ question.title }}
        </router-link>
      </div>
      <div class="ml-auto mr-2">by {{ question.author.username }}</div>
    </div>
  </b-row>
</template>

<script>
export default {
  name: 'QuestionCard',
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
.arrow:hover {
  cursor: pointer;
}
</style>
