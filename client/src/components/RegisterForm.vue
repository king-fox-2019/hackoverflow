<template>
  <div>
  <img style="height: 50px; margin-top: 100px;" src="../assets/only-logo-SO.png">
      <div class="container register-form">
      <div class="the-form">
        <form @submit.prevent="register">
          <b-field label="Display Name">
              <b-input type="text"
                  v-model="username"
                  maxlength="30">
              </b-input>
          </b-field>

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
              <button class="button is-primary" type="submit" expanded>Sign Up</button>
          </div>
          </form>
      </div>
      <br>
      <br>
      <div class="switch">
          Already have an account? <router-link to="/users/login"> &nbsp; Log in</router-link>
      </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'register-form',
  data: function () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.login {
  align-items: center;
}
.register-form {
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
  margin-top: 10px;
  margin-left: 90px;
}
</style>
