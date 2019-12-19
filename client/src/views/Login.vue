<template>
  <div class="user" style="display:flex;justify-content:center;align-items:center;">
      <div class="login-form" v-if="registerForm === false">
          <form @submit.prevent="login">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="e.g steve@mail.com" required>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="******" required>
                </div>
                <button type="submit" class="btn btn-warning">Login</button>
                <button class="btn btn-dark" @click="toRegisterForm" >Register</button>
            </form>
      </div>

      <div class="register-form" v-if="registerForm === true">
          <form @submit.prevent="register">
                <div class="form-group">
                    <label for="exampleInputEmail1">Fullname</label>
                    <input v-model="name" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full name is required.." required>
                </div>
                 <div class="form-group">
                    <label for="exampleInputEmail1">Profile</label>
                    <input v-model="profile" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="How you introduce your self.." required>
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="e.g steve@mail.com" required>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="min 6 characters" required>
                </div>
               <div class="form-group">
                        <b-form-file v-model="file" class="mt-3" plain></b-form-file>
                        <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>
                    </div>
                <button type="submit" class="btn btn-warning">Register</button>
                <button class="btn btn-dark" @click="toLoginForm">Back</button>
            </form>
      </div>
  </div>
</template>

<script>

import {mapState} from 'vuex'
export default {
    data(){
        return{
            registerForm : false,
            name: '',
            email: '',
            password: '',
            file: null,
            profile: ''
        }
    },
    methods : {
       
        toRegisterForm(){
            this.registerForm = true
        },
        toLoginForm(){
            this.registerForm = false
        },
        login(){
            let payload = {
                email : this.email,
                password : this.password
            }
            this.$store.dispatch('login',payload)
        },
        register(){
            let formData = new FormData()
                formData.append ('name',this.name)
                formData.append ('email',this.email)
                formData.append ('password',this.password)
                formData.append ('profile',this.profile)
                formData.append ('file',this.file)
                this.$store.dispatch('register',formData)
        }
    },
    created(){
        if(localStorage.getItem('token')){
            this.$store.commit('CHANGE_ISLOGIN',true)
        }
    },
    computed: mapState(['isLogin'])
}
</script>

<style scoped>

.login-form{
    background-color: white;
    padding:50px;
    margin-top:18%;
}
.register-form{
    background-color: white;
    padding:50px;
    margin-top:18%;
}
.user{
    height: 100vh;
    background-image: url('https://storage.googleapis.com/nike-public-bucket/stackoverflow-background.jpg');
    background-size: cover;
}

.btn{
    margin:10px;
}

</style>