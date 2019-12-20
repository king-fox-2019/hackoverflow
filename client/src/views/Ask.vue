<template>
  <div class="ask">
    <v-container fluid class="px-5 py-5">
      <v-row justify="center">
        <v-col cols="10" style="displey:flex; flex-direction:column;">
          <h1>Ask a public question</h1>
          <v-form ref="formAsk" @submit.prevent="createQuestion">
            <div id="content-ask">
              <v-col>
                <h3>Title</h3>
                <p>
                  Be specific and imagine you’re asking a question to another
                  person
                </p>
                <v-text-field
                  label="e.g is there an R function for finding the index of an element in a vector?"
                  name="title"
                  type="text"
                  v-model="ask.title"
                />
              </v-col>
              <v-col>
                <h3>Body</h3>
                <p>
                  Include all the information someone would need to answer your
                  question
                </p>
                <wysiwyg v-model="ask.desc" />
              </v-col>
              <v-col>
                <h3>Tag</h3>
                <p>Add up to 5 tags to describe what your question is about</p>
                <v-text-field
                  label="e.g javascript mongodb c++"
                  name="tag"
                  type="text"
                  v-model="ask.tags"
                />
              </v-col>
            </div>
            <v-btn type="submit" class="mt-3" depressed color="primary"
              >Review your question</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Ask",
  data() {
    return {
      ask: {
        title: "",
        desc: "",
        tags: ""
      }
    };
  },
  methods: {
    createQuestion() {
      let newTags = this.ask.tags.split(" ");
      this.ask.tags = newTags;
      this.$store
        .dispatch("question/createQuestion", this.ask)
        .then(data => {
          this.$router.push("/");
          this.resetFormAsk();
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          this.resetFormAsk();
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
    resetFormAsk() {
      this.$refs.formAsk.reset();
    }
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
#content-ask {
  margin-top: 30px;
  background-color: white;
}
</style>
