<template>
  <div>
    <nav class="navbar is-red" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="../../public/logo.png">
        </a>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <router-link to="/">
              Home
            </router-link>
          </a>
          <a class="navbar-item" @click="openModal">
            Add Question
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-light">
                <router-link to="/register">
                  Register
                </router-link>
              </a>
              <a class="button is-light">
                <router-link to="/login">
                  Log In
                </router-link>
              </a>
              <a class="button is-light" @click.prevent="logout">
                Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div :class="modalClass">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add Question</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input class="input" type="text" placeholder="Question title" v-model="title">
            </div>
          </div>
          <div class="field">
            <label class="label">Content</label>
            <div class="control">
              <textarea class="textarea" placeholder="Description" v-model="description"></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">Category</label>
            <div class="control">
              <div class="select">
                <select v-model="category">
                  <option>Javascript</option>
                  <option>Java</option>
                  <option>C#</option>
                  <option>C</option>
                  <option>Python</option>
                  <option>PHP</option>
                  <option>Jquery</option>
                  <option>HTML</option>
                  <option>C++</option>
                  <option>CSS</option>
                  <option>SQL</option>
                  <option>Ruby-on-rails</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-link" @click.prevent="addQuestion">Submit</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  data: function () {
    return {
      modalClass: 'modal',
      title: '',
      description: '',
      category: ''
    }
  },
  methods: {
    openModal: function () {
      this.modalClass = 'modal is-active'
    },
    closeModal: function () {
      this.modalClass = 'modal'
    },
    addQuestion: function () {
      let obj = {
        title: this.title,
        description: this.description,
        category: this.category
      }
      this.title = ''
      this.description = ''
      this.category = ''
      this.modalClass = 'modal'
      return this.$store.dispatch('addQuestion', obj)
    },
    logout: function () {
      localStorage.removeItem('access_token')
      this.$router.push('/login')
      return this.$store.commit('logout')
    }
  }
}
</script>

<style>
</style>