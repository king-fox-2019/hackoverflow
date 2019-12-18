<template>
  <b-container fluid>
    <b-row align-h="center">
      <b-col class="text-center my-5" cols="12">
        <h1>{{ isSignUp ? 'Sign Up' : 'Sign In' }}</h1>
      </b-col>
      <b-col lg="4" md="6" sm="8">
        <b-form @submit.prevent="onSubmit" novalidate>
          <b-form-group
            :description="isSignUp ? 'Must be valid email address' : ''"
          >
            <b-form-input
              v-model="email"
              type="email"
              :state.sync="validateEmail"
              required
              placeholder="Email"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :description="isSignUp ? 'Must be at least 6 characters' : ''"
          >
            <b-form-input
              type="password"
              v-model="password"
              :state.sync="validatePassword"
              required
              placeholder="Password"
            ></b-form-input>
          </b-form-group>

          <div
            class="d-flex flex-wrap align-items-center justify-content-between"
          >
            <b-button type="submit" variant="primary">{{
              isSignUp ? 'Sign Up' : 'Sign In'
            }}</b-button>
            <small class="text-muted" v-if="isSignUp"
              >Already have an account?
              <router-link :to="`/session?&on=signin`"
                >Sign In</router-link
              ></small
            >
            <small class="text-muted" v-else
              >Don't have an account?
              <router-link :to="`/session?&on=signup`"
                >Sign Up</router-link
              ></small
            >
          </div>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    isSignUp() {
      return this.$route.query.on == 'signup'
    },
    validateEmail() {
      return this.email && this.isSignUp
        ? /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            this.email
          )
          ? null
          : false
        : null
    },
    validatePassword() {
      return this.password && this.isSignUp
        ? this.password.length >= 6
          ? null
          : false
        : null
    }
  },
  methods: {
    onSubmit() {
      const { email, password } = this
      if (!email) this.$toasted.show('Email required!', { type: 'error' })
      if (!password) this.$toasted.show('Password required!', { type: 'error' })
      if (
        this.isSignUp &&
        (this.validateEmail === false || this.validatePassword === false)
      )
        return
      let loader = this.$loading.show()
      this.$store
        .dispatch(this.isSignUp ? 'onSignUp' : 'onSignIn', {
          email,
          password
        })
        .then(({ data }) => {
          this.$toasted.show(data.message)
        })
        .catch(({ response }) => {
          response.data.message.forEach(msg =>
            this.$toasted.show(msg, { type: 'error' })
          )
        })
        .finally(() => {
          loader.hide()
          this.password = ''
        })
    }
  },
  watch: {
    isSignUp() {
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style></style>
