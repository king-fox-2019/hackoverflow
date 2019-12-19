<template>
  <div id="home">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-container>
            <div class="row questions-header-row mb-3">
              <p class="headline">All Questions</p>
                <v-btn @click="goToAsk" class="ask-question-btn">
                  Ask Question
                </v-btn>
            </div>
          </v-container>

          <router-view />
          <div v-for="question in questions" :key="question._id">
            <CardQuestionSummary 
              :question="question" 
              :is-watched="isThisWatched(question)" />
          </div>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardQuestionSummary from "../components/CardQuestionSummary";
import toast from '../mixins/toast'
import { mapState } from "vuex";

export default {
  name: "home",

  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-earth" },
        { title: "Tags", icon: "mdi-tag" }
      ]
    };
  },

  methods: {
    isThisWatched: function(question) {
      for (let tag of question.tags) {
        if (this.user.watchedTags && this.user.watchedTags.includes(tag)) return true
      }
      return false
    },

    goToAsk: function() {
      if (!this.user.isLoggedIn) this.danger('Please log in/join first!')
      else this.$router.push('/ask')
    }
  },

  mounted() {
    this.$store.dispatch("fetchQuestions")
    this.$store.dispatch("fetchCurrentUser")
  },

  computed: {
    ...mapState(["questions", "user"])
  },

  mixins: [toast],

  components: {
    CardQuestionSummary
  }
};
</script>

<style>
.questions-header-row {
  margin-top: 70px;
  margin-left: -50px;
  display: flex;
  justify-content: space-around;
}

.questions-header-row p {
  margin: 0 !important;
  margin-top: 5px !important;
}
</style>
