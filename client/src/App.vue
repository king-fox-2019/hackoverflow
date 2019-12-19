<template>
  <div class="container">
  <div id="left-sidebar" data-is-here-when="md lg" class="left-sidebar js-pinned-left-sidebar ps-relative">
    <div class="left-sidebar--sticky-container js-sticky-leftnav">
        <nav role="navigation">
            <ol class="nav-links">
                <li class=" youarehere" >
                  <router-link to="/" class="pl8 js-gps-track nav-links--link">Home</router-link>
                </li>
                <li class=" youarehere" >
                  <router-link to="/myquestion" class="pl8 js-gps-track nav-links--link">My Question</router-link>
                </li>
                <li class=" youarehere" @click="logout">
                  <a href="#" class="pl8 js-gps-track nav-links--link"> Logout</a>
                </li>
            </ol>
        </nav>
    </div>
  </div>
  <router-view/>
</div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {});
Vue.use(BootstrapVue)
export default {
  methods:{
    logout(){
      localStorage.removeItem('access_token')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
