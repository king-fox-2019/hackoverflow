<template>
  <form id="login" @submit.prevent="loginAttemp">
    <b-form-group label-cols-lg="2" label-size="sm" label="Email">
      <b-form-input id="input-email" v-model="email" type="email" size="sm"></b-form-input>
    </b-form-group>
    <b-form-group label-cols-lg="2" label-size="sm" label="Password">
      <b-form-input id="input-password" v-model="password" type="password" size="sm"></b-form-input>
    </b-form-group>
    <b-button variant="outline-primary" type="submit">Login</b-button>
  </form>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    loginAttemp() {
      const data = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('LOGIN_ATTEMPT', data);
    },
  },
};
</script>

<style scoped>
</style>
