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
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lilita+One&display=swap');
</style>
