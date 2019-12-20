<template>
  <div>
      <div class="d-flex flex-column container mt-3">
          <div class="top text-left">
              <div class="container pl-2">
                <div class="d-flex justify-content-between">
                    <h2>{{ question.title }}</h2>
                    <div v-if="question.author._id == userId">
                        <button class="btn-sm btn-success mr-2" @click.prevent="editQuestion(question._id)">Edit</button>
                        <button class="btn-sm btn-danger" @click.prevent="deleteQuestion(question._id)">Delete</button>
                    </div>
                </div>
                <div class="d-flex">
                    <img :src="question.author.avatar" alt="" class="avatar">
                    <p class="ml-2">{{ question.author.username }}</p>
                </div>
                <p>{{ getFormatTime(question.createdAt) }}</p>
              </div>
              <div class="container mt-2 d-flex">
                <div class="d-flex flex-column text-center util justify-content-start">
                    <p class="vote" @click.prevent="upvoteQuestion(question._id)"><i class="fas fa-chevron-up"></i></p>
                    <p>{{ question.upvote.length - question.downvote.length || 0 }}</p>
                    <p class="vote" @click.prevent="downvoteQuestion(question._id)"><i class="fas fa-chevron-down"></i></p>
                </div>
                <div class="d-flex desc">
                    <div v-html="question.desc"></div>
                </div>
              </div>
              <Answer></Answer>
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import Answer from '../components/Answer.vue'
import Toast from '../plugins/swal'
import Swal from 'sweetalert2'
export default {
  data () {
    return {

    }
  },
  components: {
    Answer
  },
  methods: {
    getFormatTime (val) {
      return moment(val).format('LL')
    },
    upvoteQuestion (id) {
      this.$store.dispatch('question/upvoteQuestion', id)
    },
    downvoteQuestion (id) {
      this.$store.dispatch('question/downvoteQuestion', id)
    },
    editQuestion (id) {
      this.$router.push(`/edit/${id}`)
    },
    deleteQuestion (id) {
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
          this.$store.dispatch('question/deleteQuestion', id)
            .then(({ data }) => {
              Toast.fire({
                icon: 'success',
                title: 'Delete Question',
                text: 'Delete Success!'
              })
              this.$router.push('/')
            })
            .catch(err => {
              Toast.fire({
                icon: 'error',
                title: 'Delete Question',
                text: `${err.response.data.message}`
              })
            })
        }
      })
    }
  },
  computed: {
    question () {
      return this.$store.state.question.currentQuestion
    },
    answer () {
      return this.$store.state.answer.currentAnswer
    },
    userId () {
      return this.$store.state.user.currentUserId
    },
    params () {
      return this.$route.params.answerId
    }
  },
  created () {
    let id = this.$route.params.id
    this.$store.dispatch('question/detailQuestion', id)
    this.$store.dispatch('answer/getQuestionAnswer', id)
  },
  watch: {
    params (val) {
      if (val !== '' || val === undefined) {
        this.$store.dispatch('answer/getAnswer', val)
          .then(({ data }) => {
            console.log(data)
            this.$store.commit('answer/SET_SOLE_ANSWER', data)
          })
      }
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
}

.vote{
    cursor: pointer;
}

</style>
