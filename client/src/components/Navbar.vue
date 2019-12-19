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
      <b-navbar-brand v-if="!this.$store.state.isLogin">
        <router-link to="/register" class="mr-sm-2">
          <b-button variant="outline-light">Sign Up</b-button>
        </router-link>
        <router-link to="/login" class="mr-sm-2">
          <b-button variant="primary">Login</b-button>
        </router-link>
      </b-navbar-brand>
      <b-navbar-brand  v-if="this.$store.state.isLogin">
        <b-button @click.prevent="Logout" variant="primary">Logout</b-button>
      </b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    Logout() {
      localStorage.clear();
      this.$store.state.isLogin = false
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.navbar {
  justify-content: space-between !important;
}
.form-inline {
  width: 50vw;
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap;
}
#nav a,
#nav a:visited {
  color: #42b983;
  outline: none;
}
#nav a:hover,
#nav a:active {
  text-decoration: none;
  color: rgb(12, 172, 236);
  outline: none;
}
</style>