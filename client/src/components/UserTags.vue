<template>
  <b-badge @click.prevent="getQuestions(UserTag)" href="#" variant="warning" style="margin-right: 10px;">{{ UserTag }}</b-badge>
</template>

<script>
export default {
  name: 'UserTags',
  props: ['UserTag'],
  methods: {
    getQuestions (tag) {
      this.$store.dispatch('getFilteredQuestions', tag)
    }
  }
}
</script>

<style>

</style>
