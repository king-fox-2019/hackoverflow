<template>
  <div class="register">
    <RegisterForm></RegisterForm>
  </div>
</template>

<script>
import RegisterForm from '../components/RegisterForm'
export default {
  name: 'register',
  components: {
    RegisterForm
  }
}
</script>

<style scoped>
.register {
  height: 100%;
}
</style>
