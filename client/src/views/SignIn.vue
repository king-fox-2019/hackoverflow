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
          <form>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Email Address / Username</label>
              <input v-model="emailUsername" type="email" class="form-control col-6" />
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Password</label>
              <input v-model="password" type="password" class="form-control col-6" />
            </div>
            <div class="d-flex justify-content-center">
              <a
                @click.prevent="signinUser"
                class="btn rounded-0"
                style="background-color:orange;color:white"
                role="button"
              >Sign In</a>
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
      emailUsername: "",
      password: ""
    };
  },
  methods: {
    signinUser() {
      const payload = {
        emailUsername: this.emailUsername,
        password: this.password
      };
      this.$store
        .dispatch("signinUser", payload)
        .then(data => {
          Swal.fire("Success", `${data.message}`, "success");
          this.$router.push("/");
        })
        .catch(err => {
          Swal.fire("Oops", `${err.message}`, "error");
        });
    }
  }
};
</script>

<style></style>