<template>
  <b-container style="margin-top:6rem">
    <b-row>
      <b-col class>
        <div>
          <div class="d-flex justify-content-center">
            <img src="../assets/logo.png" />
          </div>
          <div>
            <h3
              style="text-align:center"
            >Sign up now to ask some question, and make your problem clear!</h3>
          </div>
        </div>
      </b-col>
      <b-col class>
        <div>
          <h1
            style="text-align:left;border-bottom:5px solid orange;width:18rem"
            class="mb-4"
          >Register Form</h1>
          <form>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Name</label>
              <input v-model="name" type="text" class="form-control col-6" />
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Username</label>
              <input v-model="username" type="text" class="form-control col-6" />
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Email Address</label>
              <input v-model="email" type="email" class="form-control col-6" />
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Password</label>
              <input v-model="password" type="password" class="form-control col-6" />
            </div>
            <div class="d-flex justify-content-center">
              <a
                @click.prevent="signupUser"
                class="btn rounded-0"
                style="background-color:orange;color:white"
                role="button"
              >Sign Up</a>
            </div>
            <h6 style="text-align:center" class="mx-4 my-2">OR</h6>
            <div class="d-flex justify-content-center">
              <router-link
                to="/signin"
                class="btn rounded-0"
                style="background-color:orange;color:white"
                role="button"
              >Sign In</router-link>
            </div>
          </form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: "",
      username: "",
      email: "",
      password: ""
    };
  },
  methods: {
    signupUser() {
      const payload = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("signupUser", payload)
        .then(data => {
          Swal.fire("Success", `${data.message}`, "success");
          this.$router.push("/");
        })
        .catch(err => {
          Swal.fire("Oops", `${err.response.data.message}`, "error");
        });
    }
  }
};
</script>

<style></style>