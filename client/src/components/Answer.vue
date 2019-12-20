<template>
  <div class="answer">
    <h2>{{ dataAnswer.length }} Answers</h2>
    <v-row
      v-for="answer in dataAnswer"
      :key="answer._id"
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
          <v-col class="text-center align-center">
            <v-btn icon id="upvote" @click.prevent="upVoteAnswer(answer._id)">
              <v-icon>mdi-arrow-up-bold</v-icon>
            </v-btn>
            <p :style="color">
              {{ answer.upvote.length - answer.downvote.length }}
            </p>
            <v-btn icon id="downvote" @click="downVoteAnswer(answer._id)">
              <v-icon>mdi-arrow-down-bold</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="9"
        d-flex
        flex-direction-column
        class="text-left align-center"
      >
        <pre class="prettyprint" v-html="answer.desc"></pre>
        <v-btn style="margin-top:20px;" @click="deleteAnswer(answer._id)" icon>
          <v-icon color="red">mdi-delete</v-icon>delete
        </v-btn>
        <v-btn
          style="margin-left:15px; margin-top:20px;"
          @click="editAnswer(answer._id)"
          icon
        >
          <v-icon color="primary">mdi-playlist-edit</v-icon>edit
        </v-btn>
      </v-col>
    </v-row>
    <h4>Your Answer</h4>
    <v-form ref="formAnswer" @submit.prevent="postAnswer">
      <wysiwyg v-model="answer" />
      <v-btn depressed color="primary" type="submit" style="margin-top:10px;"
        >Post Your Answer</v-btn
      >
    </v-form>
  </div>
</template>

<script>
export default {
  name: "Answer",
  data() {
    return {
      color: "",
      answer: ""
    };
  },
  methods: {
    postAnswer() {
      let payload = {
        data: this.answer,
        id: this.$route.params.id
      };
      this.$store
        .dispatch("answer/postAnswer", payload)
        .then(data => {
          this.resetFormAnswer();
          this.answer = "";
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          this.resetFormAnswer();
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
    resetFormAnswer() {
      this.$refs.formAnswer.reset();
    },
    upVoteAnswer(id) {
      this.$store
        .dispatch("answer/upvote", id)
        .then(data => {
          this.$store.dispatch("question/fetchDetailQuestion", id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    downVoteAnswer(id) {
      this.$store
        .dispatch("answer/downvote", id)
        .then(data => {
          this.$store.dispatch("question/fetchDetailQuestion", id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteAnswer(id) {
      this.$store
        .dispatch("answer/deleteAnswer", id)
        .then(data => {
          this.$store.dispatch("question/fetchDetailQuestion", id);
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
    }
  },
  computed: {
    dataAnswer() {
      return this.$store.state.answer.listAnswer;
    },
    authorCrud() {
      if (this.$store.state.user.userInfo._id == this.detailAnswer.author) {
        return true;
      } else {
        return false;
      }
    },
    detailAnswer() {
      return this.$store.state.answer.detailAnswer;
    }
  },
  created() {
    // this.$store.dispatch("question/fetchDetailQuestion", id);
  }
};
</script>

<style scoped>
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
