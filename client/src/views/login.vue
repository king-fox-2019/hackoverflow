<template>
  <b-container id="container">
    <b-card id="form" bg-variant="primary" text-variant="white"
    header="Login" class="text-center">
    <login id="login"/>
    </b-card>
    <b-card id="form" bg-variant="info" text-variant="white"
    header="Register" class="text-center">
    <register id="register"/>
    </b-card>
  </b-container>
</template>

<script>
import register from '@/components/register.vue';
import login from '@/components/login.vue';

export default {
  data() {
    return {
      message: 'Hello world',
    };
  },
  components: {
    register,
    login,
  },
};
</script>

<style scoped>
#login {
  margin-top: 11%;
}
#form {
  width: 40% !important;
}
#container {
  margin-top: 8%;
  display: flex;
  justify-content: space-around;
  height: 20rem;
}
</style>
