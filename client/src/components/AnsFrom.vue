<template>
  <div class="container">
    <div class="notification has-background-white">
      <form @submit.prevent="createAnswer">
        <div style="font-size: 25px; margin-bottom: 10px;">Your Answer</div>
        <wysiwyg v-model="description" />
        <button class="button is-info">Post Your Answer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswerForm',
  data () {
    return {
      description: ''
    }
  },
  methods: {
    createAnswer () {
      this.$store.dispatch('createAnswer', {
        description: this.description,
        questionId: this.$route.params.id
      })
    }
  }
}
</script>

<style scoped>
.notification {
  text-align: left;
}
.button {
  margin-top: 10px;
}
.has-image-centered {
  margin-left: auto;
  margin-right: auto;
}
</style>
