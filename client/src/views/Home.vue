<template>
  <div class="home container">
    <h1 style="color:orange;margin-top:6rem;margin-left:-15px">{{title}}</h1>
    <b-row class="text-center">
      <b-col style="padding:0px">
        <div v-if="!userLogin" class="border">Login to ask some question</div>
        <div class="border" v-if="userLogin">
          <ul class="list-unstyled">
            <div>
              <h6
                style="color:white;background-color:orange;margin:0px"
                class="p-2"
              >Hello, {{username}} !</h6>
            </div>
            <div class="p-2">
              <router-link
                to="/myquestion"
                style="text-decoration:none;color:orange"
              >See your question</router-link>
            </div>
            <hr style="margin:0px" />
            <div class="p-2">
              <router-link
                to="/addquestion"
                class="btn"
                style="background-color:orange;color:white"
                role="button"
              >Ask Question</router-link>
            </div>
          </ul>
        </div>
      </b-col>
      <b-col cols="10">
        <Questions v-if="currentRoute==='/'" />
        <router-view />
      </b-col>
    </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import Questions from "../components/Questions";

export default {
  name: "home",
  components: {
    Questions
  },
  computed: {
    ...mapState(["questions", "username", "userLogin"]),
    currentRoute() {
      return this.$route.path;
    },
    title() {
      const title = this.$route.path;
      switch (title) {
        case "/":
          return "All Question";
          break;
        case "/myquestion":
          return "My Question";
          break;
        case "/addquestion":
          return "Post Question";
          break;

        default:
          return "Question #" + this.$route.params.id;
          break;
      }
    }
  },
  watch: {
    currentRoute(newRoute) {
      this.$store.dispatch("fetchAllQuestion");
    }
  },
  created() {
    this.$store.dispatch("fetchAllQuestion");
    if (this.userLogin) {
      this.$store.dispatch("getCurrentUser");
    }
  }
};
</script>
