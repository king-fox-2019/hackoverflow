<template>
  <v-col
    class="py-0"
    cols="8"
    style="border-right:0.4px solid rgba(0,0,0,0.5);"
  >
    <v-row
      class="px-5 py-5"
      d-flex
      flex-direction-row
      style="border-bottom:0.4px solid rgba(0,0,0,0.5);"
    >
      <h1 v-if="$route.path == '/'">Top Question</h1>
      <h1 v-if="$route.params.id">{{ detailQuestion.title }}</h1>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" @click="$router.push('/ask')">
        ask question
      </v-btn>
    </v-row>
    <!--  -->
    <div class="detailQuestion" v-if="$route.params.id">
      <v-row
        class="px-1 py-auto"
        d-flex
        flex-row
        style="border-bottom:0.4px solid rgba(0,0,0,0.5);"
      >
        <v-col
          cols="3"
          d-flex
          flex-direction-row
          style="display:flex; align-items:center;"
        >
          <v-row class="py-auto">
            <v-col class="text-center">
              <p id="upvote"><v-icon>mdi-arrow-up-bold</v-icon></p>
              <p>0</p>
              <p id="downvote"><v-icon>mdi-arrow-down-bold</v-icon></p>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="9"
          d-flex
          flex-direction-column
          align-center
          class="text-left"
        >
          <h2>
            {{ detailQuestion.desc }}
          </h2>
          <v-chip
            class="mr-2"
            v-for="(tag, index) in detailQuestion.tags"
            :key="index"
            >{{ tag }}</v-chip
          >
        </v-col>
      </v-row>
    </div>

    <div class="allQuestion" v-if="$route.path == '/'">
      <v-row
        v-for="question in dataAllQuestion"
        :key="question._id"
        class="px-1 py-auto"
        d-flex
        flex-row
        style="border-bottom:0.4px solid rgba(0,0,0,0.5);"
      >
        <v-col
          cols="3"
          d-flex
          flex-direction-row
          style="display:flex; align-items:center;"
        >
          <v-row class="py-auto">
            <v-col class="text-center" @click="onDetailQuestion(question._id)">
              <p id="total">0</p>
              <p id="total">votes</p>
            </v-col>
            <v-col class="text-center" @click="onDetailQuestion(question._id)">
              <p id="total">0</p>
              <p id="total">answers</p>
            </v-col>
            <v-col class="text-center" @click="onDetailQuestion(question._id)">
              <p id="total">0</p>
              <p id="total">views</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          cols="9"
          d-flex
          flex-direction-column
          align-center
          class="text-left"
        >
          <h2 id="question-title" @click="onDetailQuestion(question._id)">
            {{ question.title }}
          </h2>
          <v-chip
            class="mr-2"
            v-for="(tag, index) in question.tags"
            :key="index"
            >{{ tag }}</v-chip
          >
        </v-col>
      </v-row>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "Question",
  methods: {
    onDetailQuestion(id) {
      this.$store.dispatch("question/fetchDetailQuestion", id);
      this.$router.push(`/question/${id}`);
    }
  },
  computed: {
    dataAllQuestion() {
      return this.$store.state.question.listQuestion;
    },
    detailQuestion() {
      return this.$store.state.question.detailQuestion;
    }
  },
  created() {
    this.$store.dispatch("question/fetchDetailQuestion", this.$route.params.id);
  }
};
</script>

<style scoped>
#total:hover {
  cursor: pointer;
}
#question-title:hover {
  cursor: pointer;
}
#upvote:hover {
  cursor: pointer;
}
#downvote:hover {
  cursor: pointer;
}
</style>
