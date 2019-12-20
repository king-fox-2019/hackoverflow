<template>
  <div class="container mt-3 ask-form d-flex align-items-center justify-content-center">
    <div class="form-wrap w-100 p-2 ">
        <div class="container">
        <h1 class="display-4">Ask Public Question</h1>
        </div>
        <div class="container">
            <form @submit.prevent="askQuestion">
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
import Toast from '@/plugins/swal.js'
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
      this.$router.push('/')
    },
    askQuestion () {
      let arr = this.tags.split(' ')
      let payload = {
        title: this.title,
        desc: this.myHTML,
        tags: arr
      }
      this.$store.dispatch('question/createQuestion', payload)
        .then(({ data }) => {
          this.$store.commit('question/SET_LIST_QUESTION', data)
          Toast.fire({
            icon: 'success',
            title: 'Create Question',
            text: 'Success Create Question!'
          })
          this.$router.push('/')
        })
        .catch(err => {
          Toast.fire({
            icon: 'error',
            title: 'Create Question',
            text: `${err.response.data.message}`
          })
        })
    }
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
