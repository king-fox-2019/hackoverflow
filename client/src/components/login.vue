<template>
  <form @submit.prevent="loginAttempt">
    <b-form-input class="input" v-model="email"
    type="email" placeholder="Enter your email"></b-form-input>
    <b-form-input class="input" v-model="password"
    type="password"
    placeholder="Enter your password"></b-form-input>
    <b-button variant="dark" type="sumbit" class="mt-3">Login</b-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginAttempt() {
      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('loginAttempt', payload);
    },
  },
};
</script>

<style scoped>
.input {
  margin-top: 1rem !important;
}
</style>
