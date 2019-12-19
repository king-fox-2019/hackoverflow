<template>
  <div id="home">
    <b-jumbotron
      class="text-light text-center"
      lead-tag="div"
      bg-variant="primary"
      fluid
    >
      <template v-slot:header>Stun Overflow</template>

      <template v-slot:lead
        ><p>
          Having unanswered questions? Ask for help and get stunned together!
        </p></template
      >

      <hr class="my-4 w-75 border-success" />

      <b-button variant="outline-light" size="lg" to="session?on=signup"
        >Get Started</b-button
      >
    </b-jumbotron>

    <b-container id="question-list">
      <router-link class="text-decoration-none" to="/">
        <h1>All Question</h1>
      </router-link>
      <b-form inline @submit.prevent="search">
        <b-input
          class="mb-2 mr-sm-2 mb-sm-0"
          v-model="searchQuerry"
          placeholder="Search Question"
        ></b-input>

        <b-button variant="primary" type="submit">Search</b-button>
      </b-form>

      <hr class="mt-4 mb-5 border-primary" />

      <ul class="list-unstyled">
        <b-media
          class="my-4"
          tag="li"
          v-for="question in questions"
          :key="question._id"
        >
          <template v-slot:aside>
            <div
              class="d-flex flex-column flex-lg-row align-items-center justify-content-around"
            >
              <div
                class="text-center d-flex flex-column justify-content-between stat-box border border-primary rounded mr-0 mr-lg-2 mb-2 mb-lg-0"
              >
                <h2 class="text-accent mb-0">
                  {{ question.upvotes.length - question.downvotes.length }}
                </h2>
                <small class="text-muted mb-2">votes</small>
              </div>
              <div
                class="text-center d-flex flex-column justify-content-between stat-box border border-primary rounded"
              >
                <h2 class="text-accent mb-0">{{ question.answers.length }}</h2>
                <small class="text-muted mb-2">answers</small>
              </div>
            </div>
          </template>

          <router-link
            class="text-decoration-none"
            :to="`/questions/${question._id}`"
          >
            <h3 class="mt-0 mb-1">{{ question.title }}</h3>
          </router-link>

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

          <p class="mb-0">{{ question.description.slice(0, 500) }}...</p>
          <small class="text-muted float-right"
            >Asked by {{ question.author.email }}</small
          >
        </b-media>
      </ul>
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
        .dispatch('getAllQuestions', this.$route.query.search || undefined)
        .finally(() => loader.hide())
    },
    search() {
      this.$router.push(
        `/${this.searchQuerry ? `search?search=${this.searchQuerry}` : ''}`
      )
    }
  },
  watch: {
    '$route.fullPath'(val) {
      console.log(val)
      this.getQuestions()
    }
  },
  created() {
    this.getQuestions()
  }
}
</script>

<style lang="scss" scoped>
.stat-box {
  width: 4rem;
  height: 4rem;
}

#question-list {
  min-height: 80vh;
}
</style>
