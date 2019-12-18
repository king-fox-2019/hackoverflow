<template>
  <b-navbar toggleable="lg" type="dark" variant="info" class="fixed-top">
    <b-navbar-brand href="#" class="ml-5">
      <img src="https://image.flaticon.com/icons/png/512/616/616545.png" style="width:30px" class="d-inline-block align-top" alt="Kitten">
       HacktivOverflow
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button size="sm" class="ml-2 btn btn-warning btn-sm" v-b-modal.modal-qestion>
            Add Question
          </b-button>
        </b-nav-form>
        <b-nav-form>
          <router-link to="/">
            <b-button size="sm" class="ml-2 btn btn-warning btn-sm">
              Home
            </b-button>
          </router-link>
        </b-nav-form>
        <b-nav-form>
          <router-link to="/user">
            <b-button size="sm" class="ml-2 mr-2 btn btn-warning btn-sm">
              User
            </b-button>
          </router-link>
        </b-nav-form>
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
        <b-nav-form>
          <b-button size="sm" class="ml-2 btn btn-warning btn-sm">
            Log Out
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
    <b-modal id="modal-qestion" title="Add Question" hide-footer>
      <div class="box">
        <form action="" @submit.prevent="addQuestion" method="post">
          <div class="form-group">
            <label for="question">Question</label>
            <input id="question" type="text" class="form-control" v-model="question"/>
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
      question: ''
    }
  },
  methods: {
    addQuestion () {
      this.$bvModal.hide('modal-qestion')
      console.log('add question triggered')
    }
  }
}
</script>

<style scoped>

</style>
