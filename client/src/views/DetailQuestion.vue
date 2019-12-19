<template>
  <div>
    <div v-if="currentQuestion._id" style="text-align:left">
      <span>
        <i class="fa fa-user-circle"></i>
        {{currentQuestion.author.name}}
      </span>
      <span style="margin-left:30px">
        <i class="fa fa-calendar-alt"></i>
        {{createdAt}}
      </span>
    </div>
    <div>
      <div style="text-align:justify">
        <b-media>
          <div v-if="editComponentRender">
            <div class="form-group">
              <input
                v-model="newTitle"
                type="text"
                class="form-control pl-2 pr-2 rounded-0"
                placeholder="Title"
                style="background-color:transparent;border:0px;border-left:3px solid orange;box-shadow:none;border-bottom:0px;font-size:30px"
              />
            </div>
            <div class="pl-2" style="border-left:3px solid orange;font-size:30px;text-align:left">
              <vue-editor placeholder="Description" v-model="newDescription"></vue-editor>
            </div>
            <div class="pt-2 d-flex justify-content-start pl-0">
              <a
                @click.prevent="editQuestion"
                class="btn rounded-0"
                style="background-color:orange;color:white"
                role="button"
              >Edit Question</a>
              <a
                @click.prevent="renderWysiwyg(false)"
                class="btn rounded-0 ml-2"
                style="background-color:orange;color:white"
                role="button"
              >Cancel</a>
            </div>
          </div>
          <b-media-body v-if="!editComponentRender">
            <div>
              <h3
                class="mt-3 pl-2"
                style="text-align:left;border-left:3px solid orange"
              >{{currentQuestion.title}}</h3>
            </div>
            <div
              v-html="currentQuestion.description"
              class="pl-2"
              style="text-align:left;border-left:3px solid orange"
            ></div>
            <div v-if="currentQuestion._id" class="pt-2 d-flex justify-content-start pl-0">
              <div
                class="btn rounded-0"
                style="background-color:white;color:orange;border:3px solid orange"
              >{{currentQuestion.answers.length + " Answers"}}</div>
              <b-input-group-append class="ml-2">
                <div
                  @click.prevent="upvoteQuestion"
                  class="btn rounded-0"
                  style="background-color:orange;color:white;border:3px solid orange"
                >
                  <i class="fa fa-chevron-up"></i>
                </div>
              </b-input-group-append>
              <div
                class="btn rounded-0"
                style="background-color:white;color:orange;border:3px solid orange"
              >{{votes + " Votes"}}</div>
              <b-input-group-append>
                <div
                  @click.prevent="downvoteQuestion"
                  class="btn rounded-0"
                  style="background-color:orange;color:white;border:3px solid orange"
                >
                  <i class="fa fa-chevron-down"></i>
                </div>
              </b-input-group-append>
              <div
                v-if="currentQuestion.author._id == userId"
                @click.prevent="renderWysiwyg(true)"
                class="btn rounded-0 ml-2"
                style="background-color:orange;color:white;border:3px solid orange"
              >Edit Question</div>
              <div
                v-if="currentQuestion.author._id == userId"
                @click.prevent="deleteQuestion"
                class="btn rounded-0 ml-2"
                style="background-color:orange;color:white;border:3px solid orange"
              >Delete Question</div>
            </div>
          </b-media-body>
          <hr />
          <b-media
            v-for="(answer,index) in currentQuestion.answers"
            :key="index"
            style="margin-left:6rem"
          >
            <div>
              <h5
                class="mt-3 pl-2"
                style="text-align:left;border-left:3px solid orange"
              >{{answer.title}}</h5>
            </div>
            <div
              v-html="answer.description"
              class="pl-2"
              style="text-align:left;border-left:3px solid orange"
            ></div>
            <div v-if="currentQuestion._id" class="pt-2 d-flex justify-content-start pl-0">
              <b-input-group-append>
                <div
                  @click.prevent="upvoteAnswer(answer._id)"
                  class="btn rounded-0"
                  style="background-color:orange;color:white;border:3px solid orange"
                >
                  <i class="fa fa-chevron-up"></i>
                </div>
              </b-input-group-append>
              <div
                class="btn rounded-0"
                style="background-color:white;color:orange;border:3px solid orange;width:7.5rem"
              >{{`${(answer.upvotes.length - answer.downvotes.length)} Votes` }}</div>
              <b-input-group-append>
                <div
                  @click.prevent="downvoteAnswer(answer._id)"
                  class="btn rounded-0"
                  style="background-color:orange;color:white;border:3px solid orange"
                >
                  <i class="fa fa-chevron-down"></i>
                </div>
              </b-input-group-append>
              <div
                v-if="currentQuestion._id"
                style="width:100%"
                class="d-flex justify-content-end align-items-center"
              >
                <span>
                  <i class="fa fa-user-circle"></i>
                  {{answer.author.name}}
                </span>
                <span style="margin-left:30px">
                  <i class="fa fa-calendar-alt"></i>
                  {{createdAt}}
                </span>
              </div>
            </div>
            <hr v-if="index != currentQuestion.answers.length -1" style="width:100%" />
          </b-media>
        </b-media>
      </div>
    </div>
    <div v-if="currentQuestion._id">
      <hr v-if="currentQuestion.answers.length>0" />
    </div>
    <div v-if="userLogin">
      <h4 class="pl-2" style="border-left:3px solid orange;text-align:left">Post answer</h4>
      <div class="form-group">
        <input
          v-model="title"
          type="text"
          class="form-control pl-2 pr-2 rounded-0"
          placeholder="Title"
          style="background-color:transparent;border:0px;border-left:3px solid orange;box-shadow:none;border-bottom:0px"
        />
      </div>
      <div class="pl-2" style="border-left:3px solid orange;font-size:30px;text-align:left">
        <vue-editor placeholder="Description" v-model="description"></vue-editor>
      </div>
      <div class="pt-2 d-flex justify-content-start pl-0">
        <a
          @click.prevent="postAnswer"
          class="btn rounded-0"
          style="background-color:orange;color:white"
          role="button"
        >Post Answer</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { VueEditor } from "vue2-editor";
