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

      <hr class="my-4 w-75 border-success" v-if="!onSession" />

      <b-button
        variant="outline-light"
        size="lg"
        to="session?on=signup"
        v-if="!onSession"
        >Get Started</b-button
      >
    </b-jumbotron>

    <b-container id="question-list">
      <router-link class="text-decoration-none" to="/">
        <h1 class="d-inline-block">All Question</h1>
      </router-link>

      <b-row>
        <b-form
          class="col-12 col-sm-8 col-lg-6 d-flex flex-wrap align-items-center px-0"
          @submit.prevent="search"
        >
          <b-row class="w-100 mx-0 ">
            <b-col cols="12" sm="10">
              <b-input
                class="w-100"
                v-model="searchQuerry"
                placeholder="Search Question"
              ></b-input>
            </b-col>
            <b-col
              class="text-center text-sm-right mt-2 mt-sm-0"
              cols="12"
              sm="2"
            >
              <b-button variant="primary" type="submit">Search</b-button>
            </b-col>
          </b-row>
        </b-form>

        <b-form
          class="col-12 col-sm-8 col-lg-6 d-flex flex-wrap align-items-center mt-2 mt-lg-0 px-0"
          @submit.prevent="updateWatchedTags"
          v-if="onSession && onEditWatchedTags"
        >
          <b-row class="w-100 mx-0 ">
            <b-col cols="12" sm="10">
              <b-input
                class="w-100"
                v-model="watchedTagsString"
                placeholder="Watch Tags"
              ></b-input>
            </b-col>
            <b-col
              class="text-center text-sm-right mt-2 mt-sm-0"
              cols="12"
              sm="2"
            >
              <b-button variant="primary" type="submit">Save</b-button>
            </b-col>
          </b-row>
        </b-form>

        <div
          class="col-12 col-md-8 col-lg-6 d-flex flex-column flex-sm-row align-items-center mt-2 mt-lg-0"
          v-else-if="onSession"
        >
          <h6 class="mb-0 text-accent">Watched Tags:</h6>
          <div>
            <b-badge
              class="mx-1"
              variant="secondary"
              v-for="tag in watchedTags"
              :key="tag"
              :to="`/search?search=${tag}`"
              >{{ tag }}</b-badge
            >
          </div>
          <b-button
            class="mt-2 mt-sm-0 ml-sm-3"
            variant="outline-primary"
            size="sm"
            pill
            @click="setEditWatchedTags"
            >{{ watchedTags.length > 0 ? 'Edit Tags' : 'Add tags' }}</b-button
          >
        </div>
      </b-row>

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

          <p class="mb-0">{{ question.description | shortenDesc }}</p>
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
      searchQuerry: '',
      watchedTagsString: '',
      onEditWatchedTags: false
    }
  },
  computed: {
    onSession() {
      return this.$store.state.onSession
    },
    watchedTags() {
      return this.$store.state.watchedTags
    },
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
    },
    setEditWatchedTags() {
      this.watchedTagsString = this.watchedTags.join(', ')
      this.onEditWatchedTags = true
    },
    updateWatchedTags() {
      this.$store
        .dispatch('onUpdateWatchedTags', {
          watchedTags: this.watchedTagsString
        })
        .then(({ data }) => {
          this.$toasted.show(data.message)
        })
        .catch(({ response }) =>
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        )
        .finally(() => (this.onEditWatchedTags = false))
    }
  },
  watch: {
    '$route.fullPath'() {
      this.getQuestions()
    }
  },
  filters: {
    shortenDesc(val) {
      if (val) {
        let res = val.replace(/<[^>]*>/gi, '')

        return res.length > 500 ? res.slice(0, 500) + ' ...' : res
      } else return ''
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
