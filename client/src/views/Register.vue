<template>
<div class="row bg-ask">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
  <div class="col mt-5">
    <h1>REGISTER</h1>
    <div class="row d-flex justify-content-center">
      <div class="col-5 mt-4 form-ask">
        <div class="form-group">
            <span style="font-weight:bold;" class="d-flex justify-content-start ml-1 mt-3">PhotoProfile</span>
            <span class="d-flex justify-content-start ml-1 font-detail"> Your Photo Profile </span>
            <div :style="styleImage"> </div>
            <input @change="onFileChange" type="file" class="form-control pt-3 pb-5" multiple="">
            <span style="font-weight:bold;" class="d-flex justify-content-start ml-1 mt-3">Email</span>
            <span class="d-flex justify-content-start ml-1 font-detail"> Your Email </span>
            <input type="text" v-model="email" class="form-control input-placeholder" name="" id="" aria-describedby="helpId" placeholder="stun@stun.com">
            <span style="font-weight:bold;" class="d-flex justify-content-start ml-1 mt-3">Password</span>
            <span class="d-flex justify-content-start ml-1 font-detail"> Your Password </span>
            <input type="password" v-model="password" class="form-control input-placeholder" name="" id="" aria-describedby="helpId" placeholder="Password">
        </div>
      </div>
    </div>
      <button type="button" class="btn btn-primary mt-3" @click="register">Register</button>
  </div>
</div>
</template>

<script>
import axios from '../helpers/axios'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      email: '',
      password: '',
      image: '',
      styleImage : ''
    }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      this.image = file
      let image = new Image()
      let reader = new FileReader()
      let vm = this
      reader.onload = (e) => {
        vm.styleImage = `height: 300px; background: url(${e.target.result}) no-repeat center center/cover; background-size: 100%; margin-top: 0px;`
      }
      reader.readAsDataURL(file)
    },
    register(){
      Swal.showLoading()
      let form = new FormData()
      form.set('email', this.email)
      form.set('password', this.password)
      form.append('image', this.image)
      axios({
        url: '/user/register',
        method: 'POST',
        data: form
      })
      .then(({ data })=>{
        console.log(data);
        localStorage.setItem('token', data.token)
        let payload = {
          email: data.user.email,
          image: data.user.image[0]
        }
        this.$store.commit('SET_LOGIN',{ payload })
        this.$router.push('/questions')
        Swal.close()
        Swal.fire({
          title: 'Register Success!',
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
  }
}
</script>

<style scoped>
*{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.tag-tag{
  background-color: #0069D9;
  color: white;
}

.input-placeholder::placeholder{
  color: rgba(0, 0, 0, 0.329);
}

.font-detail{
  font-weight: lighter;
  font-style: italic;
  font-size: 12px;
  margin-top: -7px;
}
.form-ask{
  background-color: rgb(255, 255, 255);
}

.bg-ask{
  background-color: #EFF0F1;
  height: 94vh;
}
</style>
