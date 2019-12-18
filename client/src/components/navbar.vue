<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/"
      style="font-family: 'Righteous', cursive; color: orange;"
      class="animated infinite heartBeat">
      Hackoverflow</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template v-slot:button-content >
              User
            </template>
            <section v-if="$store.state.logged">
              <b-dropdown-item href="#">Ask!</b-dropdown-item>
              <b-dropdown-item
              @click="$bvModal.show('my-question')">My Question</b-dropdown-item>
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </section>
            <section v-else>
              <b-dropdown-item to="/login">LOGIN / REGISTER</b-dropdown-item>
            </section>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
    <!-- My Question Modal -->
    <b-modal id="my-question" hide-footer>
      <div class="d-block text-center">
        <h3>My Questions</h3>
      </div>
      <b-button class="mt-3" block @click="$bvModal.hide('my-question')">Close Me</b-button>
  </b-modal>
    <!-- End of my question modal -->
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
  methods: {
    logout() {
      Swal.fire('See you soon!');
      localStorage.removeItem('token');
      this.$store.dispatch('logged', false);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');
</style>
