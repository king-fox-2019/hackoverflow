<template>
  <div class="home">
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group
        id="input-group-1"
        label="Name:"
        label-for="input-1"
        description="Enter your name here."
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-2"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Password:"
        label-for="input-3"
        description="Enter your password here"
      >
        <b-form-input
          id="input-3"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <div class="button-group">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('register', this.form)
    },
    onReset() {
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
    }
  },
  components: {
  }
}
</script>

<style scoped>
  .home {
    width: 50%;
    margin: auto;
    border: 1px solid #9c9c9c;
    border-radius: 6px;
    padding: 2rem;
  }
  .button-group {
    display: flex;
    flex-direction: row-reverse;
  }
  .button-group button {
    margin-left: 1rem;
  }
</style>