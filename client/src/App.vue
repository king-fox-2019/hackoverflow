<template>
  <div id="app">
    <div id="nav">
      <navbar/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue';

export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
  components: {
    navbar,
  },
  created() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('logged', true);
    } else {
      this.$store.dispatch('logged', false);
    }
    this.$store.dispatch('fetchQuestions');
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lilita+One&display=swap');
</style>
