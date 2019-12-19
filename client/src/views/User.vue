<template>
<div class="container">
  <div class="row">
    <div class="col-lg-6">
      <div class="box">
        <h1>New account</h1>
        <p class="lead">Not registered yet?</p>
        <p class="text-muted">
          If you have any questions, please feel free to
          <a href="#">contact us</a>, our customer service center is working for you 24/7.
        </p>
        <hr />
        <form action="" method="post" @submit.prevent="register">
          <div class="form-group">
            <label for="emailRegister">Email</label>
            <input required autofocus id="emailRegister" type="text" class="form-control" v-model="registerEmail"/>
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input required autofocus id="username" type="text" class="form-control" v-model="registerUsername"/>
          </div>
          <div class="form-group">
            <label for="image">Profil Picture: </label>
            <input autofocus id="image" type="text" class="form-control" v-model="registerImage"/>
          </div>
          <div class="form-group">
            <label for="tags">watched tags:</label>
            <input placeholder="separated by space: vue javascript node.js" autofocus id="tags" type="text" class="form-control" v-model="registerTags"/>
          </div>
          <div class="form-group">
            <label for="passwordRegister">Password</label>
            <input required id="passwordRegister" type="password" class="form-control" v-model="registerPassword"/>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input required id="confirmPassword" type="password" class="form-control" v-model="confirmPassword"/>
          </div>
          <div class="form-group justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="box">
        <h1>Login</h1>
        <p class="lead">Already our comunity?</p>
        <hr />
        <form action="" @submit.prevent="setLogin" method="post">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" type="text" class="form-control" v-model="email"/>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" type="password" class="form-control" v-model="password"/>
          </div>
          <div class="form-group justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">Log In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from '../config/api'
export default {
  name: 'User',
  data: function () {
    return {
      email: '',
      password: '',
      registerEmail: '',
      registerUsername: '',
      registerPassword: '',
      confirmPassword: '',
      registerTags: '',
      registerImage: ''
    }
  },
  methods: {
    setLogin () {
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store
        .dispatch('login', payload)
        .then(() => {
          this.email = ''
          this.password = ''
          this.$router.push('/')
        })
        .catch(({ response }) => {
          this.$swal.fire(
            'Access Denied',
            'wrong email or password',
            'error'
          )
        })
    },
    register: function () {
      if (this.confirmPassword !== this.registerPassword) {
        return this.$swal.fire(
          'Access Denied',
          'confirm password',
          'error'
        )
      } else {
        axios({
          method: 'POST',
          url: `/user/register`,
          data: {
            email: this.registerEmail,
            username: this.registerUsername,
            password: this.registerPassword,
            image: this.registerImage,
            tags: this.registerTags.split(' ')
          }
        })
          .then(({ data }) => {
            this.registerEmail = ''
            this.registerUsername = ''
            this.confirmPassword = ''
            this.registerPassword = ''
            this.$swal.fire(
              'welcome',
              'please login',
              'success'
            )
          })
          .catch(() => {
            this.$swal.fire(
              'Access Denied',
              'wrong email or password',
              'error'
            )
          })
      }
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 80px
}
</style>
