<template>
  <q-layout view="lHh LpR fFf">
    <q-drawer show-if-above v-model="left" side="left" bordered class="side">
      <br />
      <br />
      <br />

      <div class="q-pa-md" style="max-width: 450px; padding-bottom: 0;">
        <span
          style="margin-bottom: 0px; padding-bottom: 0px;"
          class="text-h5 text-weight-bold"
        >#ontrending</span>
        <div />
        <small class="navvv" style="font-weight: 400; font-size: 11px">(see questions in public)</small>
        <q-list bordered separator style="padding: 5px 20px 10px 20px;">
          <div class="tags">
            <div>
              <span>
                <q-badge
                  v-for="(tag, i) in trendingTags"
                  :key="i"
                  class="trendingtag"
                  @click.prevent="getQuestions(tag._id)"
                  style="margin-right: 10px; cursor: pointer;"
                >#{{ tag._id }}</q-badge>
              </span>
            </div>
          </div>
        </q-list>
      </div>
      <div class="q-pa-md" style="max-width:450px" v-if="!isLogin">
        <q-list separator>
          <q-item clickable v-ripple @click.prevent="fetchQuest">
            <q-item-section avatar>
              <img src="../assets/internet.png" alt="internet" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="navvv">PUBLIC</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="q-pa-md" style="max-width:450px" v-if="isLogin">
        <q-list separator>
          <q-item clickable v-ripple @click.prevent="fetchQuest">
            <q-item-section avatar>
              <img src="../assets/internet.png" alt="internet" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="navvv">PUBLIC</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="fetchUserQuestion">
            <q-item-section avatar>
              <q-icon color="warning" name="textsms" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="navvv">YOUR QUESTION</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="seeAnswer">
            <q-item-section avatar>
              <q-icon color="lime-10" name="question_answer" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="navvv">YOUR ANSWER</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- <br /> -->
        <!-- {{user}} -->
        <div class="test" />
        <div style=" margin: 10px auto; width: 200px;">
          <form @submit.prevent="addUserTag">
            <div class="form-group">
              <span class="navvv" for="tags">Add Watched Tags</span>
              <vue-tags-input v-model="tag" :tags="tags" @tags-changed="newTags => tags = newTags" />
            </div>
            <div type="submit" style="cursor: pointer" @click.prevent="addUserTag">
              <i class="far fa-plus-square"></i>
            </div>
          </form>
          <div style="border-bottom: 1px solid lightgray; margin: 10px auto;" />
          <div>
            <div class="separatebetween">
              <span class="navvv">Watched Tags</span>
              <span v-if="editTag" @click.prevent="changeToDone" class="navvv editz">done</span>
              <span v-else @click.prevent="changeToEdit" class="navvv editz">edit</span>
            </div>
            <!-- {{user}} -->
            <div class="tags">
              <div>
                <span v-if="editTag">
                  <q-badge
                    v-for="(tag, i) in this.$store.state.userData.tags"
                    :key="i"
                    class="tag"
                    @click.prevent="removeTag(tag)"
                    style="margin-right: 10px; cursor: pointer;"
                  >
                    {{ tag }}
                    <q-icon name="close" color="red" class="q-ml-xs" />
                  </q-badge>
                </span>
                <span v-else>
                  <q-badge
                    v-for="(tag, i) in this.$store.state.userData.tags"
                    :key="i"
                    class="tag"
                    @click.prevent="getQuestions(tag)"
                    style="margin-right: 10px; cursor: pointer;"
                  >{{ tag }}</q-badge>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container style="margin-left: 90px; !important">
      <div
        class="q-pa-md q-gutter-md"
        style="max-width: 700px"
        v-if="!userQuestion.status && !isAnswer"
      >
        <div class="ask">
          <p style="font-size:15px" class="navvv">ALL QUESTION</p>
          <q-btn
            class="gt-xs"
            unelevated
            outlined
            no-caps
            color="orange-6"
            v-if="isLogin"
            @click="toQuestionForm"
          >Ask Question</q-btn>
        </div>
        <q-list>
          <QuestionList
            v-for="(question, index) in filteredQuestions"
            :key="index"
            :question="question"
          ></QuestionList>
        </q-list>
      </div>

      <div class="q-pa-md q-gutter-md" style v-if="userQuestion.status && !isAnswer">
        <div class="ask">
          <p style="font-size:15px" class="navvv">YOUR QUESTION</p>
          <q-btn
            class="gt-xs"
            unelevated
            outlined
            no-caps
            color="teal-4"
            v-if="isLogin"
            @click="toQuestionForm"
          >Ask Another Question</q-btn>
        </div>
        <q-list style="max-width: 700px">
          <QuestionList
            v-for="(question, index) in userQuestion.data"
            :key="index"
            :question="question"
          ></QuestionList>
        </q-list>
      </div>

      <div v-if="isAnswer" class="ans">
        <AnswerList></AnswerList>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";
