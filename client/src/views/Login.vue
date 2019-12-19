<template>
<div id="content" class="snippet-hidden">
  <div id="mainbar">
    <div class="grid">
        <h1 class="grid--cell fl1 fs-headline1">
          Login/Register
        </h1>
    </div>
    <div id="qlist-wrapper" class="flush-left">
        <div id="question-mini-list">
            <div class="question-summary narrow" style="padding: 50px 100px; height:auto">
              <form @submit.prevent="login">
                <h3>Login</h3><br>
                <b-form-input v-model="loginEmail" :type="'email'" placeholder="Enter your Email" style="width:500px;">
                </b-form-input><br>
                <b-form-input v-model="loginPassword" :type="'password'" placeholder="Enter your Password" style="width:500px;">
                </b-form-input><br>
                <b-button variant="success" :type="'submit'">Sign In</b-button>
              </form>
            </div>
            <div class="question-summary narrow" style="padding: 50px 100px; height:auto">
              <form @submit.prevent="register">
                <h3>Register</h3><br>
                <b-form-input v-model="registerEmail" :type="'email'" required placeholder="Enter your Email" style="width:500px;">
                </b-form-input><br>
                <b-form-input v-model="registerUsername" :type="'text'" required placeholder="Enter your Username" style="width:500px;">
                </b-form-input><br>
                <b-form-input v-model="registerPassword" :type="'password'" required placeholder="Enter your Password" style="width:500px;">
                </b-form-input><br>
                <b-button variant="success" :type="'submit'">Sign Up</b-button>
              </form>
            </div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'login',
  data(){
    return{
      registerEmail : '',
      registerUsername : '',
      registerPassword : '',
      loginEmail: '',
      loginPassword : ''
    }
  },
  methods:{
    register(){
      axios({
        url:'http://localhost:3002/user',
        method:'post',
        data : {
          email : this.registerEmail,
          username : this.registerUsername,
          password : this.registerPassword
        }
      })
        .then(({data}) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('username', data.username)
          swal({
            title: "Register Success!",
            icon: "success",
          });
          this.$router.push('/')
        })
        .catch(err => {
          swal({
            title: "Register Fail!",
            icon: "warning",
          });
        })
    },
    login(){
      axios({
        url:'http://localhost:3002/user/login',
        method:'post',
        data:{
          email : this.loginEmail,
          password : this.loginPassword
        }
      })
        .then(({data})=> {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('username', data.username)
          swal({
            title: "Login Success!",
            icon: "success",
          });
          this.$router.push('/')
        })
        .catch(err => {
          swal({
            title: "Wrong email or password",
            icon: "warning",
          });
        })
    }
  }
}
</script>
