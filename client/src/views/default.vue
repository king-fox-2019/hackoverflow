<template>
  <section id="default" class="mt-3">
    <div id="center">
      <h1>
        <strong>{{message}}</strong>
        <hr id="headerline">
      </h1>
      <div>
        <h1 id="h3">We build products that empower developers and
          connect them to solutions that enable
          productivity, growth, and discovery.</h1>
      </div>
    </div>
  </section>
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
@import url('https://fonts.googleapis.com/css?family=PT+Sans+Narrow&display=swap');
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
  text-align: center;
  font-family: 'PT Sans Narrow', sans-serif;
  display: flex;
  justify-content: center;
}
#default {
  color: white;
  display: inline;
  justify-content: center;
}
#center {
  margin-top: 18%;
}
</style>
