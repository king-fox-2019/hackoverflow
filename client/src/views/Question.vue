<template>
  <b-container class="mt-4" v-if="question">
    <h2>{{ question.title }}</h2>
    <div class="d-flex flex-wrap mb-2">
      <b-badge
        class="mr-2"
        variant="secondary"
        v-for="tag in question.tags"
        :key="tag"
        :to="`/search?search=${tag}`"
        >{{ tag }}</b-badge
      >
    </div>

    <hr class="mb-5 border-primary" />

    <b-media>
      <template v-slot:aside>
        <div
          class="vote-box d-flex flex-column align-items-center justify-content-between"
        >
          <div class="text-center vote" @click="voteQuestion('up')">
            <font-awesome-icon
              :class="{
                'text-danger': question.upvotes.includes($store.state.id),
                'text-accent': !question.upvotes.includes($store.state.id)
              }"
              icon="caret-up"
              size="3x"
            ></font-awesome-icon>
          </div>
          <div>
            <h2 class="m-0 p-0 text-secondary">
              {{ question.upvotes.length - question.downvotes.length }}
            </h2>
          </div>
          <div class="text-center vote" @click="voteQuestion('down')">
            <font-awesome-icon
              :class="{
                'text-danger': question.downvotes.includes($store.state.id),
                'text-accent': !question.downvotes.includes($store.state.id)
              }"
              icon="caret-down"
              size="3x"
            ></font-awesome-icon>
          </div>
        </div>
      </template>
      <p v-html="question.description"></p>
      <small class="text-muted float-right"
        >Asked by {{ question.author.email }}</small
      >
    </b-media>

    <ul class="list-unstyled">
      <div v-for="answer in question.answers" :key="answer._id">
        <hr class="border-primary mt-5" />
        <b-media class="my-4" tag="li">
          <template v-slot:aside>
            <div
              class="vote-box d-flex flex-column align-items-center justify-content-between"
            >
              <div
                class="text-center vote"
                @click="voteAnswer('up', answer._id)"
              >
                <font-awesome-icon
                  :class="{
                    'text-danger': answer.upvotes.includes($store.state.id),
                    'text-accent': !answer.upvotes.includes($store.state.id)
                  }"
                  icon="caret-up"
                  size="3x"
                ></font-awesome-icon>
              </div>
              <div>
                <h2 class="m-0 p-0 text-secondary">
                  {{ answer.upvotes.length - answer.downvotes.length }}
                </h2>
              </div>
              <div
                class="text-center vote"
                @click="voteAnswer('down', answer._id)"
              >
                <font-awesome-icon
                  :class="{
                    'text-danger': answer.downvotes.includes($store.state.id),
                    'text-accent': !answer.downvotes.includes($store.state.id)
                  }"
                  icon="caret-down"
                  size="3x"
                ></font-awesome-icon>
              </div>
            </div>
          </template>
          <p v-html="answer.content"></p>
          <small class="text-muted float-right">
            {{ answer.author.email }}
          </small>
        </b-media>
      </div>
    </ul>
  </b-container>
</template>

<script>
export default {
  name: 'QuestionDetail',
  data() {
    return {
      question: null
    }
  },
  methods: {
    getQuestionDetail() {
      this.$store
        .dispatch('getQuestionDetail', this.$route.params.id)
        .then(({ data }) => (this.question = data.data))
        .catch(({ response }) => {
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
          this.$router.replace('/')
        })
    },
    voteQuestion(side) {
      this.$store
        .dispatch('onVoteQuestion', { side, id: this.$route.params.id })
        .then(({ data }) => {
          this.$toasted.show(data.message)
          this.question = data.data
        })
        .catch(({ response }) =>
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        )
    },
    voteAnswer(side, id) {
      this.$store
        .dispatch('onVoteAnswer', { side, id })
        .then(({ data }) => {
          this.$toasted.show(data.message)
          this.getQuestionDetail()
        })
        .catch(({ response }) =>
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        )
    }
  },
  created() {
    this.getQuestionDetail()
  }
}
</script>

<style lang="scss" scoped>
.vote-box {
  width: 4rem;
}

.vote {
  margin: -0.5rem;
  cursor: pointer;
}
</style>
