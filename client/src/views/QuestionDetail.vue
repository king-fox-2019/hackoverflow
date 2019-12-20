<template>
  <div>
    <TopNavbar />
    <div class="d-flex mt-3">
      <div class="col-md-2"></div>    
      <div class="card mb-3 col-md-8 border-secondary">
        <div class="row no-gutters">
          <div class="col-md-3 text-center">
            <i class="fa fa-2x fa-arrow-circle-up" @click='upvote(question._id)'></i>
            <p>{{totalVote}}</p>
            <i class="fa fa-2x fa-arrow-circle-down" @click='downvote(question._id)'></i>
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">{{question.title}}</h5>
              <p class="card-title">{{question.description}}</p>
              <p class="card-title">Asked by {{question.UserId.username}}</p>
            </div>
          </div>
          <div class="col-md-2">
            <button v-if='owner' class="btn btn-primary mt-4 ml-3" data-toggle="modal" data-target="#editQuestion">Edit</button>
            <button v-if='owner' class="btn btn-danger mt-4 ml-3" @click='remove(question._id)'>Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary" v-if='isLogin' data-toggle="modal" data-target="#addAnswer">Answer this</button>
    </div>
    <AnswerCard v-for='(answer, index) in answers' :answer='answer' :key='index'/>
    <!-- Modal for answering-->
    <div class="modal fade" id="addAnswer" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">My Answer</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model='description' type="text" class="form-control" id="description" placeholder="Enter your answer"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click='submit'>Submit</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal for Edit -->
    <div class="modal fade" id="editQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit question</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model='editDescription' type="text" class="form-control" id="description" placeholder="Enter your answer"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click='submitEdit'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../helpers/axios.js'
import Swal from 'sweetalert2'
import TopNavbar from '@/components/TopNavbar.vue'
import AnswerCard from '@/components/AnswerCard.vue'
export default {

  name: 'QuestionDetail',
  components: {
    TopNavbar,
    AnswerCard
  },
  data () {
    return {
      description: '',
      descriptionEdit: ''
    }
  },
  created(){
    this.$store.dispatch('getQuestionDetail', this.$route.params.id)
    this.$store.dispatch('getAnswers', this.$route.params.id)
  },
  computed: {
    totalVote(){
      return this.$store.getters.voteCount
    },
    question(){
      return this.$store.getters.questionData
    },
    answers(){
      return this.$store.state.answers
    },
    isLogin(){
      return this.$store.state.username
    },
    owner(){
      return (this.$store.getters.questionData.UserId.username == this.isLogin)
    },
    editDescription:{
      get () {
        return this.$store.getters.questionData.description
      },
      set (val) {
        this.descriptionEdit = val            
      }
    }
  },
  methods: {
    submitEdit(){
      let token = localStorage.getItem('access_token')
      axios.patch(
        `/questions/${this.$route.params.id}`, 
        {
          description: this.descriptionEdit
        },
        {
          headers: {
            access_token: token
          }
        }
      )
        .then((data) => {
          this.$store.dispatch('getQuestionDetail', this.$route.params.id)
          this.$store.dispatch('getAnswers', this.$route.params.id)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    submit(){
      let token = localStorage.getItem('access_token')
      axios.post(
        `/answers/`, 
        {
          description: this.description,
          QuestionId: this.$route.params.id
        },
        {
          headers: {
            access_token: token
          }
        }
      )
        .then((data) => {
          this.$store.dispatch('getAnswers', this.$route.params.id)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    upvote(id){
      let token = localStorage.getItem('access_token')
      axios.post(
        `/questions/${id}`, 
        {
          vote: 'up'
        },
        {
          headers: {
            access_token: token
          }
        }
      )
        .then(() => {
          this.$store.dispatch('getQuestionDetail', this.$route.params.id)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    downvote(id){
      let token = localStorage.getItem('access_token')
      axios.post(
        `/questions/${id}`, 
        {
          vote: 'down'
        },
        {
          headers: {
            access_token: token
          }
        }
      )
        .then(() => {
          this.$store.dispatch('getQuestionDetail', this.$route.params.id)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    remove(id){
      let token = localStorage.getItem('access_token')
      axios.delete(
        `/questions/${id}`,
        {
          headers: {
            access_token: token
          }
        }
      )
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    }
  }
}
</script>

<style lang="css" scoped>
</style>