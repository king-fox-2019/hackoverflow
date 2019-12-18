<template>
  <b-navbar toggleable="lg" type="dark" variant="accent" fixed="top">
    <b-navbar-brand to="/">Stun overflow</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto" v-if="onSession">
        <b-nav-item-dropdown :text="$store.state.email" right>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/session?on=signin">Sign In</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item to="/session?on=signup">Sign Up</b-nav-item>
        <b-nav-item to="/session?on=signin">Sign In</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    onSession() {
      return this.$store.state.onSession
    }
  }
}
</script>

<style></style>
