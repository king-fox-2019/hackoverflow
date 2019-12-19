<template>
  <div>
    <b-card v-for="(question,index) in questions" :key="index" class="rounded-0">
      <b-media>
        <b-row class="text-center">
          <b-col>
            <div>
              <span style="font-size:40px">{{votes[index]}}</span>
            </div>
            <div>
              <small>votes</small>
            </div>
          </b-col>
          <b-col>
            <div>
              <span style="font-size:40px">{{question.answers.length}}</span>
            </div>
            <div>
              <small>answers</small>
            </div>
          </b-col>
          <b-col cols="10">
            <div class="d-flex" style="flex-direction:column">
              <a
                href
                @click.prevent="goToDetailQuestion(question._id)"
                style="text-decoration:none;color:black"
              >
                <h5 class="mt-0" style="text-align:left;width:100%">{{question.title}}</h5>
              </a>
              <div style="text-align:right;align-items:end">
                <div style="text-align:left">
                  <span>
                    <i class="fa fa-user-circle"></i>
                    {{question.author.name}}
                  </span>
                  <span style="margin-left:30px">
                    <i class="fa fa-calendar-alt"></i>
                    {{createdAt[index]}}
                  </span>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-media>
    </b-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";

export default {
  methods: {
    goToDetailQuestion(id) {
      this.$router.push(`/detail/${id}`);
    }
  },
  computed: {
    createdAt() {
      const createdAt = {};
      const questions = this.questions;
      questions.forEach((question, index) => {
        createdAt[index] = moment(question.createdAt).format("ll");
      });
      return createdAt;
    },
    ...mapState(["questions"]),
    votes() {
      const votes = [];
      const questions = this.questions;
      questions.forEach(question => {
        votes.push(question.upvotes.length - question.downvotes.length);
      });
      return votes;
    }
  }
};
</script>

<style>
.card-body {
  padding: 5px !important;
}
</style>