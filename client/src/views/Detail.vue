<template>
  <div id="container">
    <h1>Question</h1>
    <br />
    <hr />
    <br />
    <div id="card" style="width:70%">
      <Card :data="item" />
      <hr />
    </div>
    <h1>Answer</h1>
    <br />
    <hr />
    <br />
    <div id="card" style="width:70%" v-for="(answer, index) in answers" :key="index">
      <AnswerCard :data="answer" />
      <hr />
    </div>
  </div>
</template>

<script>
import Card from "../components/Card";
import AnswerCard from '../components/AnswerCard';

export default {
  name: "detail",
  components: {
    Card,
    AnswerCard
  },
  created() {
    this.$store.dispatch("FetchOneQuestion", this.$route.params.id);
    this.$store.dispatch("FetchTheAnswer", this.$route.params.id)
  },
  computed: {
    item() {
      return this.$store.state.oneQuestion;
    },
    answers() {
      return this.$store.state.answerToOne;
    }
  },
  mounted(){
    console.log('this answers', this.answers);
  }
};
</script>

<style scoped>
#container {
  width: 100vw;
  margin-top: 5vh;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>