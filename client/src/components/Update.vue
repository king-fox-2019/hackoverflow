<template>
<div class="row bg-ask">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
  <div class="col mt-5">
    <h1>Update Questions</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-5 mt-4 form-ask">
        <div class="form-group">
          <span style="font-weight:bold;" class="d-flex justify-content-start ml-1 mt-3">Title</span>
          <span class="d-flex justify-content-start ml-1 font-detail"> Be specific and imagine you’re asking a question to another person </span>
          <input type="text" v-model="title"
            class="form-control input-placeholder" name="" id="" aria-describedby="helpId" placeholder="e.g. Is there an R function for finding the index of an element in a vector?">
          <span style="font-weight:bold;" class="d-flex justify-content-start ml-1 mt-3">Description</span>
          <span class="d-flex justify-content-start ml-1 font-detail">
            Include all the information someone would need to answer your question
          </span>
          <wysiwyg class="text-left" v-model="myHTML" />
          <hr>
          <div v-if="myHTML" v-html="myHTML"></div>
          <hr>
          <span style="font-weight:bold;" class="d-flex justify-content-start ml-1 mt-3">Tags</span>
          <span class="d-flex justify-content-start ml-1 font-detail"> Add up to 5 tags to describe what your question is about </span>
          <div class="input-group mb-2">
            <input type="text" class="form-control input-placeholder" v-model="tag" v-on:keyup.enter="addTag" id="inlineFormInputGroup" placeholder="e.g. (java c++ mongodb)">
            <div class="input-group-prepend">
              <div class="input-group-text tag-tag">
                Enter
                <i class="fas ml-2 fa-arrow-alt-circle-right"></i>
                </div>
            </div>
          </div>
          <div>
            <div class="d-flex justify-content-start">
              <span v-for="(tag,i) in myTags" :key="i" class="badge badge-success ml-1 mt-1">{{ tag }}
                <button type="button" class="btn btn-light p-0 px-1 ml-1" style="font-size:11px;" @click="deleteTag(i)">x</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
      <button type="button" class="btn btn-primary mt-3" @click="updated">Update your question</button>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../helpers/axios'
import { mapState } from 'vuex'
export default {
  name: 'update',
  data () {
    return {
      myHTML: this.$store.state.question.description,
      title: this.$store.state.question.title,
      tag: '',
      myTags: this.$store.state.question.tags
    }
  },
  created() {
      this.$store.dispatch('getQuestionShow',{ id: this.$route.params.id })
  },
  methods: {
    deleteTag (index) {
      let temp = []
      this.myTags.forEach((tag, i) => {
        if (Number(i) !== Number(index)) {
          temp.push(tag)
        }
      })
      this.myTags = temp
    },
    addTag () {
      let flag = true
      for (let i = 0; i < this.tag.length; i++) {
        if (this.tag[i] === ' ') {
          flag = false
        }
      }
      if (flag) {
        if (this.tag) {
          this.myTags.push(this.tag)
          this.tag = ''
        }
      } else {
        this.tag = ''
      }
    },
    updated(){
      Swal.showLoading()
      let form = {
        title: this.title,
        description: this.myHTML,
        tags: this.myTags
      }
      axios({
        url: `/question/${this.$route.params.id}/updated`,
        method: 'PUT',
        data: form,
        headers:{
          token: localStorage.getItem('token')
        }
      })
      .then(({ data })=>{
        Swal.close()
        console.log(data);
        Swal.fire({
          title: 'Updated Question Success!',
          icon: 'success',
          // imageWidth: 400,
          // imageHeight: 200,
          timer: 1200,
          timerProgressBar:true,
          imageAlt: 'Custom image',
          showConfirmButton: false,
          showCancelButton: false,
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا'
        })
        this.myHTML = ''
        this.title = ''
        this.tag = ''
        this.myTags = []
        this.$store.dispatch('getQuestionShow',{ id: data.question._id })
        this.$router.push('/questions/'+data.question._id)
      })
      .catch(error => {
        Swal.close()
        console.log(error.response.data)
        Swal.close()
        Swal.fire({
          title: 'Error!',
          text: error.response.data.errors.join(' | '),
          icon: 'error',
          // imageWidth: 400,
          // imageHeight: 200,
          timer: 2500,
          imageAlt: 'Custom image',
          showConfirmButton: false,
          showCancelButton: false,
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا'
        })
      })
    }
  },
  computed: mapState(['question'])
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

*{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.tag-tag{
  background-color: #0069D9;
  color: white;
}

.input-placeholder::placeholder{
  color: rgba(0, 0, 0, 0.329);
}

.font-detail{
  font-weight: lighter;
  font-style: italic;
  font-size: 12px;
  margin-top: -7px;
}
.form-ask{
  background-color: rgb(255, 255, 255);
}

.bg-ask{
  background-color: #EFF0F1;
  height: 94vh;
}
</style>
