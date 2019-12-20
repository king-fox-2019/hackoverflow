<template>
  <div class="d-flex mt-3">
    <div class="col-md-2"></div>    
    <div class="card mb-3 col-md-8">
      <div class="row no-gutters">
        <div class="col-md-3 text-center">
            <i class="fa fa-2x fa-arrow-circle-up" @click='upvote(answer._id)'></i>
            <p>{{answer.upvotes.length - answer.downvotes.length}}</p>
            <i class="fa fa-2x fa-arrow-circle-down" @click='downvote(answer._id)'></i>
          </div>
        <div class="col-md-7">
          <div class="card-body">
            <p class="card-title">{{answer.description}}</p>
            <p class="card-title">Answered by {{answer.UserId.username}}</p>
          </div>
        </div>
        <div class="col-md-2">
            <button v-if='owner' class="btn btn-primary mt-2 ml-3" data-toggle="modal" :data-target="'#editAnswer'+answer._id">Edit</button>
            <button v-if='owner' class="btn btn-danger mt-3 ml-3" @click='remove(answer._id)'>Delete</button>
          </div>
      </div>
    </div>
    <!-- Modal for Edit -->
    <div class="modal fade" :id="'editAnswer'+answer._id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit answer</h5>
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
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click='submitEdit(answer._id)'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../helpers/axios'
export default {

  name: 'AnswerCard',
  props: ['answer'],
  data () {
    return {
      submitDescription: ''
    }
  },
  computed: {
    isLogin(){
      return this.$store.state.username
    },
    owner(){
      return (this.answer.UserId.username == this.isLogin)
    },
    editDescription:{
      get () {
        return this.answer.description
      },
      set (val) {
        this.submitDescription = val            
      }
    }
  },
  methods: {
    submitEdit(id){
      let token = localStorage.getItem('access_token')
      axios.patch(
        `/answers/${id}`, 
        {
          description: this.submitDescription
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
        `/answers/${id}`, 
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
          this.$store.dispatch('getAnswers', this.$route.params.id)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    downvote(id){
      let token = localStorage.getItem('access_token')
      axios.post(
        `/answers/${id}`, 
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
          this.$store.dispatch('getAnswers', this.$route.params.id)
        })
        .catch((err) => {
          Swal.fire(err.response.data.message)
        })
    },
    remove(id){
      let token = localStorage.getItem('access_token')
      axios.delete(
        `/answers/${id}`,
        {
          headers: {
            access_token: token
          }
        }
      )
        .then(() => {
          this.$store.dispatch('getAnswers', this.$route.params.id)
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