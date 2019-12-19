<template>
  <div class="container-fluid">
    <div class="d-flex flex-column container form-wrap justify-content-center align-items-center">
      <div class="w-50">
        <h1 class="text-center">{{ form_title }}</h1>
        <b-form @submit="formSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Your name"
            label-for="input-1"
            v-if="router === 'register'"
          >
          <b-input-group>
            <b-input-group-append>
              <button class="btn btn-primary"><i class="fas fa-user"></i></button>
            </b-input-group-append>
            <b-form-input
              id="input-1"
              v-model="name"
              type="text"
              required
              placeholder="Enter username"
            ></b-form-input>
          </b-input-group>
          </b-form-group>

          <b-form-group id="input-group-2" label="Email address" label-for="input-2">
            <b-input-group>
              <b-input-group-append>
                <button class="btn btn-primary"><i class="fas fa-envelope"></i></button>
              </b-input-group-append>
              <b-form-input
                id="input-2"
                v-model="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group id="input-group-3" label="Password:" label-for="input-3">
            <b-input-group>
              <b-input-group-append>
                <button class="btn btn-primary"><i class="fas fa-lock"></i></button>
              </b-input-group-append>
              <b-form-input
                id="input-3"
                v-model="password"
                type="password"
                placeholder="Password"
                required
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <div class="d-flex align-content-center">
            <div class="">
              <b-button type="submit" variant="success" class="mr-2">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
            </div>
            <div class="d-flex justify-content-start ml-2 h-100 w-50">
              <a href="" class="have-account mt-2" v-if="router === 'register'" @click.prevent="goLogin"><p>Already have account ?</p></a>
              <a href="" class="have-account mt-2" v-else-if="router === 'login'" @click.prevent="goRegister"><p>Dont have account?</p></a>
            </div>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>

import toast from '@/plugins/swal.js'

export default {
  name: 'userFrom',
  data () {
    return {
      email: '',
      name: '',
      password: '',
      food: null,
      checked: [],
      show: true,
      form_title: ''
    }
  },
  methods: {
    formSubmit (evt) {
      evt.preventDefault()
      if (this.$route.params.form === 'login') {
        let payload = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('user/userLogin', payload)
          .then(({ data }) => {
            this.$router.push('/')
            localStorage.setItem('token', data.token)
            this.$store.commit('user/SET_IS_LOGIN', true)
            this.$store.commit('user/SET_ID', data.user._id)
            this.onReset()
            toast.fire({
              icon: 'success',
              title: 'Login',
              text: `Welcome ${data.user.username} !`
            })
          })
          .catch(err => {
            toast.fire({
              icon: 'error',
              title: 'Login',
              text: `${err.response.data.message}`
            })
          })
      } else {
        let payload = {
          username: this.name,
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('user/userRegister', payload)
          .then(({ data }) => {
            toast.fire({
              icon: 'success',
              title: 'Register',
              text: `Register ${data.username} success !`
            })
            this.$router.push('/login')
            this.onReset()
          })
          .catch(err => {
            toast.fire({
              icon: 'error',
              title: 'Register',
              text: `${err.response.data.message}`
            })
          })
      }
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    goRegister () {
      this.$router.push('/register')
    },
    goLogin () {
      this.$router.push('/login')
    }
  },
  computed: {
    router () {
      return this.$route.params.form
    }
  },
  watch: {
    router (val) {
      if (val === 'login') {
        this.form_title = 'Login'
      } else {
        this.form_title = 'Register'
      }
    }
  },
  created () {
    let param = this.$route.params.form
    if (param === 'login') {
      this.form_title = 'Login'
    } else {
      this.form_title = 'Register'
    }
  }
}
</script>

<style scoped>
.form-wrap{
  height: calc(100vh - 58px)
}

.have-account{
  text-decoration: none;
}
</style>
