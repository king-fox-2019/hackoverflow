<template>
  <div class="container mt-3 ask-form d-flex align-items-center justify-content-center">
    <div class="form-wrap w-100 p-2 ">
        <div class="container">
        <h1 class="display-4">Edit Your Question</h1>
        </div>
        <div class="container">
            <form @submit.prevent="editQuestion">
                <div class="form-group">
                    <label for="titleInput">Title</label>
                    <small id="titleHelp" class="form-text text-muted">Be specific and imagine you’re asking a question to another person</small>
                    <input type="text" class="form-control" id="title" aria-describedby="titleHelp" placeholder="e.g Is there an R function for finding the index of an element in a vector?" v-model="title">
                </div>
                <div class="form-group">
                    <label for="body">Body</label>
                    <small id="titleHelp" class="form-text text-muted">Include all the information someone would need to answer your question</small>
                    <wysiwyg v-model="myHTML"></wysiwyg>
                </div>
                <div class="form-group">
                    <label for="tagsInput">Tags</label>
                    <small id="tagsHelp" class="form-text text-muted">Add up to 5 tags to describe what your question is about</small>
                    <input type="text" class="form-control" id="tags" aria-describedby="titleHelp" placeholder="e.g java<space>c++<space>mongodb<space>javascript" v-model="tags">
                </div>
                <button type="Submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-danger ml-3" @click="cancel">Cancel</button>
            </form>
        </div>
    </div>
  </div>
</template>

<script>
import Toast from '../plugins/swal'
export default {
  data () {
    return {
      title: '',
      myHTML: '',
      tags: ''
    }
  },
  methods: {
    cancel () {
      let questionId = this.$route.params.id
      this.$router.push(`/detail/${questionId}`)
    },
    editQuestion () {
      let questionId = this.$route.params.id
      let newTags = this.tags.split(' ')
      let form = {
        title: this.title,
        desc: this.myHTML,
        tags: newTags
      }
      let payload = {
        id: questionId,
        data: form
      }
      this.$store.dispatch('question/editQuestion', payload)
        .then(({ data }) => {
          let questionId = this.$route.params.id
          Toast.fire({
            icon: 'success',
            title: 'Edit Question',
            text: 'Edit Success!'
          })
          this.$router.push(`/detail/${questionId}`)
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: 'Edit Question',
            text: `${err.response.data.message}`
          })
        })
    }
  },
  created () {
    let questionId = this.$route.params.id
    this.$store.dispatch('question/detailQuestion', questionId)
    let question = this.$store.state.question.currentQuestion
    this.title = question.title
    this.myHTML = question.desc
    this.tags = question.tags
  },
  computed: {
  }
}
</script>

<style scoped>
.ask-form{
    height: calc(100vh - 80px);
}

.form-wrap{
    height: 90%;
    -webkit-box-shadow: 7px 3px 28px 6px rgba(227,220,227,1);
    -moz-box-shadow: 7px 3px 28px 6px rgba(227,220,227,1);
    box-shadow: 7px 3px 28px 6px rgba(227,220,227,1);
}
</style>
