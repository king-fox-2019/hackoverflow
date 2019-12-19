<template>
  <section id="default" class="mt-3">
    <div id="question">
      <h1>
        <strong>{{$store.state.currentQuestion.title}}</strong>
        <hr id="headerline">
      </h1>
      <div>
        <h1 id="h3">
          <div v-html="$store.state.currentQuestion.description"></div>
        </h1>
      </div>
    </div>
    <comment/>
  </section>
</template>

<script>
import comment from '@/components/comments.vue';

export default {
  data() {
    return {
      message: 'DETAIL',
    };
  },
  components: {
    comment,
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
#headerline {
  margin-top: 0;
  width: 30%;
  border: 1px dotted yellow;
  border-radius: 3rem;
}
strong {
  font-family: 'Rubik', sans-serif;
  color: yellow;
  display: flex;
  justify-content: center;
}
#h3 {
  font-size: 2rem;
  text-align: center;
  font-family: 'Josefin Sans', sans-serif;
  display: flex;
  justify-content: center;
}
#default {
  color: white;
  display: inline;
  justify-content: center;
}
#question {
  margin-top: 5%;
}
</style>
