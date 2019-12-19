<template>
  <div id="fullbody">
      <h1>Login</h1>
    <div class="container">
      <b-form @submit.prevent="onSubmit" v-show="show">
        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            placeholder="Email here..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            placeholder="Password please!"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <br />
      <hr />
      <br />
      <p>
        Wanna make an account?
        <router-link to="/register">Here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from 'sweetalert2';

export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/login",
        data: this.form
      })
      .then(({data}) => {
          swal.fire(`Welcome ${data.userDataSent.username}!`)
          localStorage.setItem('token', data.token)
          this.$router.push('/')
          this.$store.state.isLogin = true
      })
      .catch((err) => {
          swal.fire(err.response.data.message)
          console.log(err.response.data.message);
      });
    }
  }
};
</script>

<style scoped>
.container {
  width: 40%;
  padding: 5vw 5vw 3vw 5vw;
  border: 1px dotted black;
  background-color: whitesmoke;
}
#fullbody {
  background-color: rgb(255, 246, 234);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>