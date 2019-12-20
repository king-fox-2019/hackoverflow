<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light shadow fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand text-info"
          >Hackoverflow</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item" v-if="!username">
              <b-link class="nav-link text-info" :to="{path: '/login'}"
                >Login</b-link
              >
            </li>
            <li class="nav-item" v-if="!username">
              <b-link class="nav-link text-info" :to="{path: '/register'}"
                >Register</b-link
              >
            </li>

            <li class="nav-item" v-if="username">
              <b-link
                class="nav-link text-light bg-info"
                :to="{path: '/addQuestion'}"
                >+ Question</b-link
              >
            </li>

            <li class="nav-item" v-if="username">
              <b-link class="nav-link text-info" disabled>{{
                username
              }}</b-link>
            </li>
            <li class="nav-item" v-if="username">
              <b-link class="nav-link text-info" @click.prevent="logout"
                >Logout</b-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    checkLocalStorage() {
      if (localStorage.getItem('token')) {
        this.$store.commit('UPDATE_USERNAME', {
          username: localStorage.getItem('username'),
        });
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$store.commit('UPDATE_USERNAME', {username: ''});
      this.$root.$bvToast.toast('Loged out', {
        title: 'Success',
        autoHideDelay: 1500,
        append: true,
        variant: 'success',
      });
    },
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  created() {
    this.checkLocalStorage();
    this.$store.dispatch('fetchAllQuestions');
  },
};
</script>
