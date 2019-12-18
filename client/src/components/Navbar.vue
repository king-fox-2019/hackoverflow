<template>
  <div id="navigasi">
    <!-- Image and text -->
    <b-navbar variant="dark" type="light">
      <b-navbar-brand>
        <router-link to="/">Hacktiv belowflow</router-link>
      </b-navbar-brand>
      <b-nav-form>
        <b-form-input class="mr-sm-2 w-100" placeholder="Search"></b-form-input>
        <b-button variant="info" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>
      <b-navbar-brand>
        <router-link to="/register" class="mr-sm-2">
          <b-button variant="outline-light">Sign Up</b-button>
        </router-link>
        <router-link to="/login" class="mr-sm-2">
          <b-button variant="primary">Login</b-button>
        </router-link>
      </b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style scoped>
.navbar {
  justify-content: space-between !important;
}
.form-inline{
  width: 50vw;
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap;
}
</style>