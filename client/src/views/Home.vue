<template>
  <div>
    <div class="animated fadeInUp">
      <section id="header">
        <h1>
          <strong id="textheader">{{message}}</strong>
          <hr>
        </h1>
      </section>
      <section id="routes">
        <b-button id="button" v-show="$store.state.logged" size="lg"
        style="width: 15%">ASK</b-button>
        <b-button id="button" size="lg" to="questions" >ANSWER QUESTION</b-button>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'We <3 people who ask',
    };
  },
};
</script>

<style scoped>
hr {
  border: 1px solid yellow;
  width: 30%;
  border-radius: 3rem;
}
#textheader {
  margin-top: 12.5%;
  font-size: 5rem;
  color: orange;
  display: flex;
  justify-content: center;
  font-family: 'Lilita One', cursive;
  text-shadow: 3px 3px green;
}
#button {
  margin: 1rem !important;
}
#routes {
  display: flex;
  justify-content: center;
}
</style>
