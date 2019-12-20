<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      style="background-color: #ED7F25 !important">
      <b-navbar-brand to="/">HackOverflow</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!isLogin" to="/account/login">Login</b-nav-item>
          <b-nav-item v-if="isLogin" to="/account/myquestions">My Questions</b-nav-item>
          <b-nav-item v-if="isLogin" @click.prevent="logout">Logout</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MainNavbar',
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  },
  computed: mapState(['isLogin'])
}
</script>

<style>

</style>
