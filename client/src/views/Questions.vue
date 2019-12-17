<template>
  <div>
    <b-jumbotron bg-variant="info" text-variant="white" border-variant="dark">
      <template v-slot:header>Hackoverflow</template>
      <template v-slot:lead>
        We build products that empower developers and connect
        them to solutions that enable productivity, growth, and discovery.
      </template>
      <hr class="my-4">
    </b-jumbotron>
    {{questions}}
    <h1 id="title">Questions: </h1>
    <question v-for="question in questions"
    :data="question"
    :key="question._id"/>
  </div>
</template>

<script>
import question from '@/components/question.vue';

export default {
  name: 'Questions',
  data() {
    return {
      message: 'Hello world',
      questions: this.$store.state.questions,
    };
  },
  components: {
    question,
  },
};
</script>

<style scoped>

#title{
  display: flex;
  justify-content: start;
  margin-left: 3%;
}
</style>
