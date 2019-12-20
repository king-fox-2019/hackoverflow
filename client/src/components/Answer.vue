<template>
  <div>
    <div>
        <h4>Answer</h4>
        <hr>
        <h5>Total {{ answer.length || 0 }} Answer</h5>
    </div>
    <div>
        <div class="container mt-2 d-flex" v-for="(data,index) in answer" :key="index">
            <div class="d-flex w-100 container p-2">
                <div class="d-flex flex-column text-center util justify-content-start">
                    <p class="vote" @click.prevent="upvoteAnswer(data._id)"><i class="fas fa-chevron-up"></i></p>
                    <p>{{ data.upvote.length - data.downvote.length || 0 }}</p>
                    <p class="vote" @click.prevent="downvoteAnswer(data._id)"><i class="fas fa-chevron-down"></i></p>
                </div>
                <div class="d-flex flex-column desc justify-content-center p-2">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex">
                        <img :src="data.author.avatar" alt="" class="mr-2 avatar">
                        <p class="mr-2">{{data.author.username}}, </p>
                        <p>{{ getFormatData(data.createdAt) }}</p>
                        </div>
                        <div v-if="data.author._id === userId">
                            <buttton class="btn-sm btn-success edit mr-2" @click.prevent="editAnswer(data._id)">Edit</buttton>
                            <buttton class="btn-sm btn-danger delete" @click.prevent="deleteAnswer(data._id)">Delete</buttton>
                        </div>
                    </div>
                    <div class="container">
                        <div v-html="data.desc"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <wysiwyg v-model="newAnswer"></wysiwyg>
    <button class="btn-sm btn-primary my-2" @click.prevent="addAnswer">Submit</button>
  </div>
</template>

<script>
import Toast from '../plugins/swal'
import moment from 'moment'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      newAnswer: ''
    }
  },
  methods: {
    addAnswer () {
      let answerId = this.$route.params.answerId
      if (answerId) {
        let editPayload = {
          desc: this.newAnswer,
          id: answerId
        }
        this.$store.dispatch('answer/editAnswer', editPayload)
          .then(({ data }) => {
            let questionId = this.$route.params.id
            this.$store.dispatch('answer/getQuestionAnswer', questionId)
            this.newAnswer = ''
            this.$router.push(`/detail/${questionId}`)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        let payload = {
          desc: this.newAnswer,
          questionId: this.$route.params.id
        }
        this.$store.dispatch('answer/createAnswer', payload)
          .then(({ data }) => {
            Toast.fire({
              icon: 'success',
              title: 'Create Answer',
              text: 'Submit answer success!'
            })
            this.newAnswer = ''
            let questionId = this.$route.params.id
            this.$store.dispatch('answer/getQuestionAnswer', questionId)
          })
          .catch(err => {
            Toast.fire({
              icon: 'error',
              title: 'Create Answer',
              text: `${err.response.data.message}`
            })
          })
      }
    },
    getFormatData (val) {
      return moment(val).format('LL')
    },
    editAnswer (id) {
      let questionId = this.$route.params.id
      this.$router.push(`/detail/${questionId}/${id}`)
    },
    deleteAnswer (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('answer/deleteAnswer', id)
            .then(({ data }) => {
              Toast.fire({
                icon: 'success',
                title: 'Delete Answer',
                text: 'Delete Success!'
              })
              let questionId = this.$route.params.id
              this.$store.dispatch('answer/getQuestionAnswer', questionId)
            })
            .catch(err => {
              Toast.fire({
                icon: 'error',
                title: 'Delete Answer',
                text: `${err.response.data.message}`
              })
            })
        }
      })
    },
    upvoteAnswer (id) {
      let payload = {
        questionId: this.$route.params.id,
        answerId: id
      }
      this.$store.dispatch('answer/upvoteAnswer', payload)
    },
    downvoteAnswer (id) {
      let payload = {
        questionId: this.$route.params.id,
        answerId: id
      }
      this.$store.dispatch('answer/downvoteAnswer', payload)
    }
  },
  computed: {
    answer () {
      return this.$store.state.answer.currentAnswer
    },
    userId () {
      return this.$store.state.user.currentUserId
    },
    getSoleAnswer () {
      return this.$store.state.answer.soleAnswer
    }
  },
  watch: {
    getSoleAnswer (val) {
      this.newAnswer = val.desc
    }
  }
}
</script>

<style scoped>
.avatar{
    width: 25px;
    height: 25px;
    border-radius: 50%;
}

.util{
    width: 10%;
}

.desc{
    width: 90%;
    background-color: rgb(250, 250, 250);
    border-top: 2px solid orangered;
}

.vote{
    cursor: pointer;
}

.edit{
  cursor: pointer;
}

.delete{
  cursor: pointer;
}
</style>
