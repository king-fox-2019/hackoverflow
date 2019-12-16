<template>
  <div class="home">
    <h1 class="animated tada">
      <strong id="texthe outline-darkader">{{message}}</strong>
    </h1>
    <hr>
    <section class="mt-5">
      <b-button style="width: 200px;" class="mr-3" variant="info">
        ASK
      </b-button>
      <b-button to="questions" style="width: 200px;" variant="info">
        Answer a question
      </b-button>
    </section>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      message: 'We <3 People Who Code.',
    };
  },
  components: {
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lilita+One&display=swap');

h1 {
  margin-top: 12%;
}
#textheader {
  font-family: 'Lilita One', cursive !important;
  font-size: 6rem;
  color: blueviolet;
  outline-color: black !important;
}
hr {
  color: red;
  margin-left: 30%;
  margin-right: 30%
}
</style>
