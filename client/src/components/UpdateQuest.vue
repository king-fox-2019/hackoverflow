<template>
  <div class="container">
      <form @submit.prevent="updateQuestion">
        <wysiwyg v-model="description" />
        <button class="button is-info">Save Edits</button>
      </form>
  </div>
</template>

<script>

export default {
  name: 'QuestionForm',
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    updateQuestion () {
      this.$store.dispatch('updateQuestion', {
        id: this.$route.params.id,
        title: this.title,
        description: this.description
      })
    },
    getQuestion () {
      this.$store.dispatch('getQuestion')
    }
  },
  watch: {
    '$route.params.id' () {
      this.getQuestion()
    }
  },
  created () {
    this.getQuestion()
  }
}
</script>

<style scoped>
.container {
  max-width: 700px;
  padding-top: 50px;
}
.notification {
  margin: 10px;
  text-align: left;
}
.button {
  margin-top: 10px;
  float: right;
}
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
</style>
