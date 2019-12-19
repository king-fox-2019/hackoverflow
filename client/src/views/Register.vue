<template>
  <div id="fullbody">
    <h1>Register</h1>
    <div class="container">
      <b-form @submit.prevent="onSubmit" v-show="show">
        <b-form-group id="input-group-1" label="Username:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.username"
            type="text"
            required
            placeholder="Write your cool username here..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Email:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            required
            placeholder="May i know your email?"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.password"
            type="password"
            required
            placeholder="Ssstt... password please!"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Profile Picture:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="form.image"
            type="text"
            placeholder="Just URL please :)"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="About you:" label-for="input-5">
          <b-form-input
            id="input-5"
            v-model="form.aboutMe"
            type="text"
            placeholder="I wanna know something about you ^_^"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <br />
      <hr />
      <br />
      <p>
        Already got an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "login",
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        image: "",
        aboutMe: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit() {
      axios({
        method: "post",
        url: "http://localhost:3000/users/register",
        data: this.form
      })
        .then(({ data }) => {
          swal.fire(`Welcome ${data.userDataSent.username}!`);
          localStorage.setItem("token", data.token);
          localStorage.setItem('id', data.userDataSent.id)
          this.$router.push("/");
          this.$store.commit('setisLogin', data.userDataSent.id)
        })
        .catch(err => {
          swal.fire(err.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
.container {
  width: 40%;
  padding: 2vw 5vw 1vw 5vw;
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
  padding-top: 4vw;
}
</style>