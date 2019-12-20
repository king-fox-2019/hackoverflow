<template>
  <div class="home">
    <v-container fluid class="px-5 py-5 mx-2 my-2">
      <v-row style="height:auto; background-color:white;" color="white">
        <v-col cols="2" style="border-right:0.4px solid rgba(0,0,0,0.5);">
          <v-flex d-flex flex-column justify-center>
            <v-btn depressed @click="testaje">home</v-btn>
            <v-btn depressed>Tag</v-btn>
          </v-flex>
        </v-col>

        <Question />
        <v-col cols="2" style="border-right:0.4px solid rgba(0,0,0,0.5);">
          <h1>Watch Tag</h1>
          <v-form @submit.prevent="addTag">
            <v-text-field label="tag" v-model="tag"></v-text-field>
          </v-form>
          <div
            style="display:flex; flex-direction:column; align-items:center; justify-content:center;"
            v-for="(tag,index) in getTagInfo"
            :key="index"
          >
            <v-chip @click="filterTag(tag)" color="primary" close="true">{{ tag }}</v-chip>
          </div>
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
  data() {
    return {
      tag: ""
    };
  },
  methods: {
    testaje() {
      console.log(this.$route);
      if (this.$route.path != "/") {
        this.$router.push("/");
      } else {
        this.$store.dispatch("question/fetchAllQuestion");
      }
    },
    filterTag(tag) {
      this.$store
        .dispatch("user/filterTag", tag)
        .then(data => {
          this.$store.commit("question/FETCH_ALL_QUESTION", data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTag() {
      this.$store
        .dispatch("user/addTag", this.tag)
        .then(data => {
          this.tag = "";
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          this.tag = "";
          let text = "";
          err.response.data.errors.forEach(element => {
            text += element + ", ";
          });
          this.$snotify.warning(`${text}`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        });
    },
    fetchAllQuestion() {
      this.$store.dispatch("question/fetchAllQuestion");
    }
  },
  computed: {
    getTagInfo() {
      return this.$store.state.user.userInfo.tag;
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("user/SET_USER_LOGIN", true);
      this.$store.dispatch("user/getUserInfo");
    }
    if (this.$route.path == "/") {
      this.fetchAllQuestion();
    } else if (this.$route.path == `/`) {
      this.fetchAllQuestion();
      this.$store.dispatch("question/fetchDetailQuestion");
      this.$store.dispatch("answer/fetchAnswer");
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
