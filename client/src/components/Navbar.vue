<template>
  <div>
    <b-navbar
      class="fixed-top"
      toggleable="lg"
      type="dark"
      style="height:45px;background-color:orange"
    >
      <b-navbar-brand>
        <router-link to="/" style="text-decoration:none;color:white">
          <img width="60px" height="60px" src="../assets/logo.png" class="mr-2 mt-4" />
          Hack Overflow
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav></b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              style="background-color:transparent;text-align:right;color:white;border:0px;border-bottom:1px solid white;box-shadow:none"
              size="sm"
              v-model="search"
              class="mr-sm-2 rounded-0"
              placeholder="Search"
            ></b-form-input>
            <b-button
              @click.prevent="searchQuestion"
              variant="light"
              size="sm"
              class="my-2 my-sm-0 p-1"
              type="submit"
            >Search</b-button>
          </b-nav-form>
          <b-nav-item-dropdown class="ml-3" right>
            <template v-slot:button-content>
              <span v-if="userLogin">{{username}}</span>
              <span v-else>Guest</span>
            </template>
            <div v-if="userLogin">
              <b-dropdown-item href="#">
                <a @click.prevent="signout">Sign Out</a>
              </b-dropdown-item>
            </div>
            <div v-if="!userLogin">
              <b-dropdown-item>
                <router-link to="/signup" style="text-decoration:none;color:orange">Sign Up</router-link>
              </b-dropdown-item>
              <b-dropdown-item href="#">
                <router-link to="/signin" style="text-decoration:none;color:orange">Sign In</router-link>
              </b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    searchQuestion() {
      const payload = {
        search: this.search
      };
      this.$store.dispatch("searchQuestion", payload);
    },
    signout() {
      this.$store.commit("SET_USER_LOGIN", false);
      localStorage.removeItem("access_token");
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(["userLogin", "username"])
  }
};
</script>

<style></style>
