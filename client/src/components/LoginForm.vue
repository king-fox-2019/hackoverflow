<template>
  <div>
     <img style="height: 50px; margin-top: 100px;" src="../assets/only-logo-SO.png">
      <div class="container signup-form">
      <section class="the-form">
        <form @submit.prevent="login">
          <b-field label="Email">
              <b-input type="email"
                  v-model="email"
                  maxlength="30">
              </b-input>
          </b-field>

          <b-field label="Password">
              <b-input type="password"
              v-model="password"
                  password-reveal>
              </b-input>
          </b-field>

          <div class="buttons">
              <button class="button is-primary" type="submit" expanded>Login</button>
          </div>
          </form>
      </section>
      <br>
      <br>
      <div class="switch">
          Don't have an account? <router-link to="/users/register">Register</router-link>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style>
.login {
  align-items: center;
}
.login-form {
  height: 420px;
  width: 300px;
  background-color: white;
  text-align: left;
  box-shadow: -1px 2px 11px -4px rgba(0,0,0,0.75);
}

.the-form {
  padding: 25px 30px;
  margin-top: 15px;
}
.switch {
  margin-top: 30px;
  margin-left: 30px;
}
.button {
  margin-left: 130px;
}
</style>
