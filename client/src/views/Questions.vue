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
  </div>
</template>

<script>
export default {
  name: 'Questions',
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
</style>
