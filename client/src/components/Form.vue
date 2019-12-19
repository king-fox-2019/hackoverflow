<template>
  <v-layout row wrap align-center justify-center>
      <v-card class="elevation-12">
        <v-toolbar
            color="primary"
            dark
            flat
            >
            <v-toolbar-title>{{ page }}</v-toolbar-title>
            <v-spacer />
            </v-toolbar>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy">
                    <v-text-field v-if="page === 'register'"
                        v-model="name"
                        label="Name"
                    />
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                    />
                    <v-text-field
                        v-model="password"
                        label="Password"
                        type="password"
                        required
                    />
                </v-form>
                <router-link to="/forgot-password">
                    <p>Forgot password?</p>
                </router-link>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click.prevent="submitForm">{{ page }}</v-btn>
            </v-card-actions>
        </v-card>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      page: '',
      valid: true,
      name: '',
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      lazy: false,
    }),
    methods: {
        getFormData() {
            this.page = this.$route.name;
        },
        submitForm() {
            let form = {}
            form.email = this.email
            form.password = this.password

            if (this.page == 'login') {
                this.$store.dispatch('login', form)
                    .then(data => {
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('email', data.email)
                        this.$router.push('/')
                    })
            } else {
                form.name = this.name
                this.$store.dispatch('register', form)
                    .then(data => {
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('email', data.email)
                        this.$router.push('/')
                    })
            }
        }
    },
    created() {
        this.getFormData()
    }
  }
</script>

<style>

</style>