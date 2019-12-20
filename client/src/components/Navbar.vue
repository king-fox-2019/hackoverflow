<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="fixed-top">
    <b-navbar-brand href="#" class="ml-5" @click.prevent="showAlert">
      <img src="https://cdn.onlinewebfonts.com/svg/img_39755.png" style="width:30px" class="d-inline-block align-top" alt="Kitten">
       HacktivOverflow
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form v-if="$store.state.isLogin">
          <b-button size="sm" class="ml-2 btn btn-warning btn-sm" v-b-modal.modal-qestion>
            Add Question
          </b-button>
        </b-nav-form>
        <b-nav-form>
          <router-link to="/">
            <b-button size="sm" class="ml-2 mr-2 btn btn-warning btn-sm">
              Home
            </b-button>
          </router-link>
        </b-nav-form>
        <b-nav-form v-if="!$store.state.isLogin">
          <router-link to="/user">
            <b-button size="sm" class="ml-2 mr-2 btn btn-warning btn-sm">
              Login / Register
            </b-button>
          </router-link>
        </b-nav-form>
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        <b-nav-form v-if="$store.state.isLogin">
          <b-button size="sm" class="ml-2 btn btn-warning btn-sm" @click="logout">
            Log Out
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
    <b-modal id="modal-qestion" title="Add Question" hide-footer>
      <div class="box">
        <form action="" @submit.prevent="addQuestion" method="post">
          <div class="form-group">
            <label for="title">title</label>
            <input required id="title" type="text" class="form-control" v-model="title"/>
          </div>
          <div class="form-group">
            <label for="question">Question</label>
            <input required id="question" type="text" class="form-control" v-model="question"/>
          </div>
          <div class="form-group justify-content-center d-flex">
            <button type="submit" class="btn btn-primary">Post Question</button>
          </div>
        </form>
      </div>
    </b-modal>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  data: function () {
    return {
      question: '',
      title: ''
    }
  },
  methods: {
    showAlert () {
      this.$swal('Hello Vue world!!!')
    },
    logout () {
      this.$store.commit('LOGOUT')
    },
    addQuestion () {
      this.$bvModal.hide('modal-qestion')
      this.$store.dispatch('addQuestion', { question: this.question, title: this.title })
      this.question = ''
    }
  }
}
</script>

<style scoped>

</style>
