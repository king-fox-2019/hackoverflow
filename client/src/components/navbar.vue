<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" @click="toHome">MINI OVERFLOW</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        </b-navbar-nav>-->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-s$('#myModal').modal('hide')m-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <strong v-if="$store.state.isLogin===false">Login</strong>
              <strong v-else>Profile</strong>
            </template>
            <div v-if="$store.state.isLogin===false">
              <b-dropdown-item data-toggle="modal" data-target="#myModal" @click.prevent="login">Login</b-dropdown-item>
              <b-dropdown-item data-toggle="modal" data-target="#myModal" @click.prevent="register">Register</b-dropdown-item>
            </div>
            <div v-else>
              <b-dropdown-item @click.prevent="logout">Logout</b-dropdown-item>
              <b-dropdown-item @click.prevent="userQuestion">Your Questions</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- <div>
      <b-modal centered :hide-footer="true" id="modal1" :title="form">
        <loginRegisterForm></loginRegisterForm>
        <div class="row justify-content-center">
          <p v-if="form==='Login'">Don't have an account yet? <a href="" @click.prevent="register">Register</a></p>
          <p v-if="form==='Register'">Back to Login? <a href="" @click.prevent="login">Login</a></p>
        </div>
      </b-modal>
    </div>-->
    <div class="modal" id="myModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header text-center d-block">
            <h4 class="modal-title">{{form}}</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <loginRegisterForm></loginRegisterForm>
          </div>

          <div class="modal-footer text-center d-block">
            <div class="mr-auto">
              <p v-if="form==='Login'">Don't have an account yet? <a href="" @click.prevent="register">Register</a></p>
              <p v-if="form==='Register'">Back to Login? <a href="" @click.prevent="login">Login</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import loginRegisterForm from "@/components/loginRegisterForm.vue";

export default {
  data() {
    return {
      form: "Login"
    };
  },
  components: {
    loginRegisterForm
  },
  methods: {
    ...mapActions(["changeForm"]),
    login() {
      this.$store.commit("CLEAR_FIELD");
      this.form = "Login";
      this.changeForm("login");
    },
    register() {
      this.$store.commit("CLEAR_FIELD");
      this.form = "Register";
      this.changeForm("register");
    },
    logout() {
      this.$store.commit("LOGOUT")
      this.$swal({
        type:'success',
        title:'Logged Out'
      })
    },
    userQuestion() {
      this.$router.push({path:'/user-question'})
    },
    toHome() {
      this.$router.push({path:'/'})
    }
  },
  computed: {
    ...mapGetters(["getForm", "getSuccess", "getFail"])
  },
  watch: {
    getSuccess(newVal, oldVal) {
      if (newVal === true) {
        this.$swal({
          type: "success",
          title: "Welcome!",
          timer: 1500
        });
        $('#myModal').modal('hide')
      }
    },
    getFail(newVal, oldVal) {
      if (newVal === true) {
        this.$swal({
          type: "error",
          title: "Oops!",
          text: "Something is wrong!"
        });
      }
    }
  }
};
</script>

<style scoped>
</style>