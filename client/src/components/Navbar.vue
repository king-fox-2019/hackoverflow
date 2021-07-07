<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-container>
        <b-navbar-brand style="color: #FB9A3F; cursor: pointer" @click="goToHome"><img alt="Qries" src="https://img.icons8.com/color/48/000000/stackoverflow.png" width="70" height="30"><span style="font-size: 1.5rem">LetIt</span><span style="font-size: 1.5rem; font-weight: bold">Flow</span></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-if="auth.token" href="" @click.prevent="goToAddQuestion">+ Question</b-nav-item>
            <b-nav-item v-if="!auth.token" href="" @click.prevent="goToSignin">Login</b-nav-item>
            <b-nav-item-dropdown v-if="auth.token" right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>{{ auth.payload.name }}</em>
              </template>
              <b-dropdown-item href="" @click.prevent="goToMyQuestion">My Question</b-dropdown-item>
              <b-dropdown-item href="" @click.prevent="signout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Navbar',
  computed: mapState(['auth']),
  methods: {
    goToHome () {
      this.$store.dispatch('fetchQuestions')
      this.$router.push('/')
    },
    goToSignin () {
      this.$router.push('/signin')
    },
    goToAddQuestion () {
      this.$router.push('/ask')
    },
    goToMyQuestion () {
      this.$router.push('/question/my')
    },
    signout () {
      let msg

      this.$swal.fire({
          title: 'Are you sure to Signout?',
          text: "You will be signed out!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, sign out!'
        }).then((result) => {
          if (result.value) {
            this.$store.dispatch('signout')            
            .then(message => {
              this.$swal.mixin({
                toast: true,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000
              }).fire({
                type: 'success',
                title: message
              })

              this.$router.push('/signin')
            })
          }
        })
    }
  }
}
</script>

<style>

</style>