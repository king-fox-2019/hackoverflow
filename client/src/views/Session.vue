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
              <router-link
                :to="`/session?from=${$route.query.from || '/'}&on=signin`"
                >Sign In</router-link
              ></small
            >
            <small class="text-muted" v-else
              >Don't have an account?
              <router-link
                :to="`/session?from=${$route.query.from || '/'}&on=signup`"
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
        : null
    }
  },
  methods: { onSubmit() {} },
  watch: {
    isSignUp() {
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style></style>
