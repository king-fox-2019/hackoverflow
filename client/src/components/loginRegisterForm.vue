<template>
  <div>
    <b-form >
      <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
        <b-form-input v-model="email" id="input-1" type="email" required placeholder="Enter email"></b-form-input>
      </b-form-group>
      <b-form-group v-if="getForm==='register'" id="input-group-1" label="Username:" label-for="input-1" >
        <b-form-input v-model="username" id="input-2" type="text" required placeholder="Enter username"></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Password:" label-for="input-1">
        <b-form-input v-model="password" id="input-3" type="password" required placeholder="Enter password"></b-form-input>
      </b-form-group>

      <div class="row justify-content-center">
        <b-btn variant="outline-dark" v-if="getForm==='login'" @click.prevent="login">Login</b-btn>
        <b-btn variant="outline-dark" v-if="getForm==='register'" @click.prevent="register">Register</b-btn>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed:{
    ...mapGetters(['getForm','getSuccess','getFail']),
    username:{
      get () {
        return this.$store.state.username
      },
      set (value) {
        this.$store.commit('UPDATE_USERNAME',value)
      }
    },
    email:{
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit('UPDATE_EMAIL',value)
      }
    },
    password:{
      get () {
        return this.$store.state.password
      },
      set (value) {
        this.$store.commit('UPDATE_PASSWORD',value)
      }
    }
  },
  methods:{
    ...mapActions({registerUser:'register',loginUser:'login'}),
    register(){
      this.registerUser()
    },
    login(){
      this.loginUser()
    }
  }
};
</script>

<style>
</style>