import QuestionList from "../components/QuestionList";
import AnswerList from "../components/AnswerList";
import Axios from "../../config/server";
import Swal from "sweetalert2";

import { mapState } from "vuex";

export default {
  name: "home",
  data() {
    return {
      left: this.$store.state.left,
      tag: "",
      tags: [],
      editTag: false
    };
  },
  components: {
    QuestionList,

    AnswerList,
    VueTagsInput
  },
  methods: {
    changeToEdit() {
      this.editTag = true;
    },
    changeToDone() {
      this.editTag = false;
    },
    fetchQuest() {
      this.$q.loading.show();
      this.$store.dispatch("fetchQuestion").then(data => {
        this.$store.commit("FETCHQ");
        this.$q.loading.hide();
      });
    },
    seeAnswer() {
      this.$q.loading.show();
      this.$store.dispatch("fetchAnswerUser").then(data => {
        this.$q.loading.hide();
      });
    },
    fetchUserQuestion() {
      this.$q.loading.show();
      this.$store
        .dispatch("fetchUserQuestion")
        .then(data => {
          this.$q.loading.hide();
        })
        .catch(err => {});
    },
    toQuestionForm() {
      this.$router.push("/questionForm");
    },
    getQuestions(tag) {
      this.$store.dispatch("getFilteredQuestions", tag);
    },
    addUserTag() {
      let tagTemp = [];
      for (let i = 0; i < this.tags.length; i++) {
        tagTemp.push(this.tags[i].text);
      }
      // console.log(localStorage.getItem("token"));
      Axios({
        url: `/user`,
        method: "PATCH",
        data: {
          tags: tagTemp
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.tags = [];
          Swal.fire({
            icon: "success",
            title: "Tag(s) added",
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("fetchUserData");
        })
        .catch(err => {
          // console.log(err);
          Swal.fire("Errors", `Internal server error`, `error`);
        });
    },
    removeTag(tag) {
      // console.log(localStorage.getItem("token"));
      Axios({
        url: `/user/removeTag`,
        method: "PATCH",
        data: {
          tags: tag
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$store.dispatch("fetchUserData");
        })
        .catch(err => {
          console.log(err);
          Swal.fire("Errors", `Internal server error`, `error`);
        });
    }
  },

  created() {
    this.$store.dispatch("fetchTrendingTag");
    this.$store.dispatch("fetchQuestion");
    this.$store.dispatch("auth");
    if (localStorage.getItem("token")) {
      this.$store.dispatch("fetchUserData");
    } else {
    }
  },
  computed: {
    ...mapState([
      "questions",
      "userQuestion",
      "trendingTags",
      "isLogin",
      "isAnswer",
      "search"
    ]),
    user: {
      set() {
        this.$store.dispatch("fetchUserData");
      },
      get() {
        return this.$store.state.userData;
      }
    },
    filteredQuestions: function() {
      console.log(this.questions);
      return this.questions.filter(question => {
        let tagsFlag = false;
        question.tags.forEach(tag => {
          if (tag == null) tagsFlag = false;
          else if (tag.match(this.search)) tagsFlag = true;
        });
        return question.title.match(this.search) || tagsFlag;
      });
    }
  },
  watched: {
    "$store.state.userData": function() {
      if (localStorage.getItem("token")) {
        this.$store.dispatch("fetchUserData");
      } else {
      }
    }
  }
};
</script>

<style scoped>
.navvv {
  font-size: 12px;
  font-weight: bolder;
  letter-spacing: 0.12em;
}
.ask {
  width: 700px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #dbdcdc;
}
.container {
  width: 250px;
  height: 100%;
  position: fixed;
  text-align: left;
  padding: 30px 50px 30px 70px;
}
.ans {
  width: 100%;
}
img {
  height: 20px;
}
.test {
  border-bottom: 2px solid lightgray !important;
  margin: 20px auto;
  color: lightgray !important;
  background-color: lightgray !important;
}
.tags {
  display: flex;
  flex-wrap: wrap;
}
.tag {
  color: #000;
  font-size: 10px;
  background-color: #cee0ed;
  padding: 3px;
  padding-bottom: 2px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  margin-top: 2px;
  margin-bottom: 5px;
}
.trendingtag {
  color: #000;
  font-size: 11px;
  background-color: gold;
  padding: 3px;
  padding-bottom: 2px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  margin-top: 2px;
  margin-bottom: 5px;
}
.separatebetween {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.editz {
  width: 40px;
  text-align: right;
  cursor: pointer;
  color: darkorange;
  /* border: 1px solid black;
  border-radius: 12px; */
  padding: 0px 5px;
}
</style>