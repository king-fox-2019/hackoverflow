<template>
  <b-card bg-variant="dark" text-variant="white" :title="data.title">
    <b-card-text>
      {{data.userId.fullname}}
    </b-card-text>
    <b-button href="#" variant="primary">Details</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'question',
  props: ['data'],
  data() {
    return {
      message: 'Hello world',
    };
  },
};
</script>

<style scoped>
</style>
