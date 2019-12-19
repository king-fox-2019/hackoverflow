<template>
  <v-col class="py-0" cols="8" style="border-right:0.4px solid rgba(0,0,0,0.5);">
    <v-row
      class="px-5 py-5"
      d-flex
      flex-direction-row
      style="border-bottom:0.4px solid rgba(0,0,0,0.5); border-top:none; border-left:none; border-right:none;"
    >
      <h1 v-if="$route.path == '/'">Top Question</h1>
      <h1 v-if="$route.params.id">{{ detailQuestion.title }}</h1>
      <v-spacer></v-spacer>
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
              <p
                style="margin-bottom:0px;"
              >{{ detailQuestion.upvote.length - detailQuestion.downvote.length }}</p>
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
        </v-col>
      </v-row>
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

export default {
  name: "Question",
  components: {
    DialogViews
  },
  data() {
    return {
      openViews: false
    };
  },
  methods: {
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
        .then(data => {})
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
    dataAllQuestion() {
      return this.$store.state.question.listQuestion;
    },
    detailQuestion() {
      return this.$store.state.question.detailQuestion;
    }
  },
  created() {
    this.$store.dispatch("question/fetchDetailQuestion", this.$route.params.id);
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
