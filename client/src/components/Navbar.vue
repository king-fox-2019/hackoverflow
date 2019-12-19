<template>
  <v-app-bar clipped-left id="navbar" app color="primary" dark>
    <div class="d-flex align-center">
      <v-container fill-height>
        <img
          width="30px"
          src="../assets/stack-white.png"
        />
        <h1 id="brand-name" fill-height>
          <router-link to="/">Hacktiflow</router-link>
        </h1>
      </v-container>
    </div>

    <v-text-field class="search"
      @keyup.enter="search"
      v-model="searchQuery"
      placeholder="Search..."
      hide-details
      single-line
      ></v-text-field>

    <v-spacer></v-spacer>

    <!-- <v-btn v-if="isLoggedIn" target="_blank" text>
      <span class="mr-2">Profile</span>
    </v-btn> -->

    <router-link class="btn-white" to="/signin">
      <v-btn
        v-if="!isLoggedIn"
        target="_blank"
        text
        >
        <span class="mr-2">
        Log in
        </span>
      </v-btn>
    </router-link>

    <router-link class="btn-white" to="/join">
      <v-btn v-if="!isLoggedIn" target="_blank" text>
        <span class="mr-2">
          Join
        </span>
      </v-btn>
    </router-link>

    <v-btn
      v-if="isLoggedIn"
      @click.prevent="logout"
      target="_blank"
      text
    >
      <span class="mr-2">Log out</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex"
import axios from '../../configs/axios'

export default {
  name: "navbar",

  data () {
    return {
      searchQuery: ''
    }
  },

  methods: {
    logout: function() {
      localStorage.removeItem('access_token')
      this.$store.state.user = {}
      this.$store.dispatch('checkToken')
      this.$router.push('/')
    },
    search: function() {
      this.$store.dispatch('fetchQuestions', { q: this.searchQuery })
    }
  },

  computed: {
    ...mapState(["isLoggedIn"])
  }
};
</script>

<style>
#navbar {
  padding: 0 100px;
}

#brand-name {
  margin-left: 5px;
  font-family: "Alata", sans-serif;
  font-size: 30px;
}

#brand-name > a {
  color: aliceblue !important;
}

.search {
  /* margin: 0 10vw; */
  margin-left: 20vw;
}

.v-btn {
  color: aliceblue;
}

.btn-white {
    color: aliceblue !important;
}

</style>
