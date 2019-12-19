<template>
  <div class="loginback" style="height: 100vh;">
    <div class="gila">
      <div style="padding: 20px; border: 1px solid grey;">
        <h6 style="margin: 10px 0px">Join the Stuck Overflow</h6>
        <div style="width: 294px; font-size: 12px;">
          <div>
            <div>
              <svg width="26" height="26" class="svg-icon mtn2">
                <path
                  opacity=".5"
                  d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"
                />
                <path
                  d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"
                />
              </svg>
              <span>Get unstuck — ask a question</span>
            </div>
          </div>
          <div>
            <div>
              <svg width="26" height="26" class="svg-icon mtn2">
                <path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z" />
                <path
                  opacity=".5"
                  d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"
                />
              </svg>
              <span>Unlock new privileges like voting and commenting</span>
            </div>
          </div>
          <div>
            <div>
              <svg width="26" height="26" class="svg-icon mtn2">
                <path
                  d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"
                />
                <path
                  opacity=".5"
                  d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"
                />
              </svg>
              <span>Save your favorite tags, filters, and jobs</span>
            </div>
          </div>
          <div>
            <br />Use the power of Stack Overflow inside your organization.
            <br />Try a
            <a
              href="https://stackoverflow.com/teams?utm_source=so-owned&amp;utm_medium=product&amp;utm_campaign=public-sign-up&amp;utm_content=teams"
              target="_blank"
            >free trial of Stack Overflow for Teams</a>.
          </div>
        </div>
      </div>
    </div>
    <div class="coba">
      <img src="../assets/login3.svg" style="width:250px; margin-bottom: 14px;" />
      <button
        type="button"
        class="fb-btn"
        style
        :params="googleSignInParams"
        @click="oauthGoogle"
        @success="onSignInSuccess"
        @error="onSignInError"
      >
        <svg width="25" height="25" class="ma mb u">
          <g fill="none" fill-rule="evenodd">
            <path
              d="M20.66 12.7c0-.61-.05-1.19-.15-1.74H12.5v3.28h4.58a3.91 3.91 0 0 1-1.7 2.57v2.13h2.74a8.27 8.27 0 0 0 2.54-6.24z"
              fill="#4285F4"
            />
            <path
              d="M12.5 21a8.1 8.1 0 0 0 5.63-2.06l-2.75-2.13a5.1 5.1 0 0 1-2.88.8 5.06 5.06 0 0 1-4.76-3.5H4.9v2.2A8.5 8.5 0 0 0 12.5 21z"
              fill="#34A853"
            />
            <path
              d="M7.74 14.12a5.11 5.11 0 0 1 0-3.23v-2.2H4.9A8.49 8.49 0 0 0 4 12.5c0 1.37.33 2.67.9 3.82l2.84-2.2z"
              fill="#FBBC05"
            />
            <path
              d="M12.5 7.38a4.6 4.6 0 0 1 3.25 1.27l2.44-2.44A8.17 8.17 0 0 0 12.5 4a8.5 8.5 0 0 0-7.6 4.68l2.84 2.2a5.06 5.06 0 0 1 4.76-3.5z"
              fill="#EA4335"
            />
          </g>
        </svg>
        Connect with
        <span>&nbsp Google</span>
      </button>
      <button
        style="margin: 10px"
        class="fb-btn"
        data-provider="github"
        data-oauthserver="https://github.com/login/oauth/authorize"
        data-oauthversion="2.0"
      >
        <svg
          aria-hidden="true"
          class="svg-icon iconGitHub"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            d="M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1z"
            fill="#010101"
          />
        </svg>
        Connect with
        <strong>&nbsp Github</strong>
      </button>
      <div class="coba2">
        <q-form style=" width: 420px; height: 350px; padding: 2%;" @submit.prevent="login">
          <q-input
            outlined
            stack-label
            size="13px"
            v-model="email"
            label="Your email *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Email is required']"
          />

          <q-input
            outlined
            stack-label
            size="13px"
            type="password"
            v-model="password"
            label="Your password *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Password is required']"
          />

          <div
            style="display: flex; justify-content: center; align-items:center; flex-direction: column;"
          >
            <q-btn unelevated no-caps size="13px" label="submit" type="submit" color="primary" />
            <br />
            <br />
            <!-- <span> -->
            Don’t have an account?
            <q-btn
              centered
              no-caps
              unelevated
              size="13px"
              label="Sign up"
              @click="toggleRegister"
              type="reset"
              color="primary"
              flat
              class="q-sm"
              style="margin: 0px;"
            />
            <!-- </span> -->
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      googleSignInParams: {
        client_id:
          "179640782565-mdjej11jj9j61s5hrqnj1qjcsti699i7.apps.googleusercontent.com"
      }
    };
  },

  methods: {
    login() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("login", user)
        .then(({ data }) => {
          localStorage.setItem("token", data.token);
          this.$store.commit("LOGIN", true);
          this.$router.push("/");
        })
        .catch(({ response }) => {
          const { message } = response.data;
          Swal.fire("Sorry!", message, "error");
        });
    },
    toggleRegister() {
      this.$router.push("/register");
    },
    oauthGoogle() {
      this.$gAuth
        .signIn()
        .then(GoogleUser => {
          this.isSignIn = this.$gAuth.isAuthorized;
          let id_token = GoogleUser.getAuthResponse().id_token;
          // let profile = GoogleUser.getBasicProfile()
          axios({
            url: "http://localhost:3000/user/googleLogin",
            method: "post",
            data: {
              token: id_token
            }
          })
            .then(({ data }) => {
              // console.log(data);
              localStorage.setItem("token", data.token);
              localStorage.setItem("email", data.email);
              localStorage.setItem("name", data.username);
              this.$emit("gotuser");
              this.$parent.close();
              this.$buefy.toast.open({
                message: "Welcome!",
                type: "is-success"
              });
            })
            .catch(err => {
              // console.log(err.response.data.message);
              this.$buefy.toast.open({
                duration: 4000,
                message: `${err.response.data.message}`,
                type: "is-danger"
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    logout() {
      this.$gAuth
        .signOut()
        .then(() => {
          console.log("user signed out");
          // things to do when sign-out succeeds
        })
        .catch(error => {
          console.log(error);
          // things to do when sign-out fails
        });
    },
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const profile = googleUser.getBasicProfile(); // etc etc
      let id_token = googleUser.Zi.id_token;

      axios({
        method: "POST",
        url: "http://localhost:3000/googleLogin",
        data: {
          token: id_token
        }
      })
        .then(({ data }) => {
          // console.log(data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          localStorage.setItem("name", data.name);

          Swal.fire({
            icon: "success",
            title: `Login Successful, Welcome`,
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("set-login");
        })
        .catch(err => {
          // console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong.."
          });
        });
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      //   console.log('OH NOES', error)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong.."
      });
    }
  }
};
</script>

<style scoped>
.gila {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 150px;
  /* margin-left: 100px; */
}
form {
  margin: auto;
  margin-bottom: 0;
  height: auto;
}
.loginback {
  display: flex;
  flex-direction: row;
  margin-left: 50px !important;
}
.coba {
  /* margin-top: 20px; */
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.coba {
  flex-direction: column;
  /* margin-top: 20px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.fb-btn {
  width: 150px;
  font-size: 12px;
  background-color: white;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #cdc6c6;
  border-radius: 2px;
  color: #494949;
}
.fb-btn span {
  font-weight: bold;
  color: #464646;
}
</style>
