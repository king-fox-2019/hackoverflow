<template>
  <section id="questions">
    <b-container id="container" class="mt-5">
      <section class="question animated fadeInLeft" id="questionslist">
        <h1>
          <router-link to="/questions">
            <strong class="mt-3">Questions</strong>
          </router-link>
          <hr id="headerline">
        </h1>
        <question v-for="question in $store.state.questions"
        :key="question._id"
        :question="question"
        class="animated fadeInDown delay-1s"/>
      </section>
      <section class="question ml-5 animated fadeInRight delay-1s" id="questiondetails">
        <router-view/>
      </section>
    </b-container>
  </section>
</template>

<script>
import question from '@/components/question.vue';

export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
  methods: {
  },
  components: {
    question,
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Rubik&display=swap');
#headerline {
  margin-top: 0;
  width: 30%;
  border: 1px dotted yellow;
  border-radius: 3rem;
}
#questiondetails {
  width: 90%;
  overflow-y: scroll;
}
strong {
  text-shadow: 2px 2px red;
  font-family: 'Rubik', sans-serif;
  color: yellow;
  display: flex;
  justify-content: center;
}
#questionslist{
  width: 40%;
  overflow-y: scroll;
}
#questionslist::-webkit-scrollbar {
  display: none;
}
#questiondetails::-webkit-scrollbar {
  display: none;
}
.question {
  margin-top: 0;
  margin-right: 0;
  border: 4px solid grey;
  height: 31rem;
  border-radius: 2rem;
}
#header {
  margin-left: 3%;
  background-color: #343a40;
  color: yellow;
  margin-bottom: 0 !important;
}
#container {
  display: flex;
}
</style>
