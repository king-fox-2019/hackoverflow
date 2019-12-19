<template>
  <nav class="navbar navbar-dark bg-dark">
    <router-link to='/' class="navbar-brand">HackOverflow</router-link>
    <div id="navbarNav">
      <div class="navbar-nav">
        <div class="nav-item">
          <button v-if='username' class="btn btn-light ml-auto mr-3" data-toggle="modal" data-target="#addQuestion">Ask a Question</button>
          <div v-if='username' class="btn btn-light mr-3">{{username}}</div>
          <button v-if='username' class="btn btn-light" @click='logout'>Logout</button>
          <button v-if='!username' class="btn btn-light" data-toggle="modal" data-target="#login">Login</button>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="addQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ask a Question</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="title">Title</label>
                <input v-model='title' type="text" class="form-control" id="title" placeholder="Enter question title">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea v-model='description' type="text" class="form-control" id="description" placeholder="Enter question description"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click='submit'>Submit</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Login Modal -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if='login' class="modal-title" id="exampleModalLabel">Login</h5>
            <h5 v-if='!login' class="modal-title" id="exampleModalLabel">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="username">Username</label>
                <input v-model='identity.username' type="text" class="form-control" id="username" placeholder="Enter username">
              </div>
              <div v-if='!login' class="form-group">
                <label for="email">Email</label>
                <input v-model='identity.email' type="text" class="form-control" id="email" placeholder="Enter email">
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input v-model='identity.password' type="password" class="form-control" id="password" placeholder="Enter password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary mr-auto" v-if='login' @click='login = false'>I want to register</button>
            <button class="btn btn-secondary mr-auto" v-if='!login' @click='login = true'>I want to login</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click='submitLogin'>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from '../helpers/axios.js'
import Swal from 'sweetalert2'
export default {

  name: 'TopNavbar',

  data () {
    return {
      title: '',
      description: '',
      identity: {
        username: '',
        email: '',
        password: ''
      },
      login: true
    }
  },
  computed: {
    username(){
      return this.$store.state.username
    }
  },
  methods: {
    logout(){
      this.$store.commit('logout')
      localStorage.removeItem('access_token')
      this.identity.username = ''
      this.identity.email = ''
      this.identity.password = ''
      this.$router.push('/')
    },
    submit(){
      let token = localStorage.getItem('access_token')
      axios.post(
        '/questions',
        {
          title: this.title,
          description: this.description
        },
        {
          headers: {
            access_token: token
          }
        },
      )
        .then((response) => {
          this.$store.dispatch('getAllQuestion')
          this.$router.push('/')
        })
        .catch((err) => {
          Swal.fire(err.response.data)
        })
    },
    submitLogin(){
      if (this.login){
        this.$store.dispatch('login', this.identity)
      }
      else {
        this.$store.dispatch('register', this.identity)
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>