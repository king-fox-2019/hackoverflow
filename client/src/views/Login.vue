<template>
  <div class="home">
    <h1 class="hero-center">HACKOVERFLOW</h1>
    <img src="https://picsum.photos/335/100" alt="">
    <hr />
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Password:"
        label-for="input-1"
        description="Enter your password here"
      >
        <b-form-input
          id="input-2"
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
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('login', this.form)
    },
    onReset() {
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
    width: 400px;
    height: 500px;
    margin: auto;
    border: 1px solid #9c9c9c;
    border-radius: 6px;
    padding: 2rem;
  }
  .hero-center {
    text-align: center;
    font-family: 'Bree Serif', serif;
    color: #5dbeba;
  }
  .button-group {
    display: flex;
    flex-direction: row-reverse;
  }
  .button-group button {
    margin-left: 1rem;
  }
</style>