import moment from "moment";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      title: "",
      description: "",
      editComponentRender: false,
      newTitle: "",
      newDescription: ""
    };
  },
  methods: {
    deleteQuestion() {
      const id = this.$route.params.id;
      const payload = {
        id
      };
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!"
      }).then(result => {
        if (result.value) {
          this.$store
            .dispatch("deleteQuestion", payload)
            .then(({ data }) => {
              Swal.fire(
                "Success!",
                "Your question has been deleted.",
                "success"
              );
              if (!this.userLogin) {
                this.$router.push("/signin");
              }
              this.$store.dispatch("fetchUserQuestion");
              this.$router.push("/");
            })
            .catch(err => {
              Swal.fire("Oops!", err.response.data.message, "error");
            });
        }
      });
    },
    editQuestion() {
      const payload = {
        title: this.newTitle,
        description: this.newDescription,
        id: this.$route.params.id
      };
      this.$store
        .dispatch("editQuestion", payload)
        .then(() => {
          const id = this.$route.params.id;
          const payload = {
            id
          };
          this.$store.dispatch("fetchQuestionById", payload);
          Swal.fire(
            "Success!",
            "You have successfully edit your post",
            "success"
          );
          this.renderWysiwyg(false);
        })
        .catch(err => {
          Swal.fire("Oops!", err.response.data.message, "error");
        });
    },
    renderWysiwyg(newValue) {
      this.editComponentRender = newValue;
      (this.newTitle = this.currentQuestion.title),
        (this.newDescription = this.currentQuestion.description);
    },
    checkLogin() {
      if (!this.userLogin) {
        Swal.fire("Oops!", "You must login first", "error");
      }
    },
    upvoteQuestion() {
      const id = this.$route.params.id;
      const payload = {
        id
      };
      this.checkLogin();
      this.$store.dispatch("upvoteQuestion", payload).then(({ data }) => {
        const id = this.$route.params.id;
        const payload = {
          id
        };
        this.$store.dispatch("fetchQuestionById", payload);
      });
    },
    downvoteQuestion() {
      const id = this.$route.params.id;
      const payload = {
        id
      };
      this.checkLogin();
      this.$store.dispatch("downvoteQuestion", payload).then(({ data }) => {
        const id = this.$route.params.id;
        const payload = {
          id
        };
        this.$store.dispatch("fetchQuestionById", payload);
      });
    },
    upvoteAnswer(id) {
      const payload = {
        id
      };
      this.checkLogin();
      this.$store.dispatch("upvoteAnswer", payload).then(({ data }) => {
        const id = this.$route.params.id;
        const payload = {
          id
        };
        this.$store.dispatch("fetchQuestionById", payload);
      });
    },
    downvoteAnswer(id) {
      const payload = {
        id
      };
      this.checkLogin();
      this.$store.dispatch("downvoteAnswer", payload).then(({ data }) => {
        const id = this.$route.params.id;
        const payload = {
          id
        };
        this.$store.dispatch("fetchQuestionById", payload);
      });
    },
    postAnswer() {
      const question = this.$route.params.id;
      const payload = {
        question,
        title: this.title,
        description: this.description
      };
      this.$store
        .dispatch("postAnswer", payload)
        .then(({ data }) => {
          const id = this.$route.params.id;
          const payload = {
            id
          };
          this.$store.dispatch("fetchQuestionById", payload);
          Swal.fire(
            "Success!",
            "You have successfully post your answer",
            "success"
          );
          this.title = "";
          this.description = "";
        })
        .catch(err => {
          let errorMessage = "";
          if (err.response.status === 400) {
            const errors = err.response.data.message;
            errors.forEach(error => {
              errorMessage += error + "\n";
            });
            Swal.fire("Oops!", errorMessage, "error");
          } else Swal.fire("Oops!", err.response.data.message, "error");
        });
    }
  },
  computed: {
    ...mapState(["currentQuestion", "userLogin", "userId"]),
    votes() {
      let votes;
      const question = this.currentQuestion;
      votes = question.upvotes.length - question.downvotes.length;
      return votes;
    },
    createdAt() {
      return moment(this.currentQuestion.createdAt).format("ll");
    }
  },
  created() {
    const id = this.$route.params.id;
    const payload = {
      id
    };
    this.$store.dispatch("fetchQuestionById", payload);
  },
  components: {
    VueEditor
  }
};
</script>

<style>
.card-body {
  padding: 5px !important;
}
</style>