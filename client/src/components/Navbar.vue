<template>
  <div class="contain">
    <b-navbar toggleable="lg" class="d-flex justify-content-between" :sticky="true">
      <b-navbar-brand href="" @click.prevent="$router.push('/')" class="logo-navbar">
        <i class="fab fa-stack-overflow mr-2 logo"></i>
        Sticky<span id="strong">Overflow</span>
      </b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="w-50">
            <b-input size="sm" class="mr-sm-2" placeholder="Search" type="text"></b-input>
            <b-button size="sm" class="my-2 my-sm-0 btn search-button" type="submit">Search</b-button>
      </b-navbar-nav>

      <b-navbar-nav class="mr-2 ml-2">
          <b-button size="sm" class="btn mr-2 login-button" @click.prevent="$router.push('/login')" v-if="!isLogin">Login</b-button>
          <b-button size="sm" class="btn mr-2 register-button" @click.prevent="$router.push('/register')" v-if="!isLogin">Register</b-button>
          <b-button size="sm" class="btn logout-button" @click.prevent="logout" v-if="isLogin">Logout</b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('user/SET_IS_LOGIN', false)
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.user.isLogin
    }
  }
}
</script>

<style scoped>
#strong{
  font-weight: bold;
  margin-left: 2px;
  color: rgb(93, 42, 7);

}

.login-button{
  background-color: rgb(42, 163, 200);
}

.login-button:hover{
  background-color: rgb(6, 46, 82)
}

.register-button{
  background-color: rgb(25, 192, 103);
}

.register-button:hover{
  background-color: rgb(6, 73, 34);
}

.logout-button{
  background-color: rgb(233, 64, 64);
}

.logout-button:hover{
  background-color: rgb(97, 5, 5);
}

.search-button{
  background-color: rgb(230, 114, 19);
}

.search-button:hover{
  background-color: orangered;
}

.contain{
  border-top: 2px solid orangered;
  -webkit-box-shadow: 10px 12px 5px -8px rgba(163,160,163,1);
  -moz-box-shadow: 10px 12px 5px -8px rgba(163,160,163,1);
  box-shadow: 10px 12px 5px -8px rgba(163,160,163,1);
}

.logo-navbar{
  cursor: pointer;
}

.logo{
  font-size: 28px;
  color: rgb(211, 141, 28);
}
</style>
