<template>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="toggleDrawer()" />
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Hack Overflow</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        v-model="search"
        @keyup="setQuery"
      />
      <v-spacer />

      <router-link to="/register">
        <v-btn icon v-if="!isLoggedIn">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </router-link>

      <router-link to="login">
        <v-btn icon v-if="!isLoggedIn">
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </router-link>

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
            icon v-if="isLoggedIn"
            color="white"
            v-on="on"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="logOut">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data: () => ({
      search: ''
    }),
    methods: {
      setQuery() {
        this.$store.commit('SET_QUERY', this.search)
      },
      toggleDrawer() {
          this.$emit('toggleDrawer')
      },
      logOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        this.$store.dispatch('logOut')
        this.$router.push('/')
      }
    },
    computed: {
      ...mapState(['isLoggedIn'])
    }
}
</script>

<style>

</style>