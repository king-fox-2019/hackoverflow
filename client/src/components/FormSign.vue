<template>
  <div>
    <v-app id="inspire" v-if="$route.path == '/sign/login'">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-form ref="formLogin" @submit.prevent="onLogin">
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>Login form</v-toolbar-title>
                    <v-spacer />
                  </v-toolbar>
                  <v-card-text>
                    <v-text-field
                      label="email"
                      name="email"
                      prepend-icon="email"
                      type="email"
                      v-model="login.email"
                    />

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                      v-model="login.password"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn type="submit" color="primary">Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>

    <v-app id="inspire" v-if="$route.path == '/sign/register'">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-form ref="formRegister" @submit.prevent="onRegister">
                  <v-toolbar color="orange darken-2" dark flat>
                    <v-toolbar-title>Register form</v-toolbar-title>
                    <v-spacer />
                  </v-toolbar>
                  <v-card-text>
                    <v-text-field
                      label="Username"
                      name="username"
                      prepend-icon="person"
                      type="text"
                      v-model="register.username"
                    />

                    <v-text-field
                      label="Email"
                      name="email"
                      prepend-icon="email"
                      type="email"
                      v-model="register.email"
                    />

                    <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                      v-model="register.password"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn type="submit" color="orange darken-2"
                      >Register</v-btn
                    >
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "FormSign",
  data() {
    return {
      login: {
        email: "",
        password: ""
      },
      register: {
        username: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    resetRegister() {
      this.$refs.formRegister.reset();
    },
    resetLogin() {
      this.$refs.formLogin.reset();
    },
    onRegister() {
      this.$store
        .dispatch("user/register", this.register)
        .then(data => {
          this.resetRegister();
          this.$router.push("/sign/login");
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          this.resetRegister();
          let text = "";
          err.response.data.errors.forEach(element => {
            text += element + ", ";
          });
          this.$snotify.warning(`${text}`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        });
    },
    onLogin() {
      this.$store
        .dispatch("user/login", this.login)
        .then(data => {
          this.resetLogin();
          this.$router.push("/");
          this.$snotify.success(`${data.message}`, {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        })
        .catch(err => {
          this.resetLogin();
          let text = "";
          err.response.data.errors.forEach(element => {
            text += element + ", ";
          });
          this.$snotify.warning(`${text}`, {
            timeout: 3000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: "leftTop"
          });
        });
    }
  },
  created() {
    this.resetLogin();
    this.resetRegister();
  }
};
</script>

<style></style>
