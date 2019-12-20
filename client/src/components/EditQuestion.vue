<template>
  <div class="edit">
    <v-container fluid class="px-5 py-5">
      <v-row justify="center">
        <v-col cols="10" style="displey:flex; flex-direction:column;">
          <h1>Edit Question</h1>
          <v-form ref="formEdit" @submit.prevent="editQuestion">
            <div id="content-edit">
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
                  v-model="edit.title"
                />
              </v-col>
              <v-col>
                <h3>Body</h3>
                <p>
                  Include all the information someone would need to answer your
                  question
                </p>
                <wysiwyg v-model="edit.desc" />
              </v-col>
              <v-col>
                <h3>Tag</h3>
                <p>Add up to 5 tags to describe what your question is about</p>
                <v-text-field
                  label="e.g javascript mongodb c++"
                  name="tag"
                  type="text"
                  v-model="edit.tags"
                />
              </v-col>
            </div>
            <v-btn type="submit" class="mt-3" depressed color="primary"
              >Edit your question</v-btn
            >
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "EditQuestion",
  data() {
    return {
      edit: {
        title: "",
        desc: "",
        tags: ""
      }
    };
  },
  methods: {
    editQuestion() {
      let splitTags = this.edit.tags.split(" ");
      this.edit.tags = splitTags;
      let payload = {
        data: this.edit,
        id: this.$route.params.id
      };
      this.$store
        .dispatch("question/editQuestion", payload)
        .then(data => {
          this.$router.go(-1);
          this.$snotify.success(`Success update question`, {
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
    resetFormEdit() {
      this.$refs.formEdit.reset();
    }
  },
  created() {
    this.$store.dispatch("question/fetchDetailQuestion", this.$route.params.id);
    this.edit.title = this.$store.state.question.detailQuestion.title;
    this.edit.desc = this.$store.state.question.detailQuestion.desc;
    this.edit.tags = this.$store.state.question.detailQuestion.tags.join(" ");
  }
};
</script>

<style scoped>
#content-edit {
  margin-top: 30px;
  background-color: white;
}
</style>
