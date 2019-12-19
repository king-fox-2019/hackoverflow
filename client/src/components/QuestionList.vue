<template>
  <div style="margin-top:  0px;">
    <q-card class="my-card" style="margin: 3px;" :class="{watch: watchTrue}" flat bordered>
      <q-card-section style="padding: 0px; height: 90px">
        <div class="row" style="width: 100%; padding: 20px">
          <div class="col-1 stat">
            <div
              style="margin:0; color: #757575;"
            >{{ question.upvotes.length - question.downvotes.length }}</div>
            <div style="color: #757575; font-size: 10px;">votes</div>
          </div>
          <div class="col-1 stat" v-if="(question.answer.length == 0)">
            <div style="margin:0; color: #757575;">{{question.answer.length}}</div>
            <div style="color: #757575; font-size: 10px;">answers</div>
          </div>
          <div class="col-1 stat" v-else style="border: 1px solid #5eba7d; border-radius: 3px;">
            <div style="margin:0;  color: #5eba7d; font-weight: 500;">{{question.answer.length}}</div>
            <div style=" color: #5eba7d; font-weight: 500; font-size: 10px;">answers</div>
          </div>
          <!-- <div class="col-1 stat" >
          <div>{{views}}</div>
          <div>views</div>
          </div>-->
          <div class="col-9" id="cardss" style="padding: 0px 10px; margin-left: 20px;">
            <div id="head" style="display: flex; justify-content: space-between;">
              <a style="width: 85%;" @click="toReadArticle">{{question.title}}</a>
              <a
                v-if="!userQuestion.status"
                class="author text-grey-8 q-gutter-xs"
              >author - {{question.user.username}}</a>
              <q-item-section top side v-if="userQuestion.status">
                <div class="text-grey-8 q-gutter-xs">
                  <DropdownQuestion :question="question"></DropdownQuestion>
                </div>
              </q-item-section>
            </div>
            <div id="foot">
              <div class="tags">
                <p
                  class="tag"
                  v-for="(tag, i) in question.tags"
                  :key="i"
                  @click="goDetailTag(tag)"
                >{{tag}}</p>
              </div>
              <div>
                <q-item-label class="q-mt-xs text-body2 text-primary">
                  <q-item-label
                    style="font-size: 10px; font-style: italic; margin-bottom: 5px;"
                    caption
                    lines="1"
                  >publish : {{question.createdAt.slice(0,10)}}</q-item-label>
                </q-item-label>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog
      position="top"
      v-model="notification"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-orange-6 text-white">
        <q-card-section>
          <div class="text-h6 text-center">{{ message.status }}</div>
        </q-card-section>

        <q-card-section>{{ message.content }}</q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DropdownQuestion from "../components/DropdownQuestion";
export default {
  name: "questionList",
  props: ["question"],
  components: {
    DropdownQuestion
  },
  data() {
    return {
      notification: false,
      message: {
        status: "",
        content: ""
      }
    };
  },
  methods: {
    toReadArticle() {
      this.$router.push(`question/${this.question._id}`);
    },
    goDetailTag(tag) {
      // console.log(tag);
      this.$q.loading.show();
      this.$store
        .dispatch("getFilteredQuestions", tag)
        .then(() => {
          this.$q.loading.hide();
          this.$emit("searchFromChild", tag);
        })
        .catch(err => {
          // console.log(err);
          this.notification = true;
          this.message = {
            status: "error",
            content: `${err}`
          };
        });
    }
  },
  created() {
    this.$store.dispatch("fetchUserData").then(user => {});
  },
  computed: {
    ...mapState(["userQuestion"]),
    watchTrue() {
      // console.log(this.$store.state.userData.tags);
      for (let tag of this.question.tags) {
        // console.log(
        //   tag,
        //   this.$store.state.userData.tags.includes(`${tag}` + " ")
        // );
        if (this.$store.state.userData.tags.includes(`${tag}` + " "))
          return true;
      }
    }
  }
};
</script>

<style scoped>
.stat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#foot {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#cardss {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
a {
  font-size: 12px;
  color: #0060b6;
  text-decoration: none;
}
a:hover {
  color: #00a0c6;
  text-decoration: none;
  cursor: pointer;
}
.basic {
  /* display: flex; */
  text-align: center;
  height: 60px;
}
.basicrow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.lem {
  margin: auto -3vh auto auto;
  width: 50px;
}
.author {
  font-size: 10px;
  color: grey;
  margin-bottom: 0px !important;
}
.card-question {
  display: flex;
  justify-content: space-between;
  height: 60px;
  max-width: 600px;
  align-items: center;
  justify-content: center;
  /* border-bottom: 1px solid #dbdcdc; */
}
.tags {
  display: flex;
}
.tag {
  color: #4c97d8;
  font-size: 9px;
  background-color: #e1ecf4;
  padding: 2px;
  padding-bottom: 0px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  margin-top: 2px;
  margin-bottom: 5px;
}
.watch {
  background-color: #fdf7e3;
}
</style>