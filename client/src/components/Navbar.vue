<template>
  <div class="navbar">
    <v-app-bar color="white accent-4" light flat>
      <v-toolbar-title>
        <v-img src="../../public/logo.png" max-width="40" alt="logo"></v-img>
      </v-toolbar-title>
      <h2 id="logo-title" style="margin-left:10px;" @click="$router.push('/')">
        HackOverflow
      </h2>
      <v-spacer></v-spacer>

      <div v-if="!statusLogin" style="margin-left:15px">
        <v-btn
          depressed
          color="white accent-4"
          @click="$router.push('/sign/login')"
        >
          login
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>

      <div v-if="!statusLogin" style="margin-left:15px; margin-right:10px;">
        <v-btn
          depressed
          color="white accent-4"
          @click="$router.push('/sign/register')"
        >
          register
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>

      <div v-if="statusLogin" style="margin-left:15px; margin-right:10px;">
        <v-btn depressed color="white accent-4" @click="logout">
          logout
          <v-icon>mdi-power</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("/");
      this.$snotify.success(`Success Logout`, {
        timeout: 5000,
        showProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        position: "leftTop"
      });
    }
  },
  computed: {
    statusLogin() {
      if (localStorage.getItem("token")) {
        this.$store.commit("user/SET_USER_LOGIN", true);
        return this.$store.state.user.isLogin;
      } else {
        this.$store.commit("user/SET_USER_LOGIN", false);
        return this.$store.state.user.isLogin;
      }
    }
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$store.commit("user/SET_USER_LOGIN", true);
    } else {
      this.$store.commit("user/SET_USER_LOGIN", false);
    }
  }
};
</script>

<style scoped>
.navbar {
  overflow: hidden;
}
#logo-title:hover {
  cursor: pointer;
}
</style>
