<template>
    <div
      id="login"
      class="container justify-content-center border rounded-sm bg-light p-0"
      style="width:30%; margin-top: 100px;"
    >
    <b-form
        id="login-form"
        @submit.prevent="onSubmit"
        class="p-3">
      <h1 class="h3 my-3 font-weight-normal text-center">Login</h1>
      <b-form-group
        label="Email address:"
        label-for="login-email"
      >
        <b-form-input
          id="login-email"
          type="email"
          v-model="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Password:"
        label-for="login-password"
      >
        <b-form-input
          id="login-password"
          type="password"
          v-model="password"
          minlength="6"
          required
          placeholder="Enter password"
        ></b-form-input>
        <br>
        <b-button
        @click.prevent="onSubmit"
          block
          variant="primary"
          type="submit"
        >Login</b-button>
      </b-form-group>
      <hr>
      <p class="mt-2 text-center text-secondary">Don't have an account? <router-link to="register">Register</router-link></p>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'LoginBox',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  #login {
    position: relative;
  }
 .copyright {
   font-size: 0.8em;
   text-align: center;
   width: 100%;
   display: inline-block;
   position: absolute;
   bottom: 0
 }
</style>
