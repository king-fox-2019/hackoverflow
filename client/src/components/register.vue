<template>
  <form>
    <b-form-input class="input" type="text" v-model="fullname"
    placeholder="Enter your fullname"></b-form-input>
    <b-form-input class="input" v-model="email"
    type="email" placeholder="Enter your email"></b-form-input>
    <b-form-input class="input" v-model="password"
    type="password"
    placeholder="Enter your password"></b-form-input>
    <b-button variant="dark" type="sumbit" class="mt-3">Register</b-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      fullname: '',
      email: '',
      password: '',
    };
  },
};
</script>

<style scoped>
.input {
  margin-top: 1rem !important;
}
</style>
