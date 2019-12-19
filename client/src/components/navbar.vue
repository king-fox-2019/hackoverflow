<template>
  <div>
    <b-navbar id="nav" toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/"
      style="font-family: 'Righteous', cursive; color: orange;"
      class="animated infinite heartBeat">
      Hackoverflow</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
           <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2"
            v-debounce:500ms="bounce"
            v-model="query" placeholder="Search"></b-form-input>
            <b-button size="sm"
            variant="outline-light" class="my-2 my-sm-0 mr-2"
            @click="search">Search</b-button>
            <b-button size="sm"
            variant="outline-light" class="my-2 my-sm-0"
            @click="showAll">Show All</b-button>
          </b-nav-form>
          <b-nav-item-dropdown right>
            <template v-slot:button-content >
              User
            </template>
            <section v-if="$store.state.logged">
              <b-dropdown-item to="ask">Ask!</b-dropdown-item>
              <b-dropdown-item
              @click="$bvModal.show('my-question')">My Question</b-dropdown-item>
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </section>
            <section v-else>
              <b-dropdown-item to="login">LOGIN / REGISTER</b-dropdown-item>
            </section>
          </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
    <!-- My Question Modal -->
    <b-modal id="my-question" hide-footer>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">UpVotes</th>
            <th scope="col">DownVotes</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in $store.state.myQuestions"
          :key="question._id">
            <th scope="row">{{question.title}}</th>
            <td>{{question.upVotes}}</td>
            <td>{{question.downVotes}}</td>
            <td><b-button @click="setEdit(question)">edit</b-button></td>
            <td><b-button @click="destroy(question._id)">DELETE</b-button></td>
          </tr>
        </tbody>
      </table>
      <b-button class="mt-3" block @click="$bvModal.hide('my-question')">Close Me</b-button>
  </b-modal>
    <!-- End of my question modal -->
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import router from '../router';

export default {
  data() {
    return {
      query: '',
      message: 'Hello world',
    };
  },
  methods: {
    bounce() {
      this.$store.dispatch('fetchQuestions', this.query);
      router.push({ name: 'question' });
    },
    showAll() {
      this.$store.dispatch('fetchQuestions');
      router.push({ name: 'question' });
    },
    logout() {
      Swal.fire('See you soon!');
      localStorage.removeItem('token');
      this.$store.dispatch('logged', false);
    },
    destroy(id) {
      this.$store.dispatch('remove', id);
    },
    search() {
      this.$store.dispatch('fetchQuestions', this.query);
      this.query = '';
      router.push({ name: 'question' });
    },
    ask() {
      router.push({ name: 'ask' });
    },
    setEdit(payload) {
      const { _id } = payload;
      router.push({ path: `/edit/${_id}` });
      this.$store.dispatch('setEdit', payload);
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Righteous&display=swap');
#nav {
  background-color: black !important;
  color: #000 !important;
}
</style>
