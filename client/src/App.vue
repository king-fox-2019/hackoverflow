<template>
  <v-app>
    <navbar />
    <v-content>
      <router-view />
    </v-content>
    <vue-snotify></vue-snotify>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },

  data: () => ({
    //
  })
};
</script>
