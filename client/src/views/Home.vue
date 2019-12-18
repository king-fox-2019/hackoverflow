<template>
  <div id="home">
    <b-jumbotron class="text-light text-center" bg-variant="primary" fluid>
      <template v-slot:header>Stun Overflow</template>

      <template v-slot:lead>
        Having unanswered questions? Ask for help and get stunned together!
      </template>

      <hr class="my-4 w-75 border-success" />

      <b-button variant="outline-light" size="lg" to="session?on=signup"
        >Get Started</b-button
      >
    </b-jumbotron>
    <b-container>
      <b-row>
        <b-col>
          <h1>All Question</h1>
          <b-form inline @submit.prevent="getQuestions">
            <b-input
              class="mb-2 mr-sm-2 mb-sm-0"
              v-model="searchQuerry"
              placeholder="Search Question"
            ></b-input>

            <b-button variant="primary" type="submit">Search</b-button>
          </b-form>
        </b-col>
      </b-row>
      <hr class="mt-3 mb-4 border-primary" />
      <b-row class="w-100">
        <b-col cols="12" ref="questionList">
          <ul class="list-unstyled">
            <b-media
              class="my-4"
              tag="li"
              v-for="question in questions"
              :key="question._id"
            >
              <template v-slot:aside>
                <div
                  class="stat-box d-flex flex-column flex-lg-row align-items-center justify-content-around border border-primary rounded"
                >
                  <div class="text-center">
                    <h1 class="text-accent mb-0">
                      {{ question.upvotes.length - question.downvotes.length }}
                    </h1>
                    <small class="text-muted">votes</small>
                  </div>
                  <div class="text-center">
                    <h1 class="text-accent mb-0">0</h1>
                    <small class="text-muted">answers</small>
                  </div>
                </div>
              </template>
              <router-link
                class="text-decoration-none"
                :to="`/questions/${question._id}`"
              >
                <h3 class="mt-0 mb-1">{{ question.title }}</h3>
              </router-link>
              <p class="mb-0">
                {{ question.description }}
              </p>
            </b-media>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      searchQuerry: ''
    }
  },
  computed: {
    questions() {
      return this.$store.state.questions
    }
  },
  methods: {
    getQuestions() {
      const loader = this.$loading.show({ container: this.$refs.questionList })
      this.$store
        .dispatch('getAllQuestions', this.searchQuerry || undefined)
        .finally(() => loader.hide())
    }
  },
  created() {
    this.getQuestions()
  }
}
</script>

<style lang="scss" scoped>
.stat-box {
  width: 12vw;
  min-width: 5rem;
}
</style>
