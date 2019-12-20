<template>
  <v-col class="py-0" cols="8" style="border-right:0.4px solid rgba(0,0,0,0.5);">
    <v-row
      class="px-5 py-5"
      d-flex
      flex-direction-row
      style="border-bottom:0.4px solid rgba(0,0,0,0.5); border-top:none; border-left:none; border-right:none;"
    >
      <h1 v-if="$route.path == '/'">Top Question</h1>
      <div style="display:flex; flex-direction:column;">
        <h1 v-if="$route.params.id">{{ detailQuestion.title }}</h1>
        <p v-if="$route.params.id">by: {{ detailQuestion.author.username }}</p>
      </div>

      <v-spacer></v-spacer>
      <v-text-field
        v-if="$route.path == '/'"
        v-model="search"
        label="search"
        style="width:10px; margin-right:50px;"
      >
        <v-input style="width:10px;"></v-input>
      </v-text-field>
      <v-btn depressed color="primary" @click="$router.push('/ask')">ask question</v-btn>
    </v-row>
    <!--  -->
    <div class="detailQuestion" v-if="$route.params.id">
      <v-row
        class="px-1 py-auto"
        d-flex
        flex-row
        style="border-bottom:0.4px solid rgba(0,0,0,0.5);"
      >
        <v-col cols="3" d-flex flex-direction-row style="display:flex; align-items:center;">
          <v-row class="py-auto">
            <v-col class="text-center align-center">
              <v-btn icon id="upvote" @click="upVote">
                <v-icon>mdi-arrow-up-bold</v-icon>
              </v-btn>
              <p :style="color">
                {{
                detailQuestion.upvote.length - detailQuestion.downvote.length
                }}
              </p>
              <v-btn icon id="downvote" @click="downVote">
                <v-icon>mdi-arrow-down-bold</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="9" d-flex flex-direction-column class="text-left align-center">
          <pre class="prettyprint" v-html="detailQuestion.desc"></pre>
          <v-chip
            color="primary"
            class="mr-2"
            v-for="(tag, index) in detailQuestion.tags"
            :key="index"
          >{{ tag }}</v-chip>
          <v-spacer></v-spacer>
          <v-btn
            v-if="authorCrud"
            style="margin-top:20px;"
            @click="deleteQuestion(detailQuestion._id)"
            icon
          >
            <v-icon color="red">mdi-delete</v-icon>delete
          </v-btn>
          <v-btn
            v-if="authorCrud"
            style="margin-left:15px; margin-top:20px;"
            @click="editQuestion(detailQuestion._id)"
            icon
          >
            <v-icon color="primary">mdi-playlist-edit</v-icon>edit
          </v-btn>
        </v-col>
      </v-row>

      <Answer />
    </div>

    <div
      class="allQuestion"
      v-if="$route.path == '/'"
      style="display:flex; flex-direction:column-reverse;"
    >
      <v-row
        v-for="question in dataAllQuestion"
        :key="question._id"
        class="px-1 py-auto"
        d-flex
        flex-row
        style="border-bottom:0.4px solid rgba(0,0,0,0.5);"
      >
        <v-col cols="3" d-flex flex-direction-row style="display:flex; align-items:center;">
          <v-row class="py-auto">
            <v-col class="text-center" @click="onDetailQuestion(question._id)">
              <p id="total">{{ question.upvote.length - question.downvote.length }}</p>
              <p id="total">votes</p>
            </v-col>
            <v-col class="text-center" @click="onDetailQuestion(question._id)">
              <p id="total">0</p>
              <p id="total">answers</p>
            </v-col>
            <v-col class="text-center" @click="fetchViews(question._id)">
              <p id="total">{{ question.views.length }}</p>
              <p id="total">views</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="9" d-flex flex-direction-column align-center class="text-left">
          <h2 id="question-title" @click="onDetailQuestion(question._id)">{{ question.title }}</h2>
          <v-chip class="mr-2" v-for="(tag, index) in question.tags" :key="index">{{ tag }}</v-chip>
        </v-col>
      </v-row>
    </div>
    <DialogViews :openviews="openViews" @close-views="openViews = $event" />
  </v-col>
</template>

<script>
import DialogViews from "../components/DialogViews.vue";
import Answer from "../components/Answer.vue";

export default {
  name: "Question",
  components: {
    DialogViews,
    Answer
  },
  data() {
    return {
      openViews: false,
      search: "",
      style: "",
      color: ""
    };
  },
  methods: {
    editQuestion(id) {
      this.$store
        .dispatch("question/fetchDetailQuestion", id)
        .then(data => {
          this.$router.push(`/editquestion/${id}`);
        })
        .catch(err => {
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
    deleteQuestion(id) {
      this.$store
        .dispatch("question/deleteQuestion", id)
        .then(data => {
          this.$router.push("/");
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
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
    fetchViews(id) {
      this.$store
        .dispatch("question/fetchDetailQuestion", id)
        .then(data => {
          this.openViews = true;
        })
        .catch(err => {
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
    onDetailQuestion(id) {
      this.$store
        .dispatch("question/fetchDetailQuestion", id)
        .then(data => {
          this.$store.dispatch("answer/fetchAnswer", id);
        })
        .catch(err => {
          this.$router.push("/sign/login");
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
      this.$router.push(`/question/${id}`);
    },
    upVote() {
      this.$store.dispatch("question/upvote", this.$route.params.id);
    },
    downVote() {
      this.$store.dispatch("question/downvote", this.$route.params.id);
    }
  },
  computed: {
    // dataAllQuestion() {
    //   return this.$store.state.question.listQuestion;
    // },
    authorCrud() {
      if (this.$store.state.user.userInfo._id == this.detailQuestion.author) {
        return true;
      } else {
        return false;
      }
    },
    totalVote() {
      let votes =
        this.detailQuestion.upvote.length - this.detailQuestion.downvote.length;
      if (votes < 0) {
        this.color = "color:red;";
        return votes;
      } else if (votes > 0) {
        this.color = "color:green;";
        return votes;
      } else if (votes == 0) {
        this.color = "color:black;";
        return votes;
      }
    },
    detailQuestion() {
      return this.$store.state.question.detailQuestion;
    },
    dataAllQuestion() {
      if (this.search) {
        return this.$store.state.question.listQuestion.filter(question => {
          return question.title
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      } else {
        return this.$store.state.question.listQuestion;
      }
    }
  },
  created() {
    this.$store.dispatch("question/fetchDetailQuestion", this.$route.params.id);
    this.$store.dispatch("answer/fetchAnswer", this.$route.params.id);
    this.$store.dispatch("answer/fetchDetailAnswer", this.$route.params.id);
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next("/sign/login");
    }
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
#upvote {
}
#upvote:hover {
  cursor: pointer;
}
#downvote:hover {
  cursor: pointer;
}
.prettyprint {
  display: block;
  color: #393318;
}
pre {
  margin-bottom: 1em;
  padding: 12px 8px;
  width: auto;
  max-height: 600px;
  overflow: auto;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace,
    sans-serif;
  font-size: 13px;
  background-color: #eff0f1;
  border-radius: 3px;
}
</style>
