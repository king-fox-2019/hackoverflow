<template>
  <div>
    <form class="form-signin" @submit.prevent="register">
      <h1 class="h3 mb-3 font-weight-normal text-info">Register</h1>
      <div class="form-group">
        <label for="exampleUsernameInput" class="text-info">Username</label>
        <input
          type="text"
          class="form-control"
          id="exampleUsernameInput"
          aria-describedby="usernameHelp"
          v-model="username"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1" class="text-info">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          v-model="password"
        />
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-info mr-2">
          Register
        </button>
      </div>
      <small class="form-text text-muted">
        Already registered?
        <router-link to="login">
          Login <span class="fas fa-angle-double-right"></span>
        </router-link>
      </small>
    </form>
  </div>
</template>

<script>
import axios from '@/utils/axios-instance.js';

export default {
  name: 'RegisterForm',
  data: function() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    register() {
      axios
        .post('/register', {
          username: this.username,
          password: this.password,
        })
        .then(({data}) => {
          this.$root.$bvToast.toast(`success register`, {
            title: 'Success',
            autoHideDelay: 1500,
            append: true,
            variant: 'success',
          });
          this.$router.push({path: '/'});
        })
        .catch(error => {
          error.response.data.errors.forEach(err => {
            this.$bvToast.toast(err, {
              title: 'Error',
              autoHideDelay: 1500,
              append: true,
              variant: 'danger',
            });
          });
        });
    }
  },
};
</script>

<style scoped>
.form-signin {
  width: 50%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  min-height: 83vh;
}

a:hover {
  text-decoration: none;
}
</style>
