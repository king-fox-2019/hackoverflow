<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import { mapState } from "vuex";

export default {
  components: {
    Navbar
  },
  computed: {},
  created() {
    const userLogin = localStorage.getItem("access_token");
    if (userLogin) {
      this.$store.commit("SET_USER_LOGIN", true);
      this.$store.dispatch("getCurrentUser", true);
    }
  }
};
</script>
<style></style>
