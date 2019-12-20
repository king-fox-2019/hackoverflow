<template>
  <b-container
    class="my-4 text-left"
    style="width: 65%">
    <h2 align="left" class="mb-4">Ask a Question</h2>
    <b-form-group
      @submit.prevent="onSubmit"
      align="left"
      id="fieldset-horizontal"
      label="Title"
      label-for="input-horizontal"
    >
      <b-form-input
        v-model="content.title"
        id="question-title">
      </b-form-input>
    </b-form-group>

    <wysiwyg v-model="content.description"/>
    <b-button
      @click.prevent="onSubmit"
      block
      class="my-2"
      type="submit"
      variant="primary"
    >Submit
    </b-button>
  </b-container>

</template>

<script>
export default {
  name: 'Ask',
  data () {
    return {
      content: {
        title: '',
        description: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('askQuestion', this.content)
      this.content.title = ''
      this.content.description = ''
    }
  }

}
</script>

<style>

</style>
