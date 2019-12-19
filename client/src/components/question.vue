<template>
  <div>
    <h1 @click.prevent="toDetail(id)">{{questionTitle}}</h1>
    <p>
      <i>Author: {{author}}</i>
    </p>
    <p>Votes: {{totalVote}}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data(){
    return{
      totalVote:0
    }
  },
  props:['id','questionTitle','author','votes'],
  computed: {
    ...mapState({ question: "question/question" })
  },
  methods: {
    ...mapActions({ getAllQuestion: "question/getAllQuestion" }),
    toDetail(questionId){
      this.$router.push({path:'/question/'+questionId})
    }
  },
  created() {
    this.getAllQuestion();
    this.totalVote = this.votes.reduce((a, item) => a += item.vote ,0)
    // this.questions = this.$store.state.question
  }
};
</script>

<style scoped>
h1 {
  padding-bottom: 20px;
  transition: 0.3s;
}
h1:hover {
  cursor: pointer;
  color: rgb(78, 78, 85);
  transition: 0.3s;
}
.question {
  border-top: 5px double rgba(0, 0, 0, 0.3);
  border-bottom: 5px double rgba(0, 0, 0, 0.3);
  width: 100%;
  padding: 10px 0;
}
</style>