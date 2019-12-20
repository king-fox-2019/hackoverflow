<template>
  <b-container id="container">
    <b-card  id="form" bg-variant="warning" text-variant="black"
    header="Login" class="text-center animated zoomIn">
    <login id="login"/>
    </b-card>
    <b-card id="form" bg-variant="light" text-variant="black"
    header="Register" class="text-center animated zoomIn">
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
@import url('https://fonts.googleapis.com/css?family=Courier+Prime&display=swap');

#login {
  margin-top: 11%;
}
#form {
  font-size: 1rem;
  border-radius: 2rem;
  width: 40% !important;
  font-family: 'Courier Prime', monospace;
}
#container {
  margin-top: 8%;
  display: flex;
  justify-content: space-around;
  height: 20rem;
}
</style>
