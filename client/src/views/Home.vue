<template>
  <div class="home">
    <v-container fluid class="px-5 py-5 mx-2 my-2">
      <v-row style="height:auto; background-color:white;" color="white">
        <v-col cols="2" style="border-right:0.4px solid rgba(0,0,0,0.5);">
          <v-flex d-flex flex-column justify-center>
            <v-btn depressed to="/">home</v-btn>
            <v-btn depressed>public</v-btn>
          </v-flex>
        </v-col>

        <Question />
        <v-col cols="2" style="border-right:0.4px solid rgba(0,0,0,0.5);">
          <h1>Watch Tag</h1>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Question from "../components/Question.vue";

export default {
  name: "home",
  components: {
    Question
  },
  methods: {
    fetchAllQuestion() {
      this.$store.dispatch("question/fetchAllQuestion");
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("user/SET_USER_LOGIN", true);
    }
    if (this.$route.path == "/") {
      this.fetchAllQuestion();
    } else if (this.$route.path == `/question/${this.$route.params.id}`) {
      this.fetchAllQuestion();
      this.$store.dispatch("question/fetchDetailQuestion");
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
.home {
  font-family: "Roboto", sans-serif;
}
</style>
