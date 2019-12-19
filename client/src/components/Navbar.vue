<template>
<nav class="navbar d-flex justify-content-center navbar-expand-lg navbar-light navbar-style p-0">
    <div class="d-flex justify-content-center">
        <button type="button" class="btn button-style p-0">
            <img src="../assets/stunOverflow.png" @click="$router.push('/')" alt="logo" class="logo-style p-2">
        </button>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse mt-2" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <div class="col-auto">
            <label class="sr-only" for="inlineFormInputGroup">search</label>
                <div class="input-group mb-2 input-border" style="border-radius:10%;">
                    <div class="input-group-prepend">
                        <div class="input-group-text pr-0 icon-style" style="background-color: white; border:none;">
                            <i class="fas fa-search" style="border:none"></i>
                        </div>
                    </div>
                    <input v-model="search" @click="checkSearch" type="text" class="form-control pl-2 py-3 input-search" style="font-size:12px; border:none;" id="inlineFormInputGroup" placeholder="Search...">
                </div>
            </div>
        </div>
        <div class="btn-group" v-if="isLogin">
            <button type="button" class="btn button-style d-flex flex-row" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="mt-1" :style="`background: url('${$store.state.photo}'); width: 30px;height: 35px; background-size: 100%;background-repeat: no-repeat;`"></div>
                <span class="point-profile my-auto ml-1">{{ popular }}</span>
            </button>
            <div class="dropdown-menu dropdown-menu-right">
                <h6 class="dropdown-header">Profile</h6>
                <img :src="photo" alt="profile" class="px-2" style="width:100%; background-size: 100%;">
                <button class="dropdown-item mt-1" type="button" style="font-weight: bold;">{{ email }}</button>
                <div class="d-flex align-items-center">
                    <button class="dropdown-item" type="button" style="font-size:15px;">Reputation
                        <span class="badge badge-primary">{{ popular }}</span>
                    </button>
                </div>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item btn-signout" type="button" @click="signout">Sign out</button>
            </div>
        </div>
    </div>
<div class="dropdown show" v-if="!isLogin">
    <button type="button" class="btn btn-primary btn-sm" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</button>
    <button type="button" class="btn btn-success btn-sm ml-1" v-if="$route.path == '/'" @click="$router.push('/register')">Register</button>
    <button type="button" class="btn btn-success btn-sm ml-1 disabled" v-else>Register</button>
    <div class="dropdown-menu login-dropdown" style="width: 300px;" aria-labelledby="dropdownMenuLink">
      <span class="ml-4" style="font-weight: bold; font-size: 20px;"><u>login</u></span>
        <div class="input-group dropdown-item">
            <div class="input-group-prepend">
                <span class="input-group-text" style="font-size: 13px;" id="inputGroupPrepend2">Email</span>
            </div>
            <input type="text" v-model="email_login" class="form-control" style="font-size: 13px;" id="validationDefaultUsername" placeholder="Email" aria-describedby="inputGroupPrepend2" required>
        </div>
        <div class="input-group dropdown-item">
            <div class="input-group-prepend">
                <span class="input-group-text" style="font-size: 13px;" id="inputGroupPrepend2">Password</span>
            </div>
            <input style="font-size: 13px;" v-model="password_login" type="password" class="form-control" id="validationDefaultUsername" placeholder="password" aria-describedby="inputGroupPrepend2" required>
        </div>
        <div class="d-flex justify-content-end">
          <button type="button" class="btn btn-primary btn-sm mr-4" @click="login" style="width:100px;">Login</button>
        </div>
    </div>
</div>
</nav>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../helpers/axios'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      search: '',
      email_login: '',
      password_login: ''
    }
  },
  methods: {
    signout(){
        localStorage.clear()
        this.$router.push('/')
        this.$store.commit('SET_LOGOUT')
    },
    checkSearch(){
      if (!localStorage.getItem('token')) {
        Swal.fire({
          title: 'Login First!',
          // text: 'Modal with a custom image.',
          // imageUrl: 'https://loading.io/mod/spinner/rosary/sample.gif',
          // imageWidth: 400,
          // imageHeight: 200,
          icon: 'error',
          timer: 2500,
          timerProgressBar: true,
          imageAlt: 'Custom image',
          showConfirmButton: false,
          showCancelButton: false,
          confirmButtonText: 'نعم',
          cancelButtonText: 'لا',
        })
        this.search = ''
      }
    },
    login(){
        Swal.showLoading()
        let form = {
            email: this.email_login,
            password: this.password_login
        }
        axios({
            url: '/user/login',
            method: 'POST',
            data: form
        })
        .then(({ data })=>{
            console.log(data);
            localStorage.setItem('token', data.token)
            let payload = {
                email: data.user.email,
                image: data.user.image[0],
                popular: data.user.popular
            }
            this.$store.commit('SET_LOGIN',{ payload })
            this.$router.push('/questions')
            Swal.close()
            Swal.fire({
                title: 'Login Success!',
                icon: 'success',
                // imageWidth: 400,
                // imageHeight: 200,
                timer: 1200,
                timerProgressBar:true,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                showCancelButton: false,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا'
            })
        })
        .catch(error => {
            console.log(error.response.data)
            Swal.close()
            Swal.fire({
                title: 'Error!',
                text: error.response.data.errors.join(' | '),
                icon: 'error',
                // imageWidth: 400,
                // imageHeight: 200,
                timer: 2500,
                imageAlt: 'Custom image',
                showConfirmButton: false,
                showCancelButton: false,
                confirmButtonText: 'نعم',
                cancelButtonText: 'لا'
            })
        })
    }
  },
  computed: mapState([ 'isLogin', 'email', 'photo', 'popular' ])
}
</script>

<style scoped>

.icon-style:hover{
    color: orangered;
    box-shadow: 0 0 5px 2px rgb(250, 181, 156);
    background-color: none;
}

.btn-signout:hover{
    background-color: rgb(223, 20, 20);
    color: white;
}

.point-profile{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.navbar-style{
    border-top: 3px solid orangered;
    background-color: #FAFAFB;
    border-bottom: 1px solid rgb(211, 211, 211);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.233);
}

.logo-style{
    width: 180px;
}

.button-style:hover{
    background-color: rgb(241, 241, 241);
}
.button-style:focus{
    box-shadow: none;
}

.input-search{
    width: 0rem;
    transition: 0.5s;
}
.input-search:focus{
    width:20rem;
    box-shadow: none;
}

.input-border{
    border:1px solid #BBC0C4;
    transition: 0.5s;
}

.input-border:focus-within{
    border:1px solid rgb(255, 72, 0);
    box-shadow: 0 0 15px 1px rgba(255, 68, 0, 0.411);
    color: rgb(255, 72, 0)
}
.input-border-value:hover{
    color: rgb(255, 72, 0)
}

</style>
