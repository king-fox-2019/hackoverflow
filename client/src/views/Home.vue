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
          <b-form inline>
            <b-input
              class="mb-2 mr-sm-2 mb-sm-0"
              v-model="searchQuerry"
              placeholder="Search Question"
            ></b-input>

            <b-button variant="primary" @click="getQuestions">Search</b-button>
          </b-form>
        </b-col>
      </b-row>
      <hr class="mt-3 mb-4 border-primary" />
      <b-row>
        <b-col cols="12" sm="8">
          <ul class="list-unstyled">
            <b-media
              class="my-4"
              tag="li"
              v-for="question in questions"
              :key="question._id"
            >
              <template v-slot:aside>
                <div
                  class="stat-box d-flex align-items-center justify-content-around border border-primary rounded"
                >
                  <div class="text-center">
                    <h1 class="text-accent mb-0">
                      {{ question.upvotes.length - question.downvotes.length }}
                    </h1>
                    <small class="text-muted">votes</small>
                  </div>
                  <div class="text-center ">
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
      this.$store.dispatch('getAllQuestions')
    }
  },
  created() {
    this.getQuestions()
  }
}
</script>

<style lang="scss" scoped>
.stat-box {
  width: 13rem;
  height: 5rem;
}
</style